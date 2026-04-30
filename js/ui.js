/* =====================================================
   NOVACARTEL — ui.js
   Brands strip, hero, filters, product rendering, toasts
   ===================================================== */

/* ===== BRANDS STRIP ===== */
function renderBrandsStrip() {
  const brands = [
    'Tesla','Ferrari','Toyota','Ford','Jeep',
    'Mercedes','BMW','Lamborghini','Porsche',
    'Land Rover','Kiira Motors','NovaEnergy','NovaWear'
  ];
  const doubled = [...brands, ...brands]; // infinite scroll illusion
  const track = document.getElementById('brands-track');
  if (!track) return;
  track.innerHTML = doubled.map(b =>
    `<span class="brand-label" onclick="filterByBrand('${b}')">${b}</span>`
  ).join('');
}

/* ===== HERO ===== */
function renderHero(idx) {
  if (idx !== undefined) heroIndex = idx;
  const p = products.find(x => x.id === heroProducts[heroIndex % heroProducts.length]);
  if (!p) return;

  document.getElementById('hero-bg').style.backgroundImage = `url('${p.image}')`;
  document.getElementById('hero-eyebrow').textContent = p.brand;
  document.getElementById('hero-title').textContent   = p.name;
  document.getElementById('hero-specs').textContent   = p.specs;
  document.getElementById('hero-price').textContent   = `From ${fmt(p.price)}`;
  document.getElementById('hero-order-btn').dataset.id = p.id;

  // Navigation dots
  const dots = heroProducts.map((_, i) =>
    `<button class="hero-dot ${i === heroIndex % heroProducts.length ? 'active' : ''}"
      onclick="renderHero(${i}); resetHeroInterval();"></button>`
  ).join('');
  document.getElementById('hero-dots').innerHTML = dots;
}

function nextHero() {
  heroIndex = (heroIndex + 1) % heroProducts.length;
  renderHero();
}

function resetHeroInterval() {
  clearInterval(heroInterval);
  heroInterval = setInterval(nextHero, 5500);
}

function updateHeroPricing() {
  const p = products.find(x => x.id === heroProducts[heroIndex % heroProducts.length]);
  if (p) document.getElementById('hero-price').textContent = `From ${fmt(p.price)}`;
}

function heroOrder() {
  const id = document.getElementById('hero-order-btn').dataset.id;
  const p  = products.find(x => x.id === id);
  if (p) openConfigurator(p);
}

function scrollToProducts() {
  const fs = document.getElementById('filter-section');
  if (fs) fs.scrollIntoView({ behavior: 'smooth' });
}

/* ===== PRODUCTS — FILTER, SORT, RENDER ===== */
function getFiltered() {
  let list = [...products];
  if (currentCategory !== 'all') list = list.filter(p => p.category === currentCategory);
  if (currentBrand !== 'all')    list = list.filter(p => p.brand === currentBrand);
  if (currentSort === 'price-asc')      list.sort((a, b) => a.price - b.price);
  else if (currentSort === 'price-desc') list.sort((a, b) => b.price - a.price);
  else if (currentSort === 'name')      list.sort((a, b) => a.name.localeCompare(b.name));
  return list;
}

function renderProducts() {
  const list = getFiltered();
  const grid = document.getElementById('product-grid');
  if (!grid) return;

  const rc = document.getElementById('results-count');
  if (rc) {
    rc.textContent = `${list.length} product${list.length !== 1 ? 's' : ''} found`;
  }

  if (!list.length) {
    grid.innerHTML = `<div class="empty-state">
      <h3>No products found</h3>
      <p style="color:var(--text-dim)">Try a different filter or category.</p>
    </div>`;
    return;
  }

  grid.innerHTML = list.map(p => {
    const inWL = wishlist.includes(p.id);
    return `
    <div class="product-card" id="pc-${p.id}">
      <div class="card-img-wrap">
        <img src="${p.image}" alt="${p.name}" loading="lazy"
          onerror="this.src='https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&q=80'">
        ${p.tag ? `<span class="card-tag">${p.tag}</span>` : ''}
        <button class="card-wishlist ${inWL ? 'active' : ''}"
          onclick="quickWishlist(event,'${p.id}')" title="Wishlist" type="button">
          ${inWL ? '♥' : '♡'}
        </button>
      </div>
      <div class="card-body">
        <div class="card-brand">${p.brand}</div>
        <div class="card-name">${p.name}</div>
        <div class="card-specs">${p.specs}</div>
        <div class="card-footer">
          <div class="card-price">${fmt(p.price)}</div>
          <button class="card-cta"
            onclick="openConfigurator(products.find(x=>x.id==='${p.id}'))" type="button">
            Configure
          </button>
        </div>
      </div>
    </div>`;
  }).join('');

  // Staggered entrance animation for product cards
  setTimeout(() => {
    document.querySelectorAll('.product-card').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), i * 60);
    });
  }, 50);

  renderBrandFilters();
}

function renderBrandFilters() {
  const row = document.getElementById('brand-filter-row');
  if (!row) return;
  if (['all','merch','energy'].includes(currentCategory)) {
    row.innerHTML = '';
    return;
  }
  const brands = [...new Set(getFiltered().map(p => p.brand))];
  row.innerHTML = [
    `<button class="filter-btn ${currentBrand==='all'?'active':''}"
      onclick="filterByBrand('all')" type="button">All Brands</button>`,
    ...brands.map(b =>
      `<button class="filter-btn ${currentBrand===b?'active':''}"
        onclick="filterByBrand('${b}')" type="button">${b}</button>`
    )
  ].join('');
}

function setCategory(cat, btn) {
  currentCategory = cat;
  currentBrand    = 'all';
  document.querySelectorAll('.filter-section .filter-btn')
    .forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  const titles = {
    all:'All Products',
    vehicles:'Vehicles',
    energy:'Energy Solutions',
    merch:'NovaWear Merchandise'
  };
  const titleText = titles[cat] || 'Products';
  document.getElementById('section-title').textContent = titleText;
  document.title = `NovaCartel — ${titleText}`;
  renderProducts();
}

function filterByBrand(brand) {
  currentBrand = brand;
  renderProducts();
}

function filterAndScroll(cat) {
  setCategory(cat, null);
  document.querySelectorAll('.filter-section .filter-btn').forEach(b => {
    const label = b.textContent.trim();
    const match = label.toLowerCase() === cat.toLowerCase();
    b.classList.toggle('active', match);
  });
  const fs = document.getElementById('filter-section');
  if (fs) fs.scrollIntoView({ behavior: 'smooth' });
}

function sortProducts(val) {
  currentSort = val;
  renderProducts();
}

/* ===== TOASTS ===== */
function toast(message, type = '') {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.textContent = message;
  container.appendChild(el);
  setTimeout(() => {
    el.remove();
  }, 3000);
}

function openInfoSection(id) {
  // hide all info sections
  document.querySelectorAll('.info-section').forEach(sec => {
    sec.classList.remove('active');
  });

  // show the one we want
  const target = document.getElementById(id);
  if (target) {
    target.classList.add('active');
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}