/* =====================================================
   NOVACARTEL — cart.js
   Wishlist, configurator, cart, checkout & success flow
   ===================================================== */

/* ===== WISHLIST ===== */
function quickWishlist(e, id) {
  e.stopPropagation();
  toggleWishlistById(id);
}

function toggleWishlistById(id) {
  const idx = wishlist.indexOf(id);
  if (idx === -1) {
    wishlist.push(id);
    toast('Added to wishlist ♥', 'success');
  } else {
    wishlist.splice(idx, 1);
    toast('Removed from wishlist');
  }
  localStorage.setItem('nc_wl', JSON.stringify(wishlist));
  updateBadges();
  renderProducts();
}

function toggleWishlistItem() {
  if (!currentProduct) return;
  toggleWishlistById(currentProduct.id);
  updateWishlistBtn();
}

function updateWishlistBtn() {
  const btn = document.getElementById('cfg-wishlist-btn');
  if (!btn || !currentProduct) return;
  const inWL = wishlist.includes(currentProduct.id);
  btn.textContent = inWL ? '♥ In Wishlist' : '♡ Add to Wishlist';
  btn.classList.toggle('active', inWL);
}

function openWishlist() {
  const body = document.getElementById('wl-body');
  if (!body) return;
  if (!wishlist.length) {
    body.innerHTML = `<div class="cart-empty">
      <div class="cart-empty-icon">♡</div><p>Your wishlist is empty</p>
    </div>`;
  } else {
    const items = wishlist.map(id => products.find(p => p.id === id)).filter(Boolean);
    body.innerHTML = items.map(p => `
      <div class="cart-item">
        <img class="cart-item-img" src="${p.image}" alt="${p.name}"
          onerror="this.src='https://images.unsplash.com/photo-1617788138017-80ad40651399?w=200&q=70'">
        <div class="cart-item-info">
          <div class="cart-item-name">${p.name}</div>
          <div class="cart-item-sub">${p.brand}</div>
          <div class="cart-item-price">${fmt(p.price)}</div>
          <div style="display:flex;gap:0.5rem;margin-top:0.5rem;">
            <button class="card-cta"
              style="font-size:0.78rem;padding:0.35rem 0.75rem;"
              onclick="openConfigurator(products.find(x=>x.id==='${p.id}')); closeWishlist();" type="button">
              Configure
            </button>
            <button class="remove-btn"
              onclick="toggleWishlistById('${p.id}'); openWishlist();" type="button">
              Remove
            </button>
          </div>
        </div>
      </div>`).join('');
  }
  document.getElementById('wl-overlay').classList.add('active');
  document.getElementById('wl-drawer').classList.add('open');
}

function closeWishlist() {
  document.getElementById('wl-overlay').classList.remove('active');
  document.getElementById('wl-drawer').classList.remove('open');
}

/* ===== CONFIGURATOR ===== */
function openConfigurator(p) {
  currentProduct = p;
  cfgQty    = 1;
  cfgColor  = p.colors[0];
  cfgOption = p.options[0];

  document.getElementById('cfg-img').src        = p.image;
  document.getElementById('cfg-brand').textContent = p.brand;
  document.getElementById('cfg-name').textContent  = p.name;
  document.getElementById('cfg-price').textContent = fmt(p.price);
  document.getElementById('cfg-specs').textContent = p.specs;
  document.getElementById('cfg-qty').textContent   = 1;

  // Tag badge
  const tagEl = document.getElementById('cfg-tag');
  tagEl.textContent   = p.tag || '';
  tagEl.style.display = p.tag ? '' : 'none';

  // Color swatches
  const swatchWrap = document.getElementById('cfg-colors-wrap');
  if (p.colors && p.colors.length) {
    swatchWrap.style.display = '';
    document.getElementById('cfg-color-name').textContent = cfgColor.n;
    document.getElementById('cfg-swatches').innerHTML = p.colors.map((c, i) =>
      `<button class="color-swatch ${i===0?'active':''}"
        style="background:${c.v};" title="${c.n}" type="button"
        onclick="selectColor(${i})"></button>`
    ).join('');
  } else {
    swatchWrap.style.display = 'none';
  }

  // Options (Trim / Size / Capacity)
  const optsWrap = document.getElementById('cfg-options-wrap');
  if (p.options && p.options.length) {
    optsWrap.style.display = '';
    const label = p.category === 'merch' ? 'Size'
      : p.category === 'energy' ? 'Capacity' : 'Trim / Wheels';
    document.getElementById('cfg-options-label').textContent = label;
    document.getElementById('cfg-options').innerHTML = p.options.map((o, i) =>
      `<button class="option-btn ${i===0?'active':''}" type="button"
        onclick="selectOption(this,'${o}')">${o}</button>`
    ).join('');
  } else {
    optsWrap.style.display = 'none';
  }

  updateLineTotalDisplay();
  updateWishlistBtn();
  document.getElementById('config-modal').classList.add('active');
}

