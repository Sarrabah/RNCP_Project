# Art Créa Pro — Project Summary

## Purpose

Art Créa Pro is an MVP created for an RNCP Level 7 certification project. It responds to a practical workflow for architects: gathering products for a customer project, preparing a quote request, and sharing that request with hardware stores in order to compare offers.

The current application is architect-focused. The intended longer-term platform also includes hardware-store users and direct collaboration between architects and stores.

## What the MVP does today

Authenticated architects can:

- Register, log in, and log out.
- Browse products and filter them by category.
- View product details.
- Add products and quantities to a basket.
- Create quote requests.
- Add the basket's products to one or more quote requests.
- View a quote request and its selected products.

The database includes hardware stores and a relationship between stores and quote requests, establishing the foundation for sending a request to stores. A hardware-store-facing workflow and quote/price response flow are not yet exposed by the current API or frontend.

## Out of scope

- hardware store features.


## Architecture

```
React + TypeScript frontend
        │  HTTP requests with session authentication
        ▼
Django + Django REST Framework backend
        │
        ▼
MySQL database
```

Docker Compose starts the Django backend and MySQL database. Django is configured to serve the built frontend's static files, while the React application can also be run independently during development.

## Technology stack

| Area | Current technology |
| --- | --- |
| Frontend | React 18, TypeScript, React Router, Ant Design, CSS |
| Backend | Python, Django 5.1, Django REST Framework |
| Database | MySQL 8 |
| Local infrastructure | Docker Compose, Docker, Makefile |
| Deployment | Scaleway |
| Quality tooling | Black, isort, flake8, ESLint, Prettier, Jest/React Testing Library |

## Main frontend areas

The frontend uses React Router and protects application pages with a `PrivateRoute` component. Its main pages and components cover:

- Welcome, login, and registration.
- Home/product listing and category pages.
- Product details.
- Basket management through `BasketContext`.
- Quote-request listing/creation and quote-request product details.
- Shared navigation bar and sidebar.


## Main backend API

The Django application is in `backend/my_app`. Available endpoints are:

| Endpoint | Methods | Purpose |
| --- | --- | --- |
| `/register` | `POST` | Create an architect account |
| `/login` | `POST` | Authenticate an architect and create a session |
| `/logout` | `POST` | End the current session |
| `/products` | `GET` | List products |
| `/product/<id>` | `GET` | Get product details |
| `/quoterequests` | `GET` | List quote requests owned by the logged-in architect |
| `/quoterequest` | `POST` | Create a quote request for the logged-in architect |
| `/basketelements` | `POST` | Add basket products and quantities to selected quote requests |
| `/quoterequestproducts/<id>` | `GET` | Get a quote request's product names, images, and quantities |

Product and quote-request endpoints use Django session authentication through `LoginRequiredMixin`.

## Data model

| Model | Role |
| --- | --- |
| `Architect` | Custom Django user model. Uses email as the login identifier. |
| `Product` | Product name, category, and image reference. |
| `QuoteRequest` | A named quote request with a status, owned by an architect. |
| `QuoteRequestProduct` | Join model connecting products to quote requests, with a quantity. Each product can occur once per request. |
| `HardwareStore` | Store name, adresse , region code and the email. |
| `HardwareStoreQuoteRequest` | Join model that can associate hardware stores with quote requests. |

## Current scope and improvement opportunities

The project already provides the core architect workflow. The next improvements naturally fall into these areas:

1. Hardware-store features.
2. Quote-request lifecycle: clearly defined statuses, validation, editing/removal of products, and submission tracking.
3. API robustness: permission checks on individual quote requests, more specific validation/errors, pagination/filtering, and API tests.
4. Security and deployment: move development values such as `DEBUG`, the secret key, and database credentials to environment-specific configuration; configure production hosts and static assets.
5. User experience: improve responsive design, loading/error states, accessible forms, and test coverage for the main user journeys.
6. Documentation: replace the default Create React App README with project-specific frontend instructions and document environment variables, API contracts, and deployment.
7. Axios and `@types/axios` are present in `frontend/package.json`, but the current source code does not import or use them. They can be removed as dependency cleanup, or adopted later for API calls.

## Repository map

```
backend/             Django project and REST API
backend/my_app/      Domain models, serializers, services, views, migrations
frontend/            React TypeScript application
frontend/src/        Pages, reusable components, routes, styles, basket context
notes/               Project documentation and working notes
docker-compose.yml   Backend + MySQL local environment
Makefile             Development, formatting, linting, test, and database commands
```

This summary describes the repository as inspected on 29 July 2026.
