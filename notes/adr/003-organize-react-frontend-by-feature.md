# ADR: Organize the React Frontend by Feature

**Status:** Proposed  
**Date:** 2026-08-03

## Context

The frontend currently separates files mainly by technical type:

```text
src/
  pages/
  components/
  context/
  types/
  styles/
```

This is convenient for a small application, but code for one business feature
is spread across several directories. For example, product browsing includes
pages, components, types, styles, and future API calls that need to be found in
different places.

As the application grows, the frontend should make business ownership easier to
understand and allow a developer to change one feature with minimal navigation
across unrelated folders.

## Decision

The frontend will progressively use a feature-based organization. Files that
belong to one user-facing capability are kept together under `features/`.

The main top-level structure will be:

```text
src/
  app/
  features/
  shared/
  assets/
```

The project will use direct, consistent business names for features. The
current product-browsing capability will be named `catalog`, because it covers
the collection of products as well as browsing, category filtering, and product
details.

## Folder Responsibilities

### `app/`: Application Assembly

`app/` contains code that assembles the whole React application, rather than
code for an individual business feature.

```text
app/
  App.tsx
  router.tsx
  providers.tsx
```

Typical responsibilities are the root application component, React Router
configuration, and global application providers. It should not contain
product-, basket-, or quote-request-specific UI.

### `features/`: Business Functionality

`features/` contains the application's user-facing business capabilities.
Each feature owns its pages, feature-specific components, types, styles, API
code when needed, and tests.

```text
features/
  auth/
  catalog/
  basket/
  quote-requests/
```

For example, all product-browsing code belongs together:

```text
features/catalog/
  components/
    Product.tsx
    ProductList.tsx
    ProductDetail.tsx
  pages/
    HomePage.tsx
    CategoryPage.tsx
  types.ts
  tests/
```

This means a change to product browsing can normally be made within
`features/catalog/`, without searching separately through global `pages`,
`components`, `types`, and `styles` folders.

### `shared/`: Reusable Code

`shared/` contains code that is genuinely reusable across multiple features and
does not depend on one business domain.

```text
shared/
  components/
    NavBar.tsx
    SideBar.tsx
    PrivateRoute.tsx
  styles/
    globals.css
  types/
```

`NavBar`, `SideBar`, and `PrivateRoute` are shared because they support several
areas of the application. In contrast, `ProductCard` or `ProductDetail` know
about the catalogue and therefore belong in `features/catalog/`, not `shared/`.

Generic UI components added later, such as `Button`, `Loader`, `EmptyState`, or
`ErrorMessage`, may also belong in `shared/components/` when they do not contain
feature-specific behavior.

### `assets/`: Imported Static Files

`assets/` stores static files imported by TypeScript or CSS, such as images,
icons, and fonts.

```text
assets/
  images/
    art-crea-pro.png
```

## Target Structure

```text
src/
  app/
    App.tsx
    router.tsx
    providers.tsx

  features/
    auth/
      pages/
        LoginPage.tsx
        RegisterPage.tsx
      types.ts
      tests/

    catalog/
      components/
        Product.tsx
        ProductList.tsx
        ProductDetail.tsx
      pages/
        HomePage.tsx
        CategoryPage.tsx
      types.ts
      tests/

    basket/
      components/
      pages/
        BasketPage.tsx
      BasketContext.tsx
      types.ts

    quote-requests/
      components/
        QuoteRequestForm.tsx
      pages/
        QuoteRequestPage.tsx
        QuoteRequestProductsPage.tsx
      types.ts
      tests/

  shared/
    components/
      NavBar.tsx
      SideBar.tsx
      PrivateRoute.tsx
    styles/
      globals.css

  assets/
    images/
      art-crea-pro.png

  index.tsx
```

Folders such as `tests/` and `components/` can be introduced only when a
feature needs them; empty folders do not need to be committed.

## Current File Mapping

| Current file | Target location |
| --- | --- |
| `pages/LoginPage.tsx` | `features/auth/pages/LoginPage.tsx` |
| `pages/Register/RegisterPage.tsx` | `features/auth/pages/RegisterPage.tsx` |
| `pages/Home/HomePage.tsx` | `features/catalog/pages/HomePage.tsx` |
| `pages/CategoryPage.tsx` | `features/catalog/pages/CategoryPage.tsx` |
| `components/Product.tsx` | `features/catalog/components/Product.tsx` |
| `components/ProductList.tsx` | `features/catalog/components/ProductList.tsx` |
| `components/ProductDetail.tsx` | `features/catalog/components/ProductDetail.tsx` |
| `context/BasketContext.tsx` | `features/basket/BasketContext.tsx` |
| `pages/BasketPage.tsx` | `features/basket/pages/BasketPage.tsx` |
| `components/QuoteRequestForm.tsx` | `features/quote-requests/components/QuoteRequestForm.tsx` |
| `pages/QuoteRequest/QuoteRequestPage.tsx` | `features/quote-requests/pages/QuoteRequestPage.tsx` |
| `pages/QuoteRequestProductsPage.tsx` | `features/quote-requests/pages/QuoteRequestProductsPage.tsx` |
| `components/NavBar.tsx` | `shared/components/NavBar.tsx` |
| `components/SideBar.tsx` | `shared/components/SideBar.tsx` |
| `components/PrivateRoute.tsx` | `shared/components/PrivateRoute.tsx` |
| `assets/art-crea-pro.png` | `assets/images/art-crea-pro.png` |

## Migration Approach

Move one feature at a time and update its imports before moving the next one.
The migration is organizational: it must preserve current routes, UI behavior,
and API behavior. Tests and builds should pass after each small move.

Suggested order:

1. Move shared components and global styles.
2. Move `auth` pages and their test.
3. Move the `catalog` feature.
4. Move `basket` and its context.
5. Move `quote-requests`.
6. Move routing/application assembly to `app/` once feature imports are stable.

## Consequences

### Positive

* Related code is easier to discover and maintain.
* Business ownership is visible in the directory structure.
* Features can grow independently with their own components, types, and tests.
* Shared code remains intentionally small and reusable.

### Negative

* Moving files requires updating imports and test paths.
* Small features may initially have more folders than files.
* Team members must decide carefully whether a component is feature-specific or
  truly shared.

## Conclusion

The frontend will evolve toward a feature-based organization. This preserves
the current React application while making product, basket, authentication, and
quote-request code easier to read and change.
