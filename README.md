# GhorerBazar — Safe & Reliable Food E-Commerce

Next.js 15 (App Router) + React 19 + TypeScript + Tailwind CSS v4 storefront recreating [ghorerbazar.com](https://ghorerbazar.com/).

## Key Features & Routes

- `/` — Homepage featuring sticky header with instant live search autocomplete, 12-category navigation bar with dropdowns, Hero slider + side promo banner, Featured Categories carousel, 4-card Top Selling horizontal showcase (`Add To Cart` + `Buy now`), Our Brands carousel, category product carousels (`All Natural Honey`, `Premium Dates`, `Cooking Essentials`, `Organic Food`), mid-page promotional banner, `Just For You` grid with Load More, and 5-column Footer with payment badges.
- `/collections/[slug]` — Category & collection catalog with subcategory checklists, dual-handle Price Range slider, Brand & Product Flag filters, sorting, per-page count, and pagination.
- `/products/[slug]` — Product details page with multi-image gallery, discount calculation, quantity controls, Add to Cart, Buy Now, Order on WhatsApp, hotline link, Description & Customer Reviews tabs, and Related Products.
- `/checkout` & `/buy/now/[id]` — Complete checkout flow supporting Inside/Outside Dhaka shipping rates, promo codes (`GHORER10`, `HONEY200`), payment method selection, and instant order confirmation.
- `/track/order` — Interactive 5-step order status tracker (includes sample order `GB-10042` plus newly placed orders).
- `/my/wishlists`, `/login`, `/all-brands`, `/brand/[slug]`, `/faq`, `/page/[slug]`.

## Setup Instructions

### Prerequisites

- Node.js 18+ (tested with Node.js 24)
- npm 9+

### Install & Run Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Typecheck & Production Build

```bash
npm run typecheck
npm run build
npm run start
```
