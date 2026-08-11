# ADR: Organize the Django Backend by Domain

**Status:** Proposed  
**Date:** 2026-08-03

## Context

The backend is currently implemented in one Django application, `my_app`. Its
models, REST views, serializers, URLs, and services cover several distinct
business areas:

* architect accounts and authentication;
* product catalogue;
* quote requests and their products;
* hardware stores (currently limited).

This is appropriate for an MVP, but it makes the application harder to read
and change as features grow. For example, `models.py`, `views.py`,
`serializers.py`, and `services.py` each contain code for multiple business
areas.

We need a structure that makes ownership clear without introducing excessive
abstraction for a small Django project.

## Decision

We will progressively split the backend into Django applications based on
business domains. This project adopts **Domain-Driven Design (DDD)** as an
organizational approach: code is grouped around the business concepts of Art
Créa Pro rather than around technical file types only.

This is a pragmatic, lightweight use of DDD for a Django application. It does
not require every advanced DDD pattern (such as aggregates, value objects,
domain events, or a separate repository for every model) from the start. The
goal is to make the business language, responsibilities, and rules explicit
while keeping Django's ORM and Django REST Framework practical to use.

Each application will use `domain`, `application`, and `api` packages.
Domain means the business part of your app: the real concepts and rules of Art Créa Pro.
Application means the actions your system performs using those business concepts. These are called use cases.


```text
backend/
  config/                         # Django settings, root URLs, ASGI/WSGI
  apps/
    accounts/
      domain/
        models.py
      application/
        services.py
      api/
        serializers.py
        views.py
        urls.py
      tests/
    catalog/
      domain/
        models.py
      application/
        services.py
      api/
        serializers.py
        views.py
        urls.py
      tests/
    quote_requests/
      domain/
        models.py
      application/
        services.py
      api/
        serializers.py
        views.py
        urls.py
      tests/
```

The proposed initial domain ownership is:

| Domain | Main responsibilities | Current models |
| --- | --- | --- |
| `accounts` | Architect registration, login, logout, authenticated identity | `Architect` |
| `catalog` | Browse products and view product details | `Product` |
| `quote_requests` | Create and fill quote requests; assign products and quantities | `QuoteRequest`, `QuoteRequestProduct`, `HardwareStoreQuoteRequest` |
| `stores` (future) | Hardware-store profile and quote responses | `HardwareStore` |

`HardwareStore` may remain with `quote_requests` until hardware-store features
are developed. A separate `stores` application is not required yet.

## Layer Responsibilities

### How DDD is used in this project

DDD starts from the business domain: the real problem the software solves and
the vocabulary used by the people involved. For Art Créa Pro, examples include
an **architect**, a **product**, a **quote request**, a **quantity**, and a
**hardware store**.

Those concepts define the module boundaries and should also guide names in
code, tests, and API documentation. For example, quote-request behavior belongs
to `quote_requests`, rather than being mixed with all other backend behavior in
a generic `services.py` file.

The project uses DDD through these principles:

* Organize code by business domain (`accounts`, `catalog`, and
  `quote_requests`).
* Keep business rules close to the domain that owns them.
* Express user actions as application use cases, such as creating a quote
  request or adding products to it.
* Keep infrastructure details, including HTTP/DRF code, at the system
  boundary.
* Use a shared, clear vocabulary: the same business term should describe the
  same concept in the model, service, API, and tests where possible.

DDD here is an incremental design direction, not a requirement to rewrite the
MVP or create abstractions before they provide value.

### Domain

`domain` represents the business concepts and business rules. In Django, it
initially contains the ORM models owned by that domain.

```text
quote_requests/domain/models.py
  QuoteRequest
  QuoteRequestProduct
```

Business rules that do not depend on HTTP can also live here. For example: a
quote request cannot be submitted when it has no products.

### Application

`application` contains use cases: the operations the system performs. It
coordinates models, applies domain rules, and persists the result. This is the
role currently mostly played by `my_app/services.py`.

```text
quote_requests/application/services.py
  create_quote_request(...)
  add_products_to_quote_request(...)
  list_quote_requests_for_architect(...)
```

This layer must not return HTTP responses or depend on DRF request objects
where avoidable. Pass explicit values such as the authenticated architect or a
validated command/data object instead.

### API

`api` is the REST/HTTP interface and contains Django REST Framework-specific
code:

```text
quote_requests/api/
  serializers.py   # validates request JSON and shapes response JSON
  views.py         # receives HTTP requests and returns HTTP responses
  urls.py          # maps URLs to views
```

Views should stay thin: validate the request, call an application use case,
serialize the outcome, and choose the HTTP status code. They should not contain
business workflows.

## Dependency Direction

The normal flow is:

```text
HTTP request
  -> API (view and serializer)
  -> Application (use case/service)
  -> Domain (models and business rules)
  -> Database
```

For example, the current `POST /quoterequest` flow becomes:

```text
QuoteRequestApiView.post()
  -> serializer validates the request body
  -> create_quote_request(architect, data)
  -> QuoteRequest is created through the domain model
  -> serializer returns the JSON response
```

The application and domain layers should not need to know about HTTP status
codes, `request.data`, or React's JSON format. The API layer is allowed to
depend on the application layer; the reverse dependency should be avoided.

## Naming and Code Conventions

* Use Python `snake_case`: `architect_id`, not `archiId`.
* Use clear relationship names: `quote_request` and `product` rather than
  `quote_request_object` and `product_object` when a safe migration can be
  planned.
* Keep API endpoint names and request/response formats stable during the
  structural migration.
* Fix externally visible or database-backed names, such as `adress`, only in a
  dedicated migration with compatibility considered.
* Add tests close to the relevant domain or use case before moving critical
  quote-request logic.

## Migration Plan

1. Create `apps` and the new application packages while keeping existing URL
   paths and database tables unchanged.
2. Extract `catalog` first because product listing and detail retrieval are
   relatively independent.
3. Extract `accounts`, including registration and authentication endpoints.
4. Extract `quote_requests`, moving its models, use cases, serializers, views,
   and routes together.
5. Add focused tests for each migrated use case and remove the obsolete
   `my_app` code only after routes and tests pass.

The migration is organizational first. It should not combine table renames,
field renames, endpoint redesign, or behavior changes unless they are tracked
as separate decisions and migrations.

## Consequences

### Positive

* Related code is easier to find and understand.
* New features have an obvious home.
* REST concerns are separated from business workflows.
* Domain ownership makes testing and future changes safer.
* The design remains familiar to Django developers and does not require a
  heavy DDD framework.

### Negative

* There will be more directories and imports.
* Moving Django models between applications requires care around `INSTALLED_APPS`
  and migration history.
* During the transition, a temporary compatibility layer may be needed to avoid
  changing public endpoints or database tables.

## Conclusion

The backend will evolve from one technical `my_app` module into small,
business-oriented Django applications. Each application will keep its domain
models and rules, application use cases, and REST API code separate, while
preserving a pragmatic Django implementation.
