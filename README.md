# Product List with Cart

A responsive dessert-shop product list and shopping cart, built as a solution to the [Frontend Mentor "Product list with cart" challenge](https://www.frontendmentor.io/challenges/product-list-with-cart-5MmqvBvyJc).

![Preview](public/design/preview.jpg)

## Overview

Browse a grid of desserts, add/remove items from your cart, watch the order total update live, and confirm your order through a summary modal — all with smooth animated transitions.

### Features

- Add items to cart / adjust quantity with `+` and `-` controls
- Remove an item directly from the cart
- Live-updating item count and order total
- Empty-cart placeholder state
- "Confirm Order" summary modal listing items and total
- "Start a New Order" resets the cart
- Cart contents persisted in `localStorage` (survives page refresh)
- Responsive layout (mobile / tablet / desktop), with per-breakpoint product images via `<picture>`
- Animated UI (staggered entrances, spring transitions) via Framer Motion

## Tech Stack

- [React 19](https://react.dev/) (via [Vite](https://vitejs.dev/))
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Framer Motion](https://www.framer.com/motion/) for animation
- [react-toastify](https://fkhadra.github.io/react-toastify/) for the post-order toast notification
- [Ionicons](https://ionic.io/ionicons) (loaded via CDN) for icons

## Project Structure

```
public/
  data.json          # Seed product catalog (name, price, category, images)
  images/            # Product & UI images
src/
  App.jsx            # Root component: loads/persists product state, cart update logic
  components/
    Products.jsx        # Product grid
    ProductTemplate.jsx  # Single product card (add/remove controls, responsive image)
    Cart.jsx             # Cart panel, order total, confirm order flow
    SuccessModal.jsx     # Order confirmation modal (rendered via portal)
  index.css           # Tailwind entry point
  main.jsx            # App entry point
```

### How it works

- On first load, `App.jsx` fetches `public/data.json` and caches it in `localStorage` under `productsDetails`. Subsequent loads read from the cache (and the cache is invalidated/refetched automatically if its shape doesn't match the current data model).
- Cart state lives in `App.jsx` and is shared with the rest of the tree via the `UpdateProducts` React context, exposing a single `updateProducts(action, id, number)` function used to change an item's quantity or reset the whole cart.
- Each product carries a stable `id` used for identity across renders, cart lookups, and removal — not its display name.

## Getting Started

```bash
# install dependencies
npm install

# start the dev server
npm run dev

# lint
npm run lint

# build for production
npm run build

# preview the production build
npm run preview
```

## Acknowledgments

Challenge and designs by [Frontend Mentor](https://www.frontendmentor.io).
