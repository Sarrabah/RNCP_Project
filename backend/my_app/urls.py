from django.urls import path

from .views import (BasketElementsApiView, ProductApiView,
                    ProductDetailsApiView, QuoteRequestApiView)

urlpatterns = [
    path(
        "quoterequests",
        QuoteRequestApiView.as_view(),
        name="get-all-quote-requests",
    ),
    path(
        "quoterequest",
        QuoteRequestApiView.as_view(),
        name="add-new-quote-request",
    ),
    path(
        "products",
        ProductApiView.as_view(),
        name="get-all-products",
    ),
    path(
        "product/<int:id>",
        ProductDetailsApiView.as_view(),
        name="get-product-details",
    ),
    path(
        "basketelements", BasketElementsApiView.as_view(), name="post-basket-elements"
    ),
]
