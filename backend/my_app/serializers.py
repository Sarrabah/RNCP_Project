from rest_framework import serializers

from .models import Architect, Product, QuoteRequest


class QuoteRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuoteRequest
        fields = ["id", "name", "status", "archi_id"]


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
