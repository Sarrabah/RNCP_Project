from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password

from ..models import Architect


def create_new_user(valid_data):
    new_user = Architect.objects.create(
        first_name=valid_data["first_name"],
        last_name=valid_data["last_name"],
        email=valid_data["email"],
        password=make_password(valid_data["password"]),
        adress=valid_data["adress"],
        region_code=valid_data["region_code"],
        phone_number=valid_data["phone_number"],
    )
    return new_user


def create_login(request):
    email = request.data["email"]
    password = request.data["password"]
    user = authenticate(request, username=email, password=password)
    return user
