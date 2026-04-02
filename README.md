# 🚗 NovaCartel – East African Automotive E‑commerce

An interactive, multi-currency ecommerce landing page for **NovaCartel**, a fictional automotive marketplace operating across **Kampala, Kigali, and Nairobi**. The page showcases a premium car showroom experience with a **hero slider, dynamic product grid, wishlist, cart, and local currency support**.

## 🌍 Product Vision

NovaCartel is designed as a front-end prototype for an **East African automotive marketplace**, focusing on high-end vehicles and related products. The goal is to simulate a real ecommerce engine that:

- Feels like a modern car dealership website.
- Supports regional currencies (USD, UGX, KES) for East African buyers.
- Demonstrates stateful user interactions (cart, wishlist, configuration) using only frontend technologies.

This project is a foundation for future integration with real payment APIs (e.g. mobile money) and a backend inventory system.

## 🚀 Core Features

- **Hero product carousel**  
  Rotates between featured vehicles with background image, specs, and “Order” call‑to‑action.

- **Dynamic product rendering**  
  Products (cars, energy products, merch) are defined in a JavaScript array and rendered into the grid at runtime.

- **Multi-currency pricing**  
  Toggle between USD, UGX, KES with on-the-fly price conversion via a central formatter function.

- **Filter and sort system**  
  Filter by brand and category, sort by price or name, and see the live results count.

- **State-managed cart and wishlist**  
  Add/remove items to cart and wishlist, persisted in localStorage so state survives page reloads.

- **Product configurator (detail flow)**  
  “Order” or hero CTA opens a configuration flow for the selected vehicle (quantity, options, color where applicable).

- **Responsive, premium UI**  
  Mobile‑first layout, large hero, clean cards, consistent spacing and typography for a high-end automotive look.

## 🛠️ Tech Stack

- **HTML5** – Semantic structure for better accessibility and SEO.
- **CSS3** – Custom layout and components using Flexbox/Grid and utility-style classes.
- **Vanilla JavaScript (ES6)** – App state management, rendering logic, currency conversion, filters, cart, wishlist, hero slider.
- **LocalStorage** – Persists cart, wishlist, currency and user session data on the client.
- **Git & GitHub** – Version control, project history, and portfolio hosting.

## 💻 Running the Project

1. **Clone the repository**
   ```bash
   git clone https://github.com/A-Deogracious/ecommerce-product-page.git
   cd ecommerce-product-page
   ```

2. **Open in a browser**

   - Easiest: double‑click `index.html`, or
   - Use a simple dev server (recommended):

     ```bash
     # with Node installed
     npx live-server
     ```

     Then open the provided local URL in your browser.

The page will load with demo products, working hero slider, filters, multi‑currency pricing, cart, and wishlist.

## 📈 Possible Future Enhancements

- Add backend API for inventory and orders (Node/Express or Django/DRF).
- Implement user accounts and authentication.
- Add basic analytics (most viewed vehicle, most added to cart, etc.).