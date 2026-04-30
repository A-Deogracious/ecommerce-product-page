/* =====================================================
   NOVACARTEL — app.js
   Core app state & initialization
   ===================================================== */

// App state
let cart        = JSON.parse(localStorage.getItem('nc_cart') || '[]');
let wishlist    = JSON.parse(localStorage.getItem('nc_wl')   || '[]');
let currency    = localStorage.getItem('nc_currency') || 'USD';
let currentCategory = 'all';
let currentBrand    = 'all';
let currentSort     = 'default';
let currentProduct  = null;
let cfgQty    = 1;
let cfgColor  = null;
let cfgOption = null;
let heroIndex    = 0;
let heroInterval = null;
let payMethod    = 'card';
let loggedIn     = localStorage.getItem('nc_user') || null;

// Currency formatting
function fmt(usd) {
  const val = usd * RATES[currency];
  const sym = SYMBOLS[currency];
  if (currency === 'USD') return sym + val.toLocaleString();
  return sym + Math.round(val).toLocaleString();
}

function setCurrency(c) {
  currency = c;
  localStorage.setItem('nc_currency', c);
  document.querySelectorAll('.cur-btn').forEach(b =>
    b.classList.toggle('active', b.textContent.trim() === c)
  );
  renderProducts();
  updateCartUI();
  updateHeroPricing();
  toast(`Currency set to ${c}`, 'success');
}

// Mobile nav toggle
function toggleNavMenu() {
  const navLinks = document.querySelector('.nav-links');
  if (!navLinks) return;
  navLinks.classList.toggle('closed');
}

// Global init
window.addEventListener('DOMContentLoaded', () => {
  // Hide loader after 2 seconds
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('hidden');
  }, 2000);

  renderBrandsStrip();
  renderHero();
  renderProducts();
  updateBadges();

  if (loggedIn) updateAuthBtn();

  // Sticky navbar
  window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (!nav) return;
    nav.classList.toggle('scrolled', window.scrollY > 50);
  });
  const nav = document.getElementById('navbar');
  if (nav) nav.classList.add('scrolled');

  // Hero auto-rotate
  heroInterval = setInterval(nextHero, 5500);
});

// Close overlays/modals with Escape for accessibility
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeCart();
    closeWishlist();
    closeAuth();
    closeConfigurator();
    closeCheckout();
    closeSuccess();
  }
});