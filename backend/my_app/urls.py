from django.urls import path

from .views import quote_request_list

urlpatterns = [path("quotereqlist", quote_request_list, name="quote-request-list")]
