from rest_framework import serializers


class QuoteRequestSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    quoteName = serializers.CharField()
    status = serializers.CharField()


class QuoteRequestResponseSerializer(serializers.Serializer):
    dataResponse = QuoteRequestSerializer(many=True)
    errorResponse = serializers.CharField()


class QuoteRequestPostSerializer(serializers.Serializer):
    quoteName = serializers.CharField()
    status = serializers.CharField()
