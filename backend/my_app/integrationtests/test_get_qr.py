from django.test import TestCase
from rest_framework.test import APIRequestFactory, force_authenticate


from ..models import Architect

from ..views import QuoteRequestApiView


class SimpleTest(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.user = Architect.objects.create_user(
                first_name="Tata",
                last_name="Taa",
                email="tata@gmail.com",
                username="tata@gmail.com",
                password="password123",
                adress="123 Main St",
                region_code="1",
                phone_number="34567890"
        )

    def test_get_all_quote_requests(self):
        request = self.factory.get("/quoterequests")

        force_authenticate(request, user=self.user)

        view = QuoteRequestApiView.as_view()
        response = view(request)
        self.assertEqual(response.status_code, 200)

    def test_unauthenticated_user(self):
        request = self.factory.get("/quoterequests")

        view = QuoteRequestApiView.as_view()
        response = view(request)

        self.assertEqual(response.status_code, 403)


"""     def test_non_existing_user_id(self):
        request = self.factory.get("/quoterequests")

        request.user = self.user
        request.user.id = 9999

        view = QuoteRequestApiView.as_view()
        response = view(request)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, []) """
