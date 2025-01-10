from typing import List

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Architect, Product, QuoteRequest
from .serializers import (BasketElementsSerializer,
                          ProductDetailsResponseSerializer,
                          ProductsResponseSerializer,
                          QuoteRequestResponseSerializer,
                          QuoteRequestSerializer)


class QuoteRequestType:
    def __init__(self, id: int, name: str, status: str, archi_id: Architect):
        self.id = id
        self.name = name
        self.status = status
        self.archi_id = archi_id


class QuoteRequestResponse:
    dataResponse: list[QuoteRequestType]
    errorResponse: str


class QuoteRequestListApiView(APIView):
    QUOTEREQUESTS: List[QuoteRequestType] = [
        QuoteRequestType(qr.id, qr.name, qr.status, qr.archi_id)
        for qr in QuoteRequest.objects.all()
    ]

    def get(self, request):
        qrRes = QuoteRequestResponse()
        qrRes.dataResponse = self.QUOTEREQUESTS
        qrRes.errorResponse = ""

        serializer = QuoteRequestResponseSerializer(qrRes)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = QuoteRequestSerializer(data=request.data)

        if serializer.is_valid():
            validated_data = serializer.validated_data

            if validated_data is not None:
                validated_data["id"] = len(self.QUOTEREQUESTS) + 1  # type: ignore

                new_quote_request = QuoteRequest(
                    validated_data["id"],  # type: ignore
                    validated_data["name"],  # type: ignore
                    validated_data["status"],  # type: ignore
                )
                self.QUOTEREQUESTS.append(new_quote_request)
                return Response(validated_data, status=status.HTTP_201_CREATED)
            else:
                return Response(
                    {"error": "Validated data is None"},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR,
                )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProductType:
    def __init__(self, id: int, image: str, name: str, category: str):
        self.id = id
        self.image = image
        self.name = name
        self.category = category


class ProductResponse:
    dataResponse: list[ProductType]
    errorResponse: str


class ProductListApiView(APIView):
    Products: List[ProductType] = [
        ProductType(p.id, p.image, p.name, p.category) for p in Product.objects.all()
    ]

    def get(self, request):
        productsRes = ProductResponse()
        productsRes.dataResponse = self.Products
        productsRes.errorResponse = ""

        serializer = ProductsResponseSerializer(productsRes)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ProductDetailsResponse:
    dataResponse: Product
    errorResponse: str


class ProductDetailsApiView(APIView):
    Products: List[Product] = ProductListApiView.Products

    def get(self, request, id):
        product = None
        for p in self.Products:
            if p.id == id:
                product = p
                break

        if product is not None:
            productRes = ProductDetailsResponse()
            productRes.dataResponse = product
            productRes.errorResponse = ""

            serializer = ProductDetailsResponseSerializer(productRes)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(
                f"There is no product for this id {id}",
                status=status.HTTP_404_NOT_FOUND,
            )


class BasketElementsApiView(APIView):

    def post(self, request):
        serializer = BasketElementsSerializer(data=request.data)

        if serializer.is_valid():
            validated_data = serializer.validated_data
            print(validated_data)
            return Response(validated_data, status=status.HTTP_200_OK)

        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
