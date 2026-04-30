# 🚗 NovaCartel – East African Automotive Marketplace

NovaCartel is an interactive, multi‑currency ecommerce landing page for a fictional automotive marketplace operating across **Kampala, Nairobi, and Kigali**. It delivers a premium showroom experience with a hero slider, dynamic product grid, wishlist, cart, and support for local currencies.

> Built as a front‑end UI/UX project using HTML, CSS, and vanilla JavaScript.

---

## 🌍 Product Vision

NovaCartel explores what a modern **East African automotive and mobility platform** could look like.

The prototype focuses on:

- A clean, high‑end dealership experience for vehicles and lifestyle products.
- Realistic regional pricing using USD, UGX, and KES.
- Stateful interactions (cart, wishlist, configurator) implemented fully on the client side.

This front‑end can later be extended with real payment APIs (mobile money, cards) and a backend for inventory, authentication, and order management. [web:76][web:79]

---

## 🚀 Core Features

- **Hero product carousel**  
  Rotates between featured vehicles with imagery, key specs, and a primary “Order” call‑to‑action.

- **Dynamic product catalog**  
  Vehicles, Kiira Motors buses, energy solutions, and merch are defined in a JavaScript data file and rendered into the grid at runtime.

- **Multi‑currency pricing**  
  Toggle between **USD, UGX, and KES**, with conversion handled by a central formatter and shared rate table.

- **Filtering and sorting**  
  Filter by brand and category, sort by price or name, and see a live products count as criteria change. [web:59][web:62]

- **State‑managed cart and wishlist**  
  Add/remove items, update quantities, and keep state in `localStorage` so the cart and wishlist survive page reloads.

- **Product configurator**  
  “Order” opens a configuration flow for the selected vehicle, allowing customers to choose options, colours, and quantities before adding to cart.

- **Responsive, premium UI**  
  Dark theme, automotive‑inspired typography, and a mobile‑first layout that scales from phones to desktop. [web:61][web:63]

- **Company & Support sections**  
  Footer links open dedicated content areas for About, Careers, Investors, Press, Track Order, Returns, FAQ, and Contact.

---

## 🛠️ Tech Stack

- **HTML5** – Semantic layout and structure.
- **CSS3** – Custom styling using Flexbox/Grid, component classes, and responsive breakpoints.
- **Vanilla JavaScript (ES6)** – Rendering logic, app state, currency conversion, filters, hero slider, cart, wishlist, and modals.
- **Web Storage (localStorage)** – Persists cart, wishlist, currency selection, and basic session preferences.
- **Git & GitHub** – Version control, collaboration, and hosting of the codebase. [web:71][web:75]

---

## 💻 Getting Started

### Clone the repository

```bash
git clone https://github.com/A-Deogracious/ecommerce-product-page.git
cd ecommerce-product-page
```

### Run locally

You can open `index.html` directly in your browser, or use a simple dev server (recommended):

```bash
# with Node installed
npx live-server
# or use the "Live Server" extension in VS Code
```

Then open the local URL shown in the terminal (usually `http://127.0.0.1:5500/`).

The landing page will load with demo products, working hero slider, filters, currency toggle, cart, wishlist, and footer info sections.

---

## 📈 Roadmap

- Backend API for inventory, orders, and user accounts.
- Real authentication and user profiles (saved configurations, order history).
- Payment integration for card and mobile money (e.g. Flutterwave, MTN MoMo, M‑Pesa).
- Analytics for most viewed vehicles, top brands, and conversion funnel.
- Admin interface for managing products, brands, and pricing. [web:80]

---

This project was created as part of a 2026 UI/UX coursework assignment and is maintained as a learning and portfolio piece.