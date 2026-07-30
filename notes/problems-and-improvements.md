# Problems and Improvements

This note records practical improvements for Art Créa Pro after the current MVP. The application already supports the main architect workflow; these items focus on making it safer, clearer, and more reliable as it grows.

## 1. API robustness

API robustness means that the backend behaves predictably with valid, invalid, incomplete, or malicious requests.

### Permission checks

> **Severity: Critical**

An authenticated architect should only read or change their own quote requests.

Currently, `GET /quoterequestproducts/<id>` retrieves the quote request's products by its ID, but it does not verify that the request belongs to the logged-in architect. Likewise, `/basketelements` accepts quote-request IDs from the client without first checking their ownership.

**Improvement:** before returning or modifying a quote request, retrieve it using both its ID and the current user. If it does not belong to the user, return `403 Forbidden` or `404 Not Found` according to the API convention chosen for the project.

### Input validation

> **Severity: Medium**

The backend should validate more than the presence and type of fields.

**Improvements:**

- Require product quantities to be greater than zero.
- Confirm that every submitted product and quote-request ID exists.
- Confirm that every submitted quote request belongs to the logged-in architect.
- Limit quote-request statuses to a known set of values.
- Handle an already-added product in a quote request deliberately—for example, update its quantity or return a clear validation error.

### Clear API errors

> **Severity: Medium**

The API should distinguish between client errors and unexpected server errors.

| Situation | Appropriate response |
| --- | --- |
| Invalid or incomplete form data | `400 Bad Request` |
| Not logged in | `401 Unauthorized` or the project’s login redirect behaviour |
| Logged in but not allowed to access the resource | `403 Forbidden` |
| Product or quote request does not exist | `404 Not Found` |
| Unexpected application failure | `500 Internal Server Error` |

Avoid returning a generic `500` response for predictable cases such as duplicate products, an unknown ID, or invalid quantities.

### Scaling list endpoints

> **Severity: Minor**

`/products` and `/quoterequests` currently return all matching records. This is suitable for a small dataset but may become slow and difficult to use as the catalogue and user data grow.

**Improvements:** add category/search filters, sorting, and pagination (for example, a limited number of products per page).

### Automated API tests

> **Severity: Medium**

Backend tests protect existing features when the code changes.

**Priorities for tests:** registration and login, access control for quote requests, product retrieval, invalid quantities, duplicate products, and successful basket submission.

## 2. Security and deployment

Security and deployment concern running the application safely on Scaleway, rather than only on a local development machine.

### Production Django configuration

> **Severity: Critical**

The current Django settings include development values such as `DEBUG = True` and localhost-only allowed hosts.

**Improvements:**

- Set `DEBUG=False` in production. Detailed debug pages can expose internal project information.
- Add the production domain name and/or Scaleway server address to `ALLOWED_HOSTS`.
- Keep local and production settings separate through environment variables.

### Secrets and database access

> **Severity: Critical**

The Django secret key and database credentials must not be committed to source control or shared publicly. The application should also avoid connecting to MySQL as the root user in production.

**Improvements:**

- Store `DJANGO_SECRET_KEY`, database name, username, password, host, and port in Scaleway environment variables or its secret-management facilities.
- Use a long, randomly generated secret key.
- Create a dedicated MySQL application user with only the permissions the app needs.
- Keep local values in a `.env` file excluded by `.gitignore`.
- Add a committed `.env.example` containing only variable names and safe example values.

### HTTPS and session protection

> **Severity: Critical**

Users authenticate with Django sessions. In production, login and session cookies should only travel over HTTPS.

**Improvements:**

- Serve the site over HTTPS with a valid TLS certificate.
- Use a domain name and a reverse proxy such as Nginx when appropriate for the Scaleway setup.
- Enable Django’s production cookie and HTTPS settings, including secure session and CSRF cookies.

### Static files and frontend build

> **Severity: Medium**

The React application must be built before deployment, and Django static files must be collected and served correctly.

**Improvement:** document and automate a deployment flow that runs the frontend build, runs `collectstatic`, applies migrations, and starts/restarts the production services. Serve static assets efficiently through a reverse proxy or dedicated static hosting where appropriate.

### Data persistence and backups

> **Severity: Medium**

A Docker volume preserves MySQL data while the server remains available, but it is not a complete backup strategy.

**Improvements:** schedule database backups, retain them in a separate secure location, and periodically test the restoration process.

## 3. User experience

User experience (UX) is about making the architect’s workflow easy to understand, efficient to complete, and usable on different devices.

### Feedback for user actions

> **Severity: Medium**

Users need immediate confirmation when an action succeeds and useful guidance when it fails.

**Improvements:**

