# Code Share

This project is a full-featured e-commerce catalog experience built as a
portfolio project to showcase modern web architecture, thoughtful UX, and robust
backend interaction. The project demonstrates a complete shopping flow,
including catalog browsing, persistent filters, cart calculation, and coupon
support — all powered by a scalable and maintainable Vue.js codebase.

## Architecture and Decisions

- **Monorepo Structure**:

  - `shared/`: All shared types and utilities.
  - `web/`: The main frontend application (Vue + Pinia).
  - `server/`: Backend API, also used for deployment and serving mock data.

- **Backend**:

  - Serves as both the API for the frontend and the deployment target.
  - Provides all catalog, cart, and coupon data via REST endpoints.
  - Mock data is used for demo and testing purposes.

- **Frontend**:

  - Built with [Vue](https://vuejs.org/) and [Pinia](https://pinia.vuejs.org/)
    for fast, modern, and interactive UI.
  - All API calls are handled via a dedicated `requests/` service layer and
    custom composables like `useAsyncQuery`.
  - Centralized state management using Pinia with support for both synchronous
    and asynchronous operations.
  - State is persisted in session storage to maintain app context across page
    reloads.
  - Catalog filters are stored in query parameters, making filter states
    shareable via URL.
  - Cart handles all price calculations including subtotal, total, discounts,
    and coupon support.
  - Fully WCAG-compliant: keyboard navigable, proper ARIA attributes, and
    semantic HTML used throughout.

- **Design System**:

  - Custom Figma design system created specifically for this project.
  - CSS variables are used for theme consistency; Figma tokens match the
    codebase for seamless handoff.
  - Figma Project:
    [**Code Share**](https://www.figma.com/design/ZplsoLMwCMqE1UExwZltzn/Code-Share?m=auto&t=DHNGTbTkR7C2B3ek-1)

- **State and UX**:
  - Cart and catalog state are managed on the client, with calculations (totals,
    discounts) performed in the browser for instant feedback.
  - All catalog and cart actions are reflected in the URL and UI, supporting
    deep linking and shareability.

## Features

- **Full Catalog Experience**:

  - Browse, filter, and search products with persistent queries.
  - Shareable URLs reflect current filters and search state.

- **Cart and Checkout**:

  - Add/remove items, update quantities, and see real-time totals.
  - Coupon code support with validation and discount calculation.

- **Mock Backend**:

  - All data (products, coupons, etc.) is served from the backend for realistic
    testing and deployment.

## Server API Endpoints

- `GET /api/products`  
  Returns all available products.

- `GET /api/products/<slug>`  
  Returns a product by slug.

- `GET /api/categories`  
  Returns a list of all product categories.

- `POST /api/coupons/validate`  
  Validates and applies a coupon code to the cart.

## Coupon Codes (for testing)

The following coupon codes are available for testing discount logic in cart:

- `HELLOWORLD` – 10% off
- `BYTEWISE10` – 10% off
- `CODEMASTER25` – 25% off

## Running the Project

1. **Install PNPM** (if not installed):

   ```bash
   npm install -g pnpm@latest
   ```

   [https://pnpm.io/installation](https://pnpm.io/installation)

2. **Install dependencies**:

   ```bash
   pnpm install
   ```

3. **Start the application**:

   ```bash
   make dev
   ```

   This command will start the frontend and backend, as well as listen for
   changes in the shared package.

4. **Open your browser** at [http://localhost:3000](http://localhost:3000) (or
   the port shown in the terminal).

## Deployment

**TBD**

## Why This Architecture?

- **Monorepo**: Simplifies code sharing and type safety across backend and
  frontend.
- **Persistent Queries**: Improves UX by making catalog state shareable and
  bookmarkable.
- **Mock Backend**: Enables rapid prototyping and easy deployment without
  external dependencies.
- **Custom Design System**: Ensures visual consistency and efficient handoff
  between design and development.
- **Service Layer**: Keeps data fetching logic organized and testable.

## Licence

This is an open-source project and is available under the
[**MIT License**](LICENSE). You are free to use, modify, and distribute the code
in accordance with the terms of the license.

## Contributors

Contributions are highly appreciated! If you encounter any issues or have
suggestions for improvements, please feel free to open an issue or submit a pull
request.

[feliperdamaceno](https://github.com/feliperdamaceno)

## Contact me

Linkedin: [feliperdamaceno](https://www.linkedin.com/in/feliperdamaceno)
