from rest_framework import serializers

from .models import Product, QuoteRequest


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
