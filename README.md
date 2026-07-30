# FakeStore Vue

E-commerce web app built with Vue 3 and TypeScript. It displays products and categories from the [Fake Store API](https://fakestoreapi.com/docs), supports category filtering via URL, product details, and client-side cart and wishlist state.

## Tech Stack

- Vue 3 (Composition API, `<script setup>`)
- TypeScript
- Vue Router
- Pinia
- Vite
- SCSS (CSS custom properties for theming)
- Vitest

## Prerequisites

- [Node.js](https://nodejs.org/) `^22.18.0` or `>=24.12.0` (see `engines` in `package.json`)
- npm

## Local Setup

1. Clone the repository:

```sh
git clone <repository-url>
cd fakestore-vue
```

2. Install dependencies:

```sh
npm install
```

3. Start the development server:

```sh
npm run dev
```

4. Open the URL shown in the terminal (usually `http://localhost:5173`).

No environment variables are required — the app uses the public Fake Store API.

## Authentication

Cart and wishlist require login. Use the demo credentials from the [Fake Store API](https://fakestoreapi.com/docs):

| Field | Value |
|-------|-------|
| Username | `johnd` |
| Password | `m38rmF$` |

Open `/login` in the app or click **Log in** in the header.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with hot reload |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build locally |
| `npm run type-check` | Run TypeScript checks |
| `npm run test:unit` | Run unit tests with Vitest |
| `npm run lint` | Run ESLint and Oxlint |
| `npm run format` | Format source files with Prettier |

## Features

- Responsive layout with header navigation and category filter
- Product grid on the home page with deep-linkable category URLs
- Product detail page
- Login / logout (Fake Store auth API)
- Shopping cart and wishlist (Pinia, requires authentication)
- Light / dark theme toggle
- Loading and error states for API requests

## Project Structure

```
src/
├── api/           # Fake Store API calls
├── components/    # Reusable UI components
├── composables/   # Shared composables (e.g. useFetch)
├── router/        # Vue Router configuration
├── stores/        # Pinia stores (auth, cart, wishlist)
├── styles/        # Global SCSS and design tokens
├── types/         # TypeScript types
└── views/         # Route-level page components
```

## API

Data is fetched from `https://fakestoreapi.com`. Main endpoints used:

- `GET /products`
- `GET /products/:id`
- `GET /products/categories`
- `GET /products/category/:category`
- `POST /auth/login`
