# Backend Request Flow: API, Application, Domain, and Database

This document explains how one user action moves from the React frontend to
the Django database in the Art Créa Pro backend.

## Overview

When React sends an HTTP request, the backend processes it through distinct
responsibilities:

```text
React request
  -> API (view / serializer)
  -> Application (use case / service)
  -> Domain (models and business rules)
  -> Database
```

For example, React can create a quote request by sending:

```http
POST /api/quoterequest
```

with a JSON request body such as:

```json
{
  "name": "Kitchen renovation",
  "status": "Created"
}
```

## 1. API: Receive and Validate the HTTP Request

The API layer is the boundary between the frontend and the backend. In Django
REST Framework, it contains views, serializers, and URL definitions.

In the current project, `QuoteRequestApiView.post()` receives the request:

```python
class QuoteRequestApiView(LoginRequiredMixin, APIView):
    def post(self, request):
        serializer = QuoteRequestSerializer(data=request.data)

        if serializer.is_valid():
            valid_data = serializer.validated_data
            new_quote_request = create_quote_request(request, valid_data)
```

The API layer is responsible for:

* receiving `POST /api/quoterequest`;
* reading the JSON body through `request.data`;
* validating input with `QuoteRequestSerializer`;
* accessing the authenticated user through `request.user`;
* returning HTTP responses and status codes such as `201 Created` or
  `400 Bad Request`.

The API layer should remain thin. It should not contain the full business
workflow for quote requests.

## 2. Application: Execute the Use Case

The application layer implements actions the system can perform. These actions
are called use cases. In the current project, `create_quote_request` is an
application service for the use case: **an architect creates a quote request**.

```python
def create_quote_request(request, valid_data):
    new_quote_request = QuoteRequest.objects.create(
        name=valid_data["name"],
        status=valid_data["status"],
        archi_id=request.user,
    )
    return new_quote_request
```

The application service coordinates the work:

* receives validated data;
* identifies the architect creating the quote request;
* applies the use case and any relevant business rules;
* saves and returns the resulting business object.

After the DDD reorganization, the service should not receive the complete HTTP
request. The view can pass only the values required by the use case:

```python
def create_quote_request(*, architect, name, status):
    return QuoteRequest.objects.create(
        name=name,
        status=status,
        archi_id=architect,
    )
```

The view then calls it with its HTTP-specific data:

```python
quote_request = create_quote_request(
    architect=request.user,
    name=serializer.validated_data["name"],
    status=serializer.validated_data["status"],
)
```

This separation makes the use case easier to test without constructing an HTTP
request or depending on Django REST Framework.

## 3. Domain: Represent Business Concepts and Rules

The domain layer represents the real business concepts of Art Créa Pro.
`QuoteRequest` is a domain model because it represents a quote request created
by an architect.

```python
class QuoteRequest(models.Model):
    name = models.CharField(max_length=255)
    status = models.CharField(max_length=8)
    archi_id = models.ForeignKey(Architect, on_delete=models.CASCADE)
```

Business rules owned by a quote request belong in this domain. Examples:

* a quote request must have a name;
* only its owner may modify it;
* it cannot be submitted without products;
* its status can only change through allowed states.

The domain must not know that a React application or HTTP request exists.

## 4. Database: Persist the Model

This statement uses Django's ORM to persist the quote request:

```python
QuoteRequest.objects.create(...)
```

Django converts the model operation into an SQL `INSERT`, saves the data in the
MySQL `quote_request` table, and returns the created `QuoteRequest` object.

## Complete Quote-Request Flow

```text
React sends JSON
  -> QuoteRequestApiView receives the HTTP request
  -> QuoteRequestSerializer validates the JSON
  -> create_quote_request executes the use case
  -> QuoteRequest represents the business object
  -> Django ORM saves it to MySQL
  -> QuoteRequestSerializer turns the result into JSON
  -> API returns HTTP 201 Created
  -> React receives the created quote request
```

## Why This Separation Matters

Each layer has one clear job:

| Layer | Knows about | Does not need to know about |
| --- | --- | --- |
| API | HTTP, JSON, serializers, authentication request, status codes | Business workflow details |
| Application | Use cases, domain objects, validated input | HTTP responses, React, JSON format |
| Domain | Business models and rules | HTTP, Django REST Framework, React |
| Database | Persisted data | Frontend behavior and business presentation |

This structure supports the project's pragmatic DDD approach: business rules
remain understandable and testable while the REST API stays a small adapter at
the edge of the system.
