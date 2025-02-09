from itertools import product

from rest_framework import serializers

from .models import Architect, Product, QuoteRequest


class QuoteRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuoteRequest
        fields = ["id", "name", "status"]


class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = ["id", "image", "name", "category"]


class ProductInformationsSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    quantity = serializers.IntegerField()


class BasketElementsSerializer(serializers.Serializer):
    quoteRequestIdList = serializers.ListField()
    productInformations = ProductInformationsSerializer(many=True)


class ProductNameImageQuantitySerializer(serializers.Serializer):
    product_name = serializers.CharField()
    product_image = serializers.CharField()
    quantity = serializers.IntegerField()


class QuoteRequestProductsSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    product_id_quantity = ProductNameImageQuantitySerializer(many=True)


class ArchitectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Architect
        fields = [
            "id",
            "first_name",
            "last_name",
            "email",
            "password",
            "adress",
            "region_code",
            "phone_number",
        ]
        extra_kwargs = {"password": {"write_only": True}}
