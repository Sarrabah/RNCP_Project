from rest_framework import serializers


class QuoteRequestSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    quoteName = serializers.CharField()
    status = serializers.CharField()


class QuoteRequestResponseSerializer(serializers.Serializer):
    dataResponse = QuoteRequestSerializer(many=True)
    errorResponse = serializers.CharField()
