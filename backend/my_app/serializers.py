from rest_framework import serializers

from .models import Product, QuoteRequest


class QuoteRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuoteRequest
        fields = ["id", "name", "status", "archi_id"]


class QuoteRequestResponseSerializer(serializers.Serializer):
    dataResponse = QuoteRequestSerializer(many=True)
    errorResponse = serializers.CharField()


class ProductsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = ["id", "image", "name", "category"]


class ProductsResponseSerializer(serializers.Serializer):
    dataResponse = ProductsSerializer(many=True)
    errorResponse = serializers.CharField()


class ProductDetailsResponseSerializer(serializers.Serializer):
    dataResponse = ProductsSerializer()
    errorResponse = serializers.CharField()


class ProductInformationsSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    quantity = serializers.IntegerField()


class BasketElementsSerializer(serializers.Serializer):
    quoteRequestIdList = serializers.ListField()
    productInformations = ProductInformationsSerializer(many=True)