function closeConfigurator() {
  document.getElementById('config-modal').classList.remove('active');
}

function closeConfigOnBg(e) {
  if (e.target === document.getElementById('config-modal')) closeConfigurator();
}

function selectColor(idx) {
  cfgColor = currentProduct.colors[idx];
  document.getElementById('cfg-color-name').textContent = cfgColor.n;
  document.querySelectorAll('.color-swatch').forEach((s, i) =>
    s.classList.toggle('active', i === idx)
  );
}

function selectOption(btn, val) {
  cfgOption = val;
  document.querySelectorAll('.option-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

function changeQty(delta) {
  const prev = cfgQty;
  cfgQty = Math.max(1, Math.min(10, cfgQty + delta));
  if (cfgQty === 10 && delta > 0 && prev === 10) {
    toast('Maximum quantity per item is 10');
  }
  document.getElementById('cfg-qty').textContent = cfgQty;
  updateLineTotalDisplay();
}

function updateLineTotalDisplay() {
  if (!currentProduct) return;
  document.getElementById('cfg-line-total').innerHTML =
    `<span>${fmt(currentProduct.price * cfgQty)}</span>`;
}

function addToCartFromConfig() {
  if (!currentProduct) return;
  addToCart(currentProduct, cfgColor, cfgOption, cfgQty);
  closeConfigurator();
}

function buyNowFromConfig() {
  if (!currentProduct) return;
  addToCart(currentProduct, cfgColor, cfgOption, cfgQty);
  closeConfigurator();
  openCheckout();
}

/* ===== CART ===== */
function addToCart(product, color, option, qty = 1) {
  const existing = cart.find(i =>
    i.id === product.id && i.colorN === (color?.n || '') && i.option === (option || '')
  );
  if (existing) {
    existing.qty = Math.min(10, existing.qty + qty);
  } else {
    cart.push({
      id: product.id, name: product.name, brand: product.brand,
      image: product.image, price: product.price,
      colorN: color?.n || '', colorV: color?.v || '',
      option: option || '', qty
    });
  }
  localStorage.setItem('nc_cart', JSON.stringify(cart));
  updateBadges();
  toast(`${product.name} added to cart 🛒`, 'success');
}

function updateBadges() {
  const totalQty = cart.reduce((s, i) => s + i.qty, 0);

  const cartBadge = document.getElementById('cart-badge');
  const wlBadge   = document.getElementById('wl-badge');
  const header    = document.getElementById('cart-count-header');

  if (cartBadge) {
    cartBadge.textContent = totalQty;
    cartBadge.classList.toggle('hidden', !totalQty);
  }
  if (wlBadge) {
    wlBadge.textContent = wishlist.length;
    wlBadge.classList.toggle('hidden', !wishlist.length);
  }
  if (header) {
    header.textContent = totalQty ? `(${totalQty})` : '';
  }
}

function openCart() {
  updateCartUI();
  document.getElementById('cart-overlay').classList.add('active');
  document.getElementById('cart-drawer').classList.add('open');
}

function closeCart() {
  document.getElementById('cart-overlay').classList.remove('active');
  document.getElementById('cart-drawer').classList.remove('open');
}

function updateCartUI() {
  const body   = document.getElementById('cart-body');
  const footer = document.getElementById('cart-footer');
  if (!body || !footer) return;

  if (!cart.length) {
    body.innerHTML = `<div class="cart-empty">
      <div class="cart-empty-icon">🛒</div>
      <p>Your cart is empty</p>
      <p style="font-size:0.82rem;color:var(--text-dim);margin-top:0.5rem;">
        Add a vehicle or item to get started
      </p>
    </div>`;
    footer.classList.add('hidden');
    return;
  }

  body.innerHTML = cart.map((item, i) => `
    <div class="cart-item">
      <img class="cart-item-img" src="${item.image}" alt="${item.name}"
        onerror="this.src='https://images.unsplash.com/photo-1617788138017-80ad40651399?w=200&q=70'">
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-sub">
          ${item.brand}${item.colorN ? ' • ' + item.colorN : ''}${item.option ? ' • ' + item.option : ''}
        </div>
        <div class="cart-item-price">${fmt(item.price)}</div>
        <div class="qty-controls">
          <button class="qty-btn" onclick="changeCartQty(${i},-1)" type="button">−</button>
          <span class="qty-num">${item.qty}</span>
          <button class="qty-btn" onclick="changeCartQty(${i},1)" type="button">+</button>
          <button class="remove-btn" onclick="removeFromCart(${i})" type="button">Remove</button>
        </div>
      </div>
    </div>`).join('');

  footer.classList.remove('hidden');
  updateCartSummary();
}

function changeCartQty(idx, delta) {
  const item = cart[idx];
  if (!item) return;
  const prev = item.qty;
  item.qty = Math.max(1, Math.min(10, item.qty + delta));
  if (item.qty === 10 && delta > 0 && prev === 10) {
    toast('Maximum quantity per item is 10');
  }
  localStorage.setItem('nc_cart', JSON.stringify(cart));
  updateCartUI();
  updateBadges();
}

function removeFromCart(idx) {
  cart.splice(idx, 1);
  localStorage.setItem('nc_cart', JSON.stringify(cart));
  updateCartUI();
  updateBadges();
}

function updateCartSummary() {
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const tax = subtotal * 0.18;
  const total = subtotal + tax;
  document.getElementById('s-subtotal').textContent = fmt(subtotal);
  document.getElementById('s-tax').textContent      = fmt(tax);
  document.getElementById('s-total').textContent    = fmt(total);
}

/* ===== CHECKOUT ===== */
function openCheckout() {
  if (!cart.length) {
    toast('Your cart is empty', 'error');
    return;
  }
  const overlay = document.getElementById('checkout-modal');
  const summary = document.getElementById('co-summary');
  const coSub   = document.getElementById('co-subtotal');
  const coVat   = document.getElementById('co-vat');
  const coGrand = document.getElementById('co-grand');

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const vat      = subtotal * 0.18;
  const grand    = subtotal + vat;

  summary.innerHTML = cart.map(i => `
    <div class="checkout-item">
      <span class="checkout-item-name">${i.name} ${i.option ? '('+i.option+')':''}</span>
      <span class="checkout-item-price">${fmt(i.price * i.qty)}</span>
    </div>`).join('');

  coSub.textContent   = fmt(subtotal);
  coVat.textContent   = fmt(vat);
  coGrand.textContent = fmt(grand);

  overlay.classList.add('active');
}

function closeCheckout() {
  document.getElementById('checkout-modal').classList.remove('active');
}

function closeCheckoutOnBg(e) {
  if (e.target === document.getElementById('checkout-modal')) closeCheckout();
}

function switchPayTab(method, btn) {
  payMethod = method;
  document.querySelectorAll('.pay-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.pay-form').forEach(f => f.classList.remove('active'));
  const form = document.getElementById(`pf-${method}`);
  if (form) form.classList.add('active');
}

function formatCardNum(el) {
  let v = el.value.replace(/\D/g, '').slice(0, 16);
  el.value = v.replace(/(.{4})/g, '$1 ').trim();
}

function formatExpiry(el) {
  let v = el.value.replace(/\D/g, '').slice(0, 4);
  if (v.length >= 3) v = v.slice(0, 2) + ' / ' + v.slice(2);
  el.value = v;
}

function processPayment() {
  const btn = document.getElementById('pay-btn');
  const label = document.getElementById('pay-btn-label');
  const loading = document.getElementById('pay-loading');
  if (!btn || !label || !loading) return;

  btn.disabled = true;
  loading.style.display = 'flex';
  label.textContent = '';

  setTimeout(() => {
    btn.disabled = false;
    loading.style.display = 'none';
    label.textContent = 'Place Order';
    closeCheckout();
    showSuccess();
  }, 2200);
}

/* ===== ORDER SUCCESS ===== */
function showSuccess() {
  const overlay = document.getElementById('success-modal');
  const trackingEl = document.getElementById('tracking-id-display');
  const estEl = document.getElementById('est-delivery-date');
  if (!overlay || !trackingEl || !estEl) return;

  const id = 'NC-' + Math.random().toString(36).substring(2, 8).toUpperCase();
  trackingEl.textContent = id;

  const now = new Date();
  const days = 3 + Math.floor(Math.random() * 5);
  now.setDate(now.getDate() + days);
  estEl.textContent = now.toDateString();

  overlay.classList.add('active');

  // Clear cart after success
  cart = [];
  localStorage.setItem('nc_cart', JSON.stringify(cart));
  updateCartUI();
  updateBadges();
}

function closeSuccess() {
  document.getElementById('success-modal').classList.remove('active');
}

function copyTracking() {
  const id = document.getElementById('tracking-id-display').textContent;
  if (!id) return;
  navigator.clipboard.writeText(id).then(() => {
    toast('Tracking ID copied', 'success');
  });
}