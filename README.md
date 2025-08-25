## Code Share

The project is a full-featured e-commerce catalog built to showcase modern web
architecture, thoughtful UX, and robust backend integration. It demonstrates a
complete shopping experience, including catalog browsing, filtering, cart
management, and coupon application — all powered by a scalable Vue.js + Pinia
codebase.

## Architecture and Decisions

This project is structured as a monorepo for maintainability and code reuse:

- `shared/`: shared types and utilities across frontend and backend.
- `web/`: main frontend application (Vue + Pinia).
- `server/`: backend API serving catalog, cart, and coupon data; also used for
  mock data during development.

**Backend:**

- Provides REST endpoints for products, categories, and coupon validation.
- Includes mock data for realistic testing without external dependencies.

**Frontend:**

- Built with Vue and Pinia for reactive state management.
- API calls handled via a dedicated `requests/` service layer.
- State persisted in session storage; catalog filters reflected in the URL for
  shareable links.
- Cart handles all calculations client-side, including subtotal, total,
  discounts, and coupon support.
- Fully WCAG-compliant with semantic HTML and keyboard navigation.

**Design System:**

- Custom Figma-based design system to ensure consistent styling.
- CSS variables match Figma tokens for seamless handoff.
- [Figma Project](https://www.figma.com/design/ZplsoLMwCMqE1UExwZltzn/Code-Share?m=autoandt=DHNGTbTkR7C2B3ek-1)

## Features and API

- **Catalog:** Browse, filter, search products; shareable URLs persist state.
- **Cart and Checkout:** Add/remove items, update quantities, see real-time
  totals, validate coupons.
- **API Endpoints:**

  - `GET /api/products` – list all products
  - `GET /api/products/<slug>` – get a product by slug
  - `GET /api/categories` – list all categories
  - `POST /api/coupons/validate` – validate and apply coupon

- **Mock Backend:** All data served from the backend for testing and demos.

**Test Coupons:**

- `HELLOWORLD` – 10% off
- `BYTEWISE10` – 10% off
- `CODEMASTER25` – 25% off

## Running the Project

**1. Install PNPM (if needed):**

```bash
npm install -g pnpm@latest
```

**2. Install dependencies:**

```bash
pnpm install
```

**3. Start development environment:**

```bash
make dev
```

Open your browser at [http://localhost:3000](http://localhost:3000).

## Deployment

This project is containerized with Docker and runs anywhere Docker is supported.

**1. Build the Docker image**:

```bash
docker build -t code-share .
```

**2. Run the container**:

```bash
docker run -p 4000:3000 code-share
```

All static assets and mock data are included in the Docker image.

## Why This Architecture?

- **Monorepo:** Simplifies code sharing and ensures type safety.
- **Persistent Queries:** Makes catalog state shareable and bookmarkable.
- **Mock Backend:** Enables fast prototyping without external dependencies.
- **Custom Design System:** Ensures consistent UI and smooth handoff.
- **Service Layer:** Keeps API calls organized and testable.

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
