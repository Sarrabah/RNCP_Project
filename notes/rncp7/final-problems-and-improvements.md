# Art Créa Pro — Consolidated Problems & Improvements

This is the final, consolidated view of every problem and improvement
identified for Art Créa Pro so far. It merges `project-summary.md`,
`problems-and-improvements.md`, and `detected-problems-review.md`, removes
one claim from the earlier notes that turned out to be false on
re-verification, adds items found during this review, and cross-references
everything against the GitHub issues already filed (`Sarrabah/RNCP_Project`
#5–#15) so it's clear what's tracked and what isn't yet.

Each item lists: **Severity**, **Status** (a tracked issue number, or "Not
yet tracked"), the concrete evidence in code, and the recommended fix.

---

## 1. Security & access control

### 1.1 Quote request ownership is not verified
**Severity: Critical** · **Status: Not yet tracked**

`QuoteRequestProductsApiView.get` (`backend/my_app/views.py:80`) fetches a
quote request's products by ID alone, with no check that the request belongs
to `request.user`. `create_basket_elements` (`backend/my_app/services.py:50-61`,
called from `BasketElementsApiView.post`) accepts any `quoteRequestIdList`
from the client and never verifies ownership either. Any logged-in architect
can read or attach products to another architect's quote request just by
guessing/incrementing an ID.

**Fix:** filter every quote-request lookup by both its ID and `request.user`
before returning or modifying it; return `403`/`404` otherwise.

### 1.2 `DEBUG = True` is hardcoded
**Severity: Critical** · **Status: Not yet tracked**

`backend/backend/settings.py:29` hardcodes `DEBUG = True`, unlike
`SECRET_KEY`/DB credentials which already come from `os.getenv` (`settings.py:26,91-92`).
It will ship `True` in production unless someone remembers to hand-edit the
file before deploying.

**Fix:** read `DEBUG` from an environment variable, defaulting to `False`.

### 1.3 Production MySQL access uses the root user
**Severity: Critical** · **Status: Not yet tracked**

`docker-compose.yml` sets `DB_USER=root` for the backend service and creates
the database with `MYSQL_ROOT_PASSWORD`. There is no dedicated,
least-privilege application DB user.

**Fix:** create a MySQL user scoped to only the permissions this app needs,
and use it instead of root, at least in any non-local environment.

### 1.4 HTTPS and session/cookie protection not configured
**Severity: Critical** · **Status: Not yet tracked**

Login uses Django sessions, but there's no production HTTPS/reverse-proxy
setup or secure cookie configuration (`SESSION_COOKIE_SECURE`,
`CSRF_COOKIE_SECURE`, etc.) evident in settings.

**Fix:** serve over HTTPS with a valid TLS cert (e.g. via Nginx on
Scaleway), and enable Django's secure-cookie/HTTPS settings for production.

### 1.5 ~~Secrets committed to source control~~ — not actually true
**Status: Resolved / false alarm, removed from the list**

The original notes (`problems-and-improvements.md:227-239`) flagged this as
critical. Re-checked directly in code: `SECRET_KEY` and all DB credentials
are already read via `os.getenv(...)` (`settings.py:26,91-92`), and `.env`
is excluded via `.gitignore:126`. Nothing is hardcoded/committed. Kept here
only so this doesn't get re-flagged later without checking first.

### 1.6 `PrivateRoute` gates pages on a client-only flag
**Severity: Minor** · **Status: Not yet tracked**

`PrivateRoute` (`frontend/src/components/PrivateRoute.tsx` or equivalent)
checks `localStorage.getItem("isAuthentificated") === "true"` to decide
whether to render a protected page. This isn't a real security boundary
(the backend's `LoginRequiredMixin`/session auth is what actually protects
data), but it can drift out of sync with the real session — e.g. if the
Django session expires server-side, the localStorage flag can still say
`"true"`, so the UI renders a page whose API calls then fail with `401`
instead of redirecting to login.

**Fix:** treat this as a UX nicety, not a security control; consider
deriving the authenticated state from an actual API check/response instead
of a manually-maintained flag.

---

## 2. API robustness

### 2.1 Quantities aren't validated as positive
**Severity: Medium** · **Status: Not yet tracked**

`ProductInformationsSerializer.quantity` (`backend/my_app/serializers.py:19-21`)
is a plain `IntegerField` with no minimum-value constraint, so `0` or
negative quantities can be submitted and stored.

**Fix:** add `min_value=1` (or a custom validator) to reject non-positive
quantities with a clear `400`, both for new basket submissions and for the
increase/decrease flow tracked in #10.

### 2.2 Predictable errors return generic 500s
**Severity: Medium** · **Status: Not yet tracked**

Every view checked (`QuoteRequestApiView`, `ProductDetailsApiView`,
`BasketElementsApiView`, `QuoteRequestProductsApiView`,
`ArchitectRegisterApiView`, `LoginApiView`, `LogoutApiView`) catches a bare
`Exception` and always returns `500`, even for predictable client errors
(duplicate product, unknown ID, invalid data). This is the same underlying
pattern as the bug fixed by #10, but present across the whole API.

**Fix:** catch specific exceptions (`DoesNotExist`, `IntegrityError`, etc.)
and map them to `400`/`403`/`404` as appropriate; reserve bare `500` for
truly unexpected failures.

### 2.3 No pagination or filtering on list endpoints
**Severity: Minor** · **Status: Not yet tracked**

`ProductApiView.get` and `QuoteRequestApiView.get` return
`Product.objects.all()` / all of an architect's quote requests, unbounded.
Fine at current scale, won't scale with catalogue/user growth.

**Fix:** add pagination and category/search filters when the dataset grows.

### 2.4 Quote-request status has no defined lifecycle
**Severity: Medium** · **Status: Tracked — #7**

`QuoteRequest.status` is a free-text `CharField(max_length=8)` with no
`choices` and no transition rules. Already tracked in issue #7 ("Manage
quote request status transitions").

### 2.5 Duplicate email registration error clarity
**Severity: Medium** · **Status: Tracked — #8**

### 2.6 Re-adding an already-added product fails instead of updating quantity
**Severity: High (real bug)** · **Status: Tracked — #10**

---

## 3. Dependencies & runtime

All items below come from an `npm audit --omit=dev` + manual review
(originally recorded in `problems-and-improvements.md`, section 1); none are
yet turned into GitHub issues even though two already have ADRs deciding the
approach.

| Item | Severity | Status | Note |
| --- | --- | --- | --- |
| 67 npm audit findings (3 critical, 35 high) in the CRA/`react-scripts` chain | Critical | Not yet tracked | Migration path decided in `notes/adr/001-migrate-cra-to-vite.md` |
| Django pinned to `5.1`, no longer receives security fixes | Critical | Not yet tracked | Upgrade to latest `5.2.x` LTS |
| `react-router-dom` high-severity findings | High | Not yet tracked | Needs a dedicated, tested major-version migration |
| Docker frontend build uses `node:18` (EOL March 2025) | High | Not yet tracked | Move to a current Node LTS image |
| No recurring dependency audit in CI | Medium | Not yet tracked | Add `npm audit` / `pip-audit` to CI |
| Unused `axios` / `@types/axios` in `frontend/package.json` | Minor | Not yet tracked | Not imported anywhere in current source — remove or start using it |

**Recommended upgrade order** (from the original notes, still valid):
Django 5.2.x → CRA-to-Vite migration + Node LTS image → React Router
migration → recurring CI dependency checks.

---

## 4. Deployment & operations

### 4.1 Backend tests exist but never run automatically
**Severity: Medium-High** · **Status: Not yet tracked (new finding)**

`backend/my_app/unittests/` and `backend/my_app/integrationtests/` contain
real tests (`test_login.py`, `test_user.py`, `test_user_creation.py`,
`test_get_qr.py`), but:
- `Makefile`'s `test` target only runs `cd frontend && npm test`
  (`Makefile:45-47`) — there is no backend-test target at all.
- `.github/workflows/*.yml` only calls `make test`, i.e. only frontend
  tests run in CI.

So the backend test suite silently never executes anywhere except by
someone manually running it locally. This is worse than "no tests" in one
way: it looks covered (tests exist) but isn't actually protecting anything.

**Fix:** add a `test_backend` Makefile target (`python manage.py test`) and
call it from CI alongside the frontend tests.

### 4.2 Deployment doc referenced a fake container name
**Severity: Medium** · **Status: Tracked — #15 (fixed)**

### 4.3 Migrations require a manual step on every deploy
**Severity: Medium** · **Status: Tracked — #14 (fixed)**

### 4.4 No fully documented/automated deploy flow
**Severity: Medium** · **Status: Not yet tracked**

Beyond migrations (#14) and the container-name doc fix (#15), there's still
no single documented flow that runs the frontend build, `collectstatic`,
migrations, and service restart together for a production deploy.

### 4.5 No database backup/restore strategy
**Severity: Medium** · **Status: Not yet tracked**

The MySQL data lives in a Docker volume (`db_data`), which survives
container restarts but is not a backup — a lost/corrupted volume means lost
data.

**Fix:** schedule off-server backups and periodically test restoring them.

### 4.6 `createsuperuser` step undocumented
**Severity: Minor** · **Status: Drafted, not yet filed**

An issue explaining what `createsuperuser` does, why it's needed (tied to
#12), and where the account is actually stored (the `db` volume) was
drafted in conversation but never filed — still open to create if wanted.

---

## 5. User experience

| Item | Severity | Status |
| --- | --- | --- |
| Limited feedback for in-flight/failed actions (loading states, disabled submit buttons while processing) | Medium | Not yet tracked |
| Forms lack client-side validation beyond required fields (email/phone format, preserved input on failed submit) | Medium | Not yet tracked |
| Quote-request review workflow: no clear status display, no quantity editing/product removal before submission, no empty states | Minor | Not yet tracked |
| Responsive layout and accessibility (mobile/tablet, keyboard nav, contrast, alt text) not systematically verified | Medium | Not yet tracked |
| Frontend tests cover registration (`Register.test.tsx`) but not basket, quote-request creation, or submission flows | Minor | Not yet tracked |

---

## 6. New features already in progress

| Item | Status |
| --- | --- |
| User profile page for architects | Tracked — #9 |
| Product images stored instead of hotlinked (phased: local storage now, Scaleway Object Storage post-deployment) | Tracked — #11 |
| Django admin wired up for core models | Tracked — #12 |
| Basket `localStorage` re-read on every render | Tracked — #13 |

---

## Suggested priority order

1. **Security-critical, not yet tracked:** ownership checks (1.1), `DEBUG`
   (1.2), root MySQL user (1.3), HTTPS/cookies (1.4).
2. **Runtime security:** Django 5.2.x upgrade, then the CRA→Vite migration
   already decided in ADR 001.
3. **Make the existing backend tests actually run** (4.1) — cheap, high
   leverage, currently a false sense of coverage.
4. **API correctness:** quantity validation (2.1), consistent error codes
   (2.2), finish the already-tracked #7/#8/#10.
5. Everything already tracked in #9, #11, #12, #13, #14 (done), #15 (done).
6. UX, pagination, backups, and remaining dependency/CI hardening as the
   app matures.
