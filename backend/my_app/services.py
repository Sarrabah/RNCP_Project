from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password

from .models import Architect, Product, QuoteRequest, QuoteRequestProduct


def get_quote_request(archiId):
    quoteRequest = QuoteRequest.objects.all().filter(archi_id=archiId)
    return quoteRequest


def create_quote_request(request, valid_data):
    new_quote_request = QuoteRequest.objects.create(
        name=valid_data["name"],
        status=valid_data["status"],
        archi_id=request.user,
    )
    return new_quote_request


def get_products():
    products = Product.objects.all()
    return products


def get_quote_request_products(id):
    quoteRequestProducts = QuoteRequestProduct.objects.all().filter(
        quote_request_object=id
    )
    productsDetails = []
    for ele in quoteRequestProducts:
        productName = ele.product_object.name
        productImage = ele.product_object.image
        productsDetails.append(
            {
                "product_name": productName,
                "product_image": productImage,
                "quantity": ele.quantity,
            }
        )
    QuoteRequestProducts = {"id": id, "product_id_quantity": productsDetails}
    return QuoteRequestProducts


def get_product_details():
    productDetails = Product.objects.get(pk=id)
    return productDetails


def create_basket_elements(valid_data):
    for qr_id in valid_data["quoteRequestIdList"]:

        for p in valid_data["productInformations"]:
            instanceQuoteRequest = QuoteRequest.objects.get(pk=qr_id)
            instanceProduct = Product.objects.get(pk=p["id"])
            QuoteRequestProduct.objects.create(
                quote_request_object=instanceQuoteRequest,
                product_object=instanceProduct,
                quantity=p["quantity"],
            )
    return valid_data


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
