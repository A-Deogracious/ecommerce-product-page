/* RESET + GLOBAL */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Inter', sans-serif;
}

/* CHANGE 1: Added smooth scrolling for better UX */
html {
  scroll-behavior: smooth; /* Improves navigation experience when clicking links */
}

body {
  background: #0f172a;
  color: #fff;
  line-height: 1.6;
}

/* NAVBAR */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
  transition: 0.3s;
}

/* CHANGE 2: Added subtle shadow for depth */
.navbar.solid {
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 10px rgba(0,0,0,0.4); /* Gives navbar elevation when scrolling */
}

.logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: #38bdf8;
}

/* CHANGE 3: Slight spacing improvement */
.nav-menu {
  display: flex;
  gap: 24px; /* Increased from 20px for better spacing */
  list-style: none;
}

.nav-menu a {
  text-decoration: none;
  color: #fff;
  transition: 0.3s;
}

/* CHANGE 4: Added underline animation */
.nav-menu a::after {
  content: '';
  display: block;
  height: 2px;
  width: 0;
  background: #38bdf8;
  transition: width 0.3s;
}

.nav-menu a:hover::after {
  width: 100%; /* Smooth underline effect */
}

.nav-menu a:hover {
  color: #38bdf8;
}

.auth-btn {
  padding: 8px 16px;
  border: none;
  background: #38bdf8;
  color: #000;
  border-radius: 6px;
  cursor: pointer;
}

/* CHANGE 5: Button hover improvement */
.auth-btn:hover {
  background: #0ea5e9; /* Slightly darker for interaction feedback */
}

/* HERO */
.visual-stage {
  margin-top: 100px;
  text-align: center;
}

/* CHANGE 6: Added shadow for premium look */
.hero-image {
  width: 90%;
  max-width: 1000px;
  border-radius: 20px;
  transition: transform 0.5s ease;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5); /* Adds depth */
}

.hero-image:hover {
  transform: scale(1.03);
}

/* PRODUCT GRID */
.product-section {
  padding: 40px;
  display: flex;
  justify-content: center;
}

/* CHANGE 7: Added border for subtle definition */
.product-card {
  width: 300px;
  background: #1e293b;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: 0.3s;
  border: 1px solid rgba(255,255,255,0.05); /* Makes cards more defined */
}

.product-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.5);
}

.product-img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.product-info {
  padding: 15px;
}

/* CHANGE 8: Added slight spacing */
.price {
  color: #38bdf8;
  font-weight: bold;
  margin-top: 5px; /* Improves readability */
}

/* CONFIGURATOR */
.configurator-sidebar {
  position: fixed;
  right: 0;
  top: 100px;
  width: 300px;
  background: #020617;
  padding: 20px;
  border-left: 1px solid #333;
}

/* BUTTON */
.cta-button {
  width: 100%;
  padding: 12px;
  margin-top: 10px;
  border: none;
  background: linear-gradient(45deg, #38bdf8, #0ea5e9);
  color: #000;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
}

/* CHANGE 9: Added hover animation */
.cta-button:hover {
  transform: translateY(-2px); /* Gives click feedback */
}

/* MODAL */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.8);
  display: none;
  justify-content: center;
  align-items: center;
}

/* CHANGE 10: Smooth modal appearance */
.modal-overlay.active {
  display: flex;
  animation: fadeIn 0.3s ease; /* Adds smooth transition */
}

/* NEW animation */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.modal-content {
  background: #1e293b;
  padding: 30px;
  border-radius: 12px;
  width: 350px;
}

/* CLOSE BUTTON */
.close-btn {
  float: right;
  background: none;
  border: none;
  color: #fff;
  font-size: 18px;
  cursor: pointer;
}

/* INPUT */
.auth-input {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: none;
  border-radius: 6px;
}

/* CHANGE 11: Added transition */
.auth-input {
  transition: 0.2s;
}

.auth-input:focus {
  outline: 2px solid #38bdf8;
}

/* TABS */
.tab-btn {
  padding: 10px;
  margin-right: 5px;
  border: none;
  cursor: pointer;
}

/* CHANGE 12: Added hover feedback */
.tab-btn:hover {
  background: #334155;
}

.tab-btn.active {
  background: #38bdf8;
  color: #000;
}

/* FOOTER */
footer {
  text-align: center;
  padding: 20px;
  margin-top: 50px;
  background: #020617;
}

/* MOBILE */
.menu-toggle {
  display: none;
}

/* MOBILE RESPONSIVE */
@media (max-width: 768px) {
  .nav-menu {
    position: absolute;
    top: 70px;
    right: 0;
    background: #020617;
    flex-direction: column;
    width: 200px;
    display: none;
  }

  .nav-menu.open {
    display: flex;
  }

  .menu-toggle {
    display: block;
    font-size: 20px;
    background: none;
    border: none;
    color: white;
  }

  .configurator-sidebar {
    display: none;
  }
}
