/**
 * NovaCartel - Updated Script with Contributor Changes
 * Added minor improvements to show visible PR changes without breaking functionality
 */

const products = [
  /* ... your existing products ... */
];

let currentProduct = products[0];

document.addEventListener('DOMContentLoaded', () => {
  initPage();
  setupScrollObserver();
  setupNavScroll();
  highlightCurrentUser(); // CHANGE 1: Added log highlight to show contributor changes
});

/* PAGE INIT */
function initPage() {
  renderHero();
  renderConfigurator();
  renderProducts();
}

/* HERO */
function renderHero() {
  const img = document.getElementById('hero-image');
  img.src = currentProduct.image;
  img.alt = currentProduct.name;
  document.getElementById('config-title').textContent = currentProduct.name;
  document.querySelector('.tagline').textContent = currentProduct.specs;

  // CHANGE 2: Add subtle hero shadow for visual enhancement (matches CSS change 3)
  img.style.boxShadow = "0 10px 30px rgba(0,0,0,0.5)";
}

/* CONFIGURATOR */
function renderConfigurator() {
  const colors = document.getElementById('color-options');
  colors.innerHTML = currentProduct.colors.map((color, i) => 
    `<button class="color-dot" style="background-color: ${color}" data-index="${i}" ${i===0 ? 'class="active"' : ''}></button>`
  ).join('');

  // Event listeners for color selection
  colors.querySelectorAll('.color-dot').forEach((btn, i) => {
    btn.addEventListener('click', () => {
      document.querySelector('.color-dot.active')?.classList.remove('active');
      btn.classList.add('active');

      // CHANGE 3: Apply subtle shadow to selected dot to match CSS (change 10)
      btn.style.boxShadow = "0 4px 12px rgba(212,175,55,0.3)";

      document.getElementById('hero-image').style.filter = `hue-rotate(${i * 30}deg) saturate(1.1)`;
    });
  });

  const wheels = document.getElementById('wheel-options');
  wheels.innerHTML = '<button class="wheel-dot active">Standard</button><button class="wheel-dot">Sport</button>';
}

/* PRODUCTS */
function renderProducts() {
  const container = document.getElementById('content-sections');
  container.innerHTML = products.map(product => `
    <section class="product-section">
      <div class="product-card" data-product="${product.id}">
        <img src="${product.image}" alt="${product.name}" class="product-img">
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
    if (card) {
      const id = card.dataset.product;
      currentProduct = products.find(p => p.id === id);
      renderHero();
      renderConfigurator();

      // CHANGE 4: Smooth scroll for better UX when hero updates (matches CSS change 2)
      document.querySelector('.visual-stage').scrollIntoView({ behavior: 'smooth' });
    }
  });
}

/* OBSERVER FOR ANIMATION */
function setupScrollObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate'); // CHANGE 5: triggers CSS animation (fadeInUp)
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.product-section').forEach(section => observer.observe(section));
}

/* NAVBAR AND MEGA MENU */
function setupNavScroll() {
  window.addEventListener('scroll', () => {
    document.querySelector('.navbar').classList.toggle('solid', window.scrollY > 100);
  });

  const discover = document.querySelector('.discover');
  discover.addEventListener('mouseenter', () => discover.classList.add('active'));
  discover.addEventListener('mouseleave', () => discover.classList.remove('active'));
}

/* AUTH FUNCTIONS */
let currentTab = 'sign-in';
let users = JSON.parse(localStorage.getItem('novaUsers')) || [];

function toggleAuthModal() {
  const modal = document.getElementById('auth-modal');
  modal.classList.toggle('active');
}

function switchTab(tab) {
  currentTab = tab;
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
  event.target.classList.add('active');
  document.getElementById(tab + '-tab').classList.add('active');
}

function isValidPassword(password) {
  return password.length >= 6 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /[@#$?]/.test(password);
}

function handleSignUp() {
  const email = document.querySelector('#sign-up-tab input[type="email"]').value;
  const password = document.querySelector('#sign-up-tab input[placeholder="Password"]').value;
  const confirmPassword = document.querySelector('#sign-up-tab input[placeholder="Confirm Password"]').value;

  if (password !== confirmPassword) { alert('Passwords do not match!'); return; }
  if (!isValidPassword(password)) { alert('Password must be 6+ chars with uppercase, lowercase, and @#$?'); return; }
  if (users.find(u => u.email === email)) { alert('User already exists!'); return; }

  users.push({ email, password });
  localStorage.setItem('novaUsers', JSON.stringify(users));
  localStorage.setItem('currentUser', email);
  alert('Sign up successful! Welcome ' + email);
  toggleAuthModal();
}

function handleSignIn() {
  const email = document.querySelector('#sign-in-tab input[type="email"]').value;
  const password = document.querySelector('#sign-in-tab input[type="password"]').value;

  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    localStorage.setItem('currentUser', email);
    alert('Welcome back, ' + email + '!');
    toggleAuthModal();
  } else {
    alert('User not found or incorrect password!');
  }
}

/* EVENT LISTENERS */
document.getElementById('auth-modal').addEventListener('click', e => {
  if (e.target.classList.contains('modal-overlay')) toggleAuthModal();
});

document.querySelector('#sign-in-tab .cta-button').addEventListener('click', handleSignIn);
document.querySelector('#sign-up-tab .cta-button').addEventListener('click', handleSignUp);

function toggleMenu() {
  document.querySelector('.nav-menu').classList.toggle('open');
}

/* CHANGE 6: Highlight currently logged-in user in console */
function highlightCurrentUser() {
  const user = localStorage.getItem('currentUser');
  if (user) {
    console.log(`%cLogged in as: ${user}`, 'background: #D4AF37; color: #171a20; padding: 2px 6px; border-radius: 3px;');
  }
}
