# NOIRÉ — Contemporary Luxury Streetwear

> **Portfolio Concept Project** — An intentional, high-fashion e-commerce experience designed with dark editorial aesthetics, architectural typography, and responsive micro-interactions.

---

## 1. Brand Identity & Art Direction

**NOIRÉ** is a fictional contemporary luxury fashion atelier specializing in heavyweight streetwear, architectural tailoring, and modular technical outerwear. 

### Creative Direction
* **Visual Foundation:** Pure obsidian blacks, smoky charcoal, and deep graphite with high-contrast chalk/bone typography.
* **Dominant Accent:** Electric Cobalt (`#3259ff`) — an energetic, confident, contemporary fashion statement.
* **Micro Status Accent:** Acid Volt (`#d4ff32`) — used sparingly for status indicators, limited drops, and key technical alerts.
* **Controlled Glassmorphism:** Applied strictly to floating navigation, modal overlays, slide-over utility drawers, and subtle badges.
* **Typography:** 
  * Headings & Brand Display: **Syne** (Weights 700, 800) — avant-garde, architectural, and runway-ready.
  * Body & Descriptions: **Plus Jakarta Sans** (Weights 400, 500, 600) — modern grotesque, highly readable.
  * Technical Specs & References: **Space Mono** (Monospace) — precision editorial codes.

---

## 2. Multi-Page Architecture

1. **`index.html` (Homepage):**
   * Cinematic campaign hero with coordinates and editorial badge
   * Live animated announcement ticker
   * Curated seasonal capsule highlights
   * Interactive featured product grid with instant quick-add/view
   * "Serie Noire" editorial lookbook split
   * Brand manifesto with 3 core pillars (Textile Mastery, Architectural Drape, Utilitarian Hardware)
   * Refined newsletter archive subscription with real-time feedback

2. **`shop.html` (Catalog):**
   * Dynamic category filtering (`All`, `T-Shirts`, `Hoodies`, `Outerwear`, `Trousers`, `Accessories`)
   * Real-time sorting (`Featured`, `Price: Low to High`, `Price: High to Low`, `Newest Drop`)
   * Wishlist quick access filter
   * Product count counter
   * 16 distinct fictional garments with color indicators and dual-image hover interactions

3. **`product.html` (Product Detail Experience):**
   * Dynamic product routing via URL query parameter (`?id=prod-01`, etc.)
   * Multi-angle gallery with click-to-swap and zoom states
   * Dynamic size selector with stock availability indicators
   * Quantity modifier and interactive Add to Bag
   * Comprehensive garment specifications table (GSM, fibers, milling origin, care)
   * Sizing architecture & shipping policy accordions
   * Dynamically populated complementary pieces grid

4. **`collections.html` (Editorial Archives):**
   * Narrative showcase of seasonal drops: *Drop 01: After Dark*, *Drop 02: Monochrome Utility*, *Capsule: Signal Void*, and *Permanent: The Essentials Core*
   * Lookbook portfolio grid with editorial coordinates

5. **`about.html` (Atelier Manifesto):**
   * Brand origin, design philosophy, and brutalist tailoring thesis
   * Japanese low-tension loom textile research narrative
   * Physical showroom network (Tokyo, Milan, Paris, New York)

6. **`contact.html` (Client Concierge):**
   * Fully validated client inquiry portal with transmission simulation
   * Dedicated department desks (Client Care, Press, Studio Fittings)
   * Live studio timezone reference
   * Client service FAQ accordion

---

## 3. Interactive Features & State Management

* **Persistent Shopping Bag:** `localStorage` driven cart with real-time item counter, quantity modification, price calculations, and free shipping progress meter ($250 threshold).
* **Persistent Wishlist:** Instant toggle with state persistence across pages and heart indicator synchronization.
* **Instant Search Modal:** Triggered via header button or global keyboard shortcut (`⌘K` / `Ctrl+K`), with real-time query matching against titles, categories, collections, and descriptions.
* **Adaptive Mobile Navigation:** Full-screen slide-over drawer with accessible backdrop and keyboard escape listeners.
* **Toast Notification Engine:** Non-intrusive micro-feedback notifications for cart, wishlist, and form actions.

---

## 4. Technical Specifications & Performance

* **Tech Stack:** Pure Semantic HTML5, Modular Modern CSS3 (Custom Properties & Fluid Typography), Vanilla JavaScript (ES6+). Zero bulky framework overhead.
* **SEO & Metadata:** Open Graph, Twitter Cards, canonical links, semantic landmarks, XML Sitemap (`sitemap.xml`), and Search Crawler directives (`robots.txt`).
* **Structured Data:** JSON-LD schema for `Organization`, `WebSite`, `Product`, and `CollectionPage`.
* **Accessibility:** WCAG AA compliant contrast ratios, visible keyboard focus indicators, skip-to-content links, screen-reader labels, and reduced-motion overrides.
* **Asset Tracking:** Detailed image attribution and licensing records maintained in `assets/SOURCES.md`.

---

## 5. Local Development & Preview

Run using any static local file server:

```bash
# Python
python -m http.server 8000

# Node.js
npx serve .
```

Then visit `http://localhost:8000` in any modern web browser.
