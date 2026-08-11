# ADR: Migrate from Create React App to Vite

**Status:** Accepted  
**Date:** 2026-07-31

## Context

The project currently uses **Create React App (CRA)** as its React development and build tool.

CRA is no longer the recommended tooling for modern React applications. Since the project is actively maintained, we want to adopt a modern and maintainable solution while avoiding unnecessary changes to the existing application architecture.

The two main alternatives considered are **Vite** and **Next.js**.

## CRA vs Vite vs Next.js

|                        | CRA             | Vite                | Next.js               |
| ---------------------- | --------------- | ------------------- | --------------------- |
| **Type**               | React tooling   | Frontend build tool | React framework       |
| **Difficulty**         | Easy            | Easy                | More complex          |
| **Dev speed**          | ⭐⭐              | ⭐⭐⭐⭐⭐               | ⭐⭐⭐⭐                  |
| **SPA**                | ✅               | ✅                   | ✅                     |
| **SSR**                | ❌               | ❌*                  | ✅                     |
| **SSG**                | ❌               | ❌*                  | ✅                     |
| **Routing**            | React Router    | React Router        | Built-in              |
| **Backend/API**        | ❌               | ❌                   | ✅                     |
| **Best for**           | Legacy projects | React SPAs          | Full web applications |
| **Migration from CRA** | —               | Easy                | More involved         |

> **Note:** Vite can support SSR/SSG through additional configuration or frameworks, but these features are not provided as an integrated framework experience like Next.js.

## Decision

We will migrate from **Create React App (CRA) to Vite**.

Vite provides the best balance between modernization, performance, and migration effort for this project.

The existing React and TypeScript application architecture can remain largely unchanged:

```text
React + TypeScript
        ↓
       Vite
        ↓
     REST API
        ↓
  Existing Backend
```

We do not need the additional framework features provided by Next.js, such as integrated SSR, SSG, or backend/API functionality.

## Project-specific rationale

This project is an authenticated business application for architects to browse products and prepare quote requests. Its main pages are used after login and do not currently have an SEO requirement that would justify server-side rendering.

The Django application already provides the REST API, session-based authentication, MySQL persistence, and production delivery of the compiled frontend. The React application uses React Router for client-side navigation and calls Django through relative URLs such as `/api/products` and `/api/quoterequests`.

Vite preserves this separation of responsibilities:

```text
Browser
  └── React SPA (Vite build + React Router)
        └── /api/* requests
              └── Django REST API + session authentication + MySQL
```

In development, Vite will proxy `/api/*` requests to Django at `http://localhost:8000`. In production, Django will continue to serve both the compiled SPA and its API from the same origin. This avoids new cross-origin and session-cookie complexity.

## Reasons for choosing Vite

* Faster development server and Hot Module Replacement (HMR)
* Faster builds
* Modern and lightweight frontend tooling
* Easy migration from CRA
* Minimal impact on the existing React codebase
* Keeps the current SPA architecture
* No need to introduce a new full-stack framework
* Better long-term maintainability than continuing with CRA

## Consequences

### Positive

* Improved development experience
* Faster startup and build times
* Modern tooling
* Existing React/TypeScript components can largely be preserved
* Minimal architectural changes

### Negative

Some configuration changes will be required during migration, including:

* `REACT_APP_*` → `VITE_*` environment variables
* `process.env` → `import.meta.env`
* CRA scripts → Vite scripts
* Entry point configuration
* The existing `proxy` setting in `package.json` → a proxy in `vite.config.ts`
* CRA's `build/` output → Vite's `dist/` output
* Update the Django Docker build to copy `/app/frontend/dist` into Django's `staticfiles` directory instead of `/app/frontend/build`
* Update the Docker frontend build image from Node.js 18 to a Vite-compatible Node.js version; the CI workflow already uses Node.js 20
* Review the Jest-based test setup and CRA-specific ESLint configuration after migration

## Migration validation

The migration is complete only when the following continue to work:

* The frontend starts locally through Vite and can reach the Django API through the proxy.
* Login, logout, and authenticated quote-request endpoints preserve the existing Django session.
* React Router routes still render correctly when accessed directly in production.
* The Docker image builds successfully and Django serves Vite's `dist/` files.
* The existing frontend test and CI workflow pass, or their replacements are documented.

## Future Considerations

Next.js can be reconsidered if the project later requires:

* Server-side rendering (SSR)
* Static site generation (SSG)
* Advanced SEO requirements
* Server Components
* Integrated backend/API functionality

## Conclusion

**CRA → Vite** is the preferred migration because it modernizes the project's frontend tooling while keeping the existing React SPA architecture and minimizing migration effort.
