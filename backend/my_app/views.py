from django.contrib.auth import login, logout
from django.contrib.auth.mixins import LoginRequiredMixin
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Product, QuoteRequestProduct
from .serializers import (
    ArchitectSerializer,
    BasketElementsSerializer,
    ProductSerializer,
    QuoteRequestProductsSerializer,
    QuoteRequestSerializer,
)
from .services import (
    create_basket_elements,
    create_login,
    create_new_user,
    create_quote_request,
    get_product_details,
    get_products,
    get_quote_request,
    get_quote_request_products,
)


class QuoteRequestApiView(LoginRequiredMixin, APIView):

    def get(self, request):
        try:
            archiId = request.user.id
            qrRes = get_quote_request(archiId)
            serializer = QuoteRequestSerializer(qrRes, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {"error": f"An unexpected error occurred: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    def post(self, request):
        serializer = QuoteRequestSerializer(data=request.data)

        if serializer.is_valid():
            try:
                valid_data = serializer.validated_data

                if not isinstance(valid_data, dict):
                    return Response(
                        {"error": "Data is not in the expected format!"},
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    )
                new_quote_request = create_quote_request(request, valid_data)
                created_data = QuoteRequestSerializer(new_quote_request).data
                return Response(created_data, status=status.HTTP_201_CREATED)

            except Exception as e:
                return Response(
                    {"error": f"An unexpected error occurred: {str(e)}"},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR,
                )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProductApiView(LoginRequiredMixin, APIView):
    def get(self, request):
        try:
            productsRes = get_products()
            serializer = ProductSerializer(productsRes, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {"error": f"An unexpected error occurred: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class QuoteRequestProductsApiView(LoginRequiredMixin, APIView):
    def get(self, request, id):
        try:
            finalResponse = get_quote_request_products(id)
            serializer = QuoteRequestProductsSerializer(finalResponse)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except QuoteRequestProduct.DoesNotExist:
            return Response(
                {"error": f"Quote request with id {id} not found."},
                status=status.HTTP_404_NOT_FOUND,
            )
        except Exception as e:
            return Response(
                {"error": f"An internal server error occurred: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class ProductDetailsApiView(LoginRequiredMixin, APIView):

    def get(self, request, id):
        try:
            productRes = get_product_details()
            serializer = ProductSerializer(productRes)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Product.DoesNotExist:
            return Response(
                {"error": f"Product with id {id} not found."},
                status=status.HTTP_404_NOT_FOUND,
            )
        except Exception as e:
            return Response(
                {"error": f"An internal server error occurred: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class BasketElementsApiView(LoginRequiredMixin, APIView):

    def post(self, request):
        serializer = BasketElementsSerializer(data=request.data)

        if serializer.is_valid():
            try:
                valid_data = serializer.validated_data

                if not isinstance(valid_data, dict):
                    return Response(
                        {"error": "Data is not in the expected format!"},
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    )
                valid_data = create_basket_elements(valid_data)
                return Response(valid_data, status=status.HTTP_200_OK)

            except Exception as e:
                return Response(
                    {"error": f"An unexpected error occurred: {str(e)}"},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR,
                )
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ArchitectRegisterApiView(APIView):
    def post(self, request):
        serializer = ArchitectSerializer(data=request.data)
        if serializer.is_valid():
            try:
                valid_data = serializer.validated_data
                if not isinstance(valid_data, dict):
                    return Response(
                        {"error": "Data is not in the expected format!"},
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    )
                new_user = create_new_user(valid_data)
                created_data = ArchitectSerializer(new_user).data
                return Response(created_data, status=status.HTTP_201_CREATED)
            except Exception as e:
                print("exception : ", e)
                return Response(
                    {"error": f"An unexpected error occurred: {str(e)}"},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR,
                )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginApiView(APIView):
    def post(self, request):
        try:
            user = create_login(request)
            if user is not None:
                login(request, user)
                return Response(
                    {"message": "Login successfully"}, status=status.HTTP_200_OK
                )
            else:
                return Response(
                    {"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST
                )
        except Exception as e:
            return Response(
                {"error": f"An unexpected error occurred: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class LogoutApiView(APIView):
    def post(self, request):
        try:
            logout(request)
            return Response(
                {"message": "Logged out successfully !"}, status=status.HTTP_200_OK
            )
        except Exception as e:
            return Response(
                {"error": f"An unexpected error occurred: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
