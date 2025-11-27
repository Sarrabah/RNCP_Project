from django.test import TestCase

from ..models import Architect
from ..services.userservice import create_new_user


class UserTestCase(TestCase):
    def test_created_user(self):
        user = create_new_user(
            {
                "first_name": "Tata",
                "last_name": "Taa",
                "email": "tata@gmail.com",
                "password": "password123",
                "adress": "123 Main St",
                "region_code": "1",
                "phone_number": "1234567890",
            }
        )
        self.assertEqual(type(user), Architect)
