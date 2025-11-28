from django.test import TestCase

from ..services.userservice import create_login
from rest_framework.test import APIRequestFactory
from rest_framework.views import APIView


class LoginTestCase(TestCase):

    def test_not_valid_email(self):
        factory = APIRequestFactory()

        request = factory.post("/login", {
            "email": "invalidemail",
            "password": "password123",
        }, format="json")

        drf_request = APIView().initialize_request(request)

        self.assertRaises(ValueError, create_login, drf_request)
