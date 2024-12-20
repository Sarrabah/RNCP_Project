from django.urls import path

from .views import ProductListApiView, QuoteRequestListApiView

urlpatterns = [
    path(
        "quoterequests",
        QuoteRequestListApiView.as_view(),
        name="get-all-quote-requests",
    ),
    path(
        "quoterequest",
        QuoteRequestListApiView.as_view(),
        name="add-new-quote-request",
    ),
    path(
        "products",
        ProductListApiView.as_view(),
        name="all-products",
    ),
]
