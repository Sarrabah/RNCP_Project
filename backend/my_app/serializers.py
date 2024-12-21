from rest_framework import serializers


class QuoteRequestSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    quoteName = serializers.CharField()
    status = serializers.CharField()


class QuoteRequestResponseSerializer(serializers.Serializer):
    dataResponse = QuoteRequestSerializer(many=True)
    errorResponse = serializers.CharField()


class ProductsSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    image = serializers.CharField()
    name = serializers.CharField()
    category = serializers.CharField()


class ProductsResponseSerializer(serializers.Serializer):
    dataResponse = ProductsSerializer(many=True)
    errorResponse = serializers.CharField()


class ProductDetailsResponseSerializer(serializers.Serializer):
    dataResponse = ProductsSerializer()
    errorResponse = serializers.CharField()