- Show success messages after registration, login, quote-request creation, and basket submission.
- Show understandable error messages when a request fails or a form has invalid data.
- Disable submit buttons while a request is processing to prevent duplicate submissions.
- Display loading indicators while products, quote requests, or details are being fetched.

### Forms and validation

> **Severity: Medium**

Forms should prevent common errors before data reaches the API.

**Improvements:** clearly mark required fields, give field-level validation messages, validate email and phone formats, require positive quantities, and preserve user input if a submission fails.

### Quote-request workflow (optional new feat)

> **Severity: Minor**

The main workflow should make its current state obvious.

**Improvements:** display quote-request status clearly; let architects edit quantities, remove products, and review their request before submission; confirm important actions; and show an empty state when a quote request or basket has no products.

### Responsive and accessible interface

> **Severity: Medium**

Architects may use the application on different screen sizes and with different accessibility needs.

**Improvements:** test layouts on mobile and tablet sizes, ensure keyboard navigation works, use labels for form inputs, maintain sufficient colour contrast, provide meaningful alternative text for images, and keep focus visible.

### Frontend tests

> **Severity: Minor**

Add tests for the important user journeys: registration, login, browsing products, adding to the basket, creating a quote request, and submitting basket items. These tests will make UI changes safer.

## Suggested order of work for all detected problems

1. Add ownership checks and validation to the quote-request endpoints.
2. Add backend tests for those rules.
3. Move production settings and secrets into environment variables, then secure the Scaleway deployment with HTTPS and backups.
4. Improve feedback, forms, and the quote-request review/editing experience.
5. Add responsive/accessibility checks and frontend user-flow tests.

## Problem severity classification

The following priorities apply to a publicly accessible Scaleway deployment. A critical item should be addressed before or as part of a production release; medium items should follow soon after; minor items improve comfort, maintainability, or scale.

### Critical problems

| Problem | Why it is critical | Improvement |
| --- | --- | --- |
| Quote-request ownership is not verified for every ID-based read or write. | A logged-in architect could potentially view or change another architect's quote request by supplying its ID. | Filter quote requests by both their ID and `request.user` before returning or modifying them. |
| Production runs with `DEBUG=True`. | Django can expose detailed internal error information to visitors. | Set `DEBUG=False` in production. |
| Production secrets or database credentials are committed, publicly exposed, or reused from development. | This can allow unauthorised access to sessions, the application, or its database. | Put unique production secrets in Scaleway environment variables, remove exposed secrets, and use a non-root MySQL application user. |
| Authentication traffic is served without HTTPS. | Login credentials and session cookies can be intercepted on an untrusted network. | Use HTTPS, secure cookie settings, and an appropriate reverse-proxy/TLS setup. |

### Medium problems

| Problem | Why it matters | Improvement |
| --- | --- | --- |
| Incomplete validation of quantities, IDs, statuses, and duplicate products. | Invalid data can be saved or produce unclear failures. | Validate business rules and return useful `400` errors. |
| Predictable errors can become generic `500` responses. | Users receive unhelpful messages and monitoring cannot distinguish user mistakes from bugs. | Return consistent `400`, `403`, and `404` responses where appropriate. |
| No automated backend tests for access rules and main API flows. | Future changes can silently break security and core functionality. | Add tests for authentication, ownership, invalid input, and successful quote/basket flows. |
| No documented/repeatable production build, static-file, migration, and restart process. | Deployments can be inconsistent or fail unexpectedly. | Document and automate the deployment steps. |
| No tested database backup and restoration process. | Data could be permanently lost after server, database, or deployment failures. | Schedule backups off the server and test restoring them. |
| Limited loading, success, and error feedback in the interface. | Users may repeat actions or not understand whether an operation succeeded. | Add loading states, disabled submit buttons, and clear success/error messages. |
| Forms do not provide all useful client-side validation and guidance. | Users discover errors late and may lose time or data. | Add required indicators, field-level errors, format checks, and preserved input. |
| Responsive and accessibility behaviour has not been systematically verified. | Parts of the application may be difficult to use on mobile devices or with a keyboard/screen reader. | Test key screens and improve labels, contrast, focus, keyboard navigation, and image text alternatives. |

### Minor problems

| Problem | Why it matters | Improvement |
| --- | --- | --- |
| Product and quote-request lists have no filtering, sorting, or pagination. | The current small dataset works, but lists will become harder to use and slower as data grows. | Add these controls when the catalogue or user base requires them. |
| The quote-request page could offer clearer review tools. | The workflow is usable, but users would have more confidence before submitting. | Add clear status display, empty states, action confirmation, quantity editing, and product removal. |
| Frontend user-flow tests are limited. | UI regressions are easier to introduce during visual changes. | Add tests for login, product browsing, basket management, and quote submission. |
