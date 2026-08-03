from ..models import Product


def get_products():
    products = Product.objects.all()
    return products


def get_product_details(id):
    productDetails = Product.objects.get(pk=id)
    return productDetails
