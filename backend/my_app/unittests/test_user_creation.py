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

    def test_if_the_password_is_void(self):
        self.assertRaises(
            ValueError,
            create_new_user,
            {
                "first_name": "Tata",
                "last_name": "Taa",
                "email": "tata@gmail.com",
                "password": "",
                "adress": "123 Main St",
                "region_code": "1",
                "phone_number": "1234567890",
            },
        )

    def test_if_the_password_is_hashed(self):
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
        self.assertNotEqual(user.password, "password123")

    def test_if_the_hashed_password_is_not_empty(self):
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
        self.assertNotEqual(len(user.password), 0)
