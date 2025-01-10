from rest_framework import serializers

from .models import Product


class QuoteRequestSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    quoteName = serializers.CharField()
    status = serializers.CharField()


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
