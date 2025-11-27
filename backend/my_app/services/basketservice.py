from ..models import Product, QuoteRequest, QuoteRequestProduct


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
