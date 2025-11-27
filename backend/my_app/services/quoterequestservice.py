from ..models import QuoteRequest, QuoteRequestProduct


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
