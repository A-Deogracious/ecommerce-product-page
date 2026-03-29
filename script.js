
 
const products = [
  {
    id: 'kayoola-sv',
    name: 'Kayoola SV',
    brand: 'Kira Motors',
    price: '$450,000',
    image: 'https://kiiramotors.com/wp-content/uploads/2023/07/Kayoola-Solar-Bus-2-scaled.jpg',
    specs: 'Electric Bus | 70 passengers | 250km range',
    colors: ['#fff', '#000', '#c0c0c0']
  },
  {
    id: 'tesla-s',
    name: 'Model S Plaid',
    brand: 'Tesla',
    price: '$94,990',
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?...',
    specs: '1020 hp | 1.99s 0-60 | 396 mi range',
    colors: ['#fff', '#000', '#e31a2d']
  },
  {
    id: 'mercedes-gle',
    name: 'GLE 63 S',
    brand: 'Mercedes-Benz',
    price: '$135,000',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?...',
    specs: 'V8 Biturbo | 603 hp | Luxury SUV',
    colors: ['#000', '#fff', '#ff6b35']
  },
  {
    id: 'toyota-lc',
    name: 'Land Cruiser',
    brand: 'Toyota',
    price: '$85,000',
    image: 'https://images.unsplash.com/photo-1606216794075-b5bd09dbc6aa?...',
    specs: 'V8 | Full-time 4WD | Offroad Legend',
    colors: ['#fff', '#2c3e50']
  },
  {
    id: 'ford-mustang',
    name: 'Mustang GT',
    brand: 'Ford',
    price: '$42,000',
    image: 'https://images.unsplash.com/photo-1552517034-6533479cbfe8?...',
    specs: '5.0L V8 | 480 hp | Sports Car',
    colors: ['#ff0000', '#000', '#fff']
  },
  {
    id: 'nova-solar',
    name: 'Solar Pro Kit',
    brand: 'NovaEnergy',
    price: '$12,500',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?...',
    specs: 'Roof Solar | 10kW | Sustainable',
    colors: ['#4a90e2']
  },
  {
    id: 'nova-hoodie',
    name: 'Elite Hoodie',
    brand: 'NovaWear',
    price: '$250',
    image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?...',
    specs: 'Streetwear | Premium Cotton',
    colors: ['#000', '#d4af37']
  }
];

let currentProduct = products[0];


document.addEventListener('DOMContentLoaded', () => {
  initPage();
  setupScrollObserver();
  setupNavScroll();
  setupLazyImages(); // NEW
});


function initPage() {
  renderHero();
  renderConfigurator();
  renderProducts();
}



function renderHero() {
  const img = document.getElementById('hero-image');
  if (!img) return;

  img.src = currentProduct.image;
  img.alt = currentProduct.name;

  document.getElementById('config-title').textContent = currentProduct.name;
  document.querySelector('.tagline').textContent = currentProduct.specs;
}



function renderConfigurator() {
  const colors = document.getElementById('color-options');
  if (!colors) return;

  colors.innerHTML = currentProduct.colors.map((color, i) => 
    `<button class="color-dot ${i === 0 ? 'active' : ''}" 
      style="background-color:${color}" 
      data-index="${i}">
    </button>`
  ).join('');

  colors.querySelectorAll('.color-dot').forEach((btn, i) => {
    btn.addEventListener('click', () => {
      document.querySelector('.color-dot.active')?.classList.remove('active');
      btn.classList.add('active');

      document.getElementById('hero-image').style.filter =
        `hue-rotate(${i * 30}deg) saturate(1.1)`;
    });
  });

  // Wheels
  const wheels = document.getElementById('wheel-options');
  if (wheels) {
    wheels.innerHTML = `
      <button class="wheel-dot active">Standard</button>
      <button class="wheel-dot">Sport</button>
    `;
  }
}



function renderProducts() {
  const container = document.getElementById('content-sections');
  if (!container) return;

  container.innerHTML = products.map(product => `
    <section class="product-section">
      <div class="product-card" data-product="${product.id}">
        <img data-src="${product.image}" alt="${product.name}" class="product-img lazy">
        <div class="product-info">
          <h3>${product.name}</h3>
          <p class="source-brand">${product.brand}</p>
          <p class="specs">${product.specs}</p>
          <p class="price">${product.price}</p>
        </div>
      </div>
    </section>
  `).join('');

  container.addEventListener('click', e => {
    const card = e.target.closest('.product-card');
    if (!card) return;

    const id = card.dataset.product;
    currentProduct = products.find(p => p.id === id);

    renderHero();
    renderConfigurator();

    document.querySelector('.visual-stage')
      ?.scrollIntoView({ behavior: 'smooth' });
  });
}



function setupScrollObserver() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.product-section')
    .forEach(section => observer.observe(section));
}



function setupNavScroll() {
  window.addEventListener('scroll', () => {
    document.querySelector('.navbar')
      ?.classList.toggle('solid', window.scrollY > 100);
  });

  const discover = document.querySelector('.discover');
  if (discover) {
    discover.addEventListener('mouseenter', () => discover.classList.add('active'));
    discover.addEventListener('mouseleave', () => discover.classList.remove('active'));
  }
}



function setupLazyImages() {
  const lazyImages = document.querySelectorAll('img.lazy');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        observer.unobserve(img);
      }
    });
  });

  lazyImages.forEach(img => observer.observe(img));
}



let users = JSON.parse(localStorage.getItem('novaUsers')) || [];

function toggleAuthModal() {
  document.getElementById('auth-modal')?.classList.toggle('active');
}


function switchTab(tab, event) {
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));

  event.target.classList.add('active');
  document.getElementById(tab + '-tab').classList.add('active');
}



function isValidPassword(password) {
  return password.length >= 6 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[@#$?]/.test(password);
}



function handleSignUp() {
  const email = document.querySelector('#sign-up-tab input[type="email"]').value.trim();
  const password = document.querySelector('#sign-up-tab input[placeholder="Password"]').value;
  const confirmPassword = document.querySelector('#sign-up-tab input[placeholder="Confirm Password"]').value;

  if (!email || !password) return alert('All fields required');

  if (password !== confirmPassword) return alert('Passwords do not match');
  if (!isValidPassword(password)) return alert('Weak password');

  if (users.find(u => u.email === email)) return alert('User exists');

  users.push({ email, password });
  localStorage.setItem('novaUsers', JSON.stringify(users));
  localStorage.setItem('currentUser', email);

  alert('Welcome ' + email);
  toggleAuthModal();
}



function handleSignIn() {
  const email = document.querySelector('#sign-in-tab input[type="email"]').value.trim();
  const password = document.querySelector('#sign-in-tab input[type="password"]').value;

  const user = users.find(u => u.email === email && u.password === password);

  if (!user) return alert('Invalid login');

  localStorage.setItem('currentUser', email);
  alert('Welcome back ' + email);
  toggleAuthModal();
}



document.querySelector('#auth-modal')?.addEventListener('click', e => {
  if (e.target.classList.contains('modal-overlay')) toggleAuthModal();
});

document.querySelector('#sign-in-tab .cta-button')
  ?.addEventListener('click', handleSignIn);

document.querySelector('#sign-up-tab .cta-button')
  ?.addEventListener('click', handleSignUp);



function toggleMenu() {
  document.querySelector('.nav-menu')?.classList.toggle('open');
}



if (localStorage.getItem('currentUser')) {
  console.log('Logged in as:', localStorage.getItem('currentUser'));
}

