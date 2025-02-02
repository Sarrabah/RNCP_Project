from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.hashers import make_password
from django.contrib.auth.mixins import LoginRequiredMixin
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Architect, Product, QuoteRequest, QuoteRequestProduct
from .serializers import (ArchitectSerializer, BasketElementsSerializer,
                          ProductSerializer, QuoteRequestSerializer)


class QuoteRequestApiView(LoginRequiredMixin, APIView):

    def get(self, request):
        try:
            archiId = Architect.objects.get(email=request.user).id
            qrRes = QuoteRequest.objects.all().filter(archi_id=archiId)
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
                validated_data = serializer.validated_data

                if not isinstance(validated_data, dict):
                    return Response(
                        {"error": "Data is not in the expected format!"},
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    )

                new_quote_request = QuoteRequest.objects.create(
                    name=validated_data["name"],
                    status=validated_data["status"],
                    archi_id=validated_data["archi_id"],
                )

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
            productsRes = Product.objects.all()
            serializer = ProductSerializer(productsRes, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {"error": f"An unexpected error occurred: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class ProductDetailsApiView(LoginRequiredMixin, APIView):

    def get(self, request, id):
        try:
            productRes = Product.objects.get(pk=id)
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
                validated_data = serializer.validated_data

                if not isinstance(validated_data, dict):
                    return Response(
                        {"error": "Data is not in the expected format!"},
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    )

                for qr_id in validated_data["quoteRequestIdList"]:

                    for p in validated_data["productInformations"]:
                        instanceQuoteRequest = QuoteRequest.objects.get(pk=qr_id)
                        instanceProduct = Product.objects.get(pk=p["id"])
                        QuoteRequestProduct.objects.create(
                            quote_request_id=instanceQuoteRequest,
                            product_id=instanceProduct,
                            quantity=p["quantity"],
                        )

                return Response(validated_data, status=status.HTTP_200_OK)

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
                validated_data = serializer.validated_data
                if not isinstance(validated_data, dict):
                    return Response(
                        {"error": "Data is not in the expected format!"},
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    )
                new_user = Architect.objects.create(
                    first_name=validated_data["first_name"],
                    last_name=validated_data["last_name"],
                    email=validated_data["email"],
                    password=make_password(validated_data["password"]),
                    adress=validated_data["adress"],
                    region_code=validated_data["region_code"],
                    phone_number=validated_data["phone_number"],
                )
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
            email = request.data["email"]
            password = request.data["password"]
            # authentificate the user with email and password
            user = authenticate(request, username=email, password=password)

            if user is not None:
                # Login the user and create a session
                login(request, user)
                return Response(
                    {"message": "Login successful"}, status=status.HTTP_200_OK
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
