from typing import List

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .quote_request.serializers import QuoteRequestResponseSerializer, QuoteRequestSerializer


class QuoteRequest:
    def __init__(self, id: int, quoteName: str, status: str):
        self.id = id
        self.quoteName = quoteName
        self.status = status


class QuoteRequestResponse:
    dataResponse: list[QuoteRequest]
    errorResponse: str


class QuoteRequestListApiView(APIView):
    QUOTEREQUESTS: List[QuoteRequest] = [
        QuoteRequest(1, "QuoteR1", "Pending"),
        QuoteRequest(2, "QuoteR2", "Pending"),
    ]

    def get(self, request):
        qrRes = QuoteRequestResponse()
        qrRes.dataResponse = self.QUOTEREQUESTS
        qrRes.errorResponse = ""

        serializer = QuoteRequestResponseSerializer(qrRes)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = QuoteRequestSerializer(data=request.data)

        if serializer.is_valid():
            validated_data = serializer.validated_data

            if validated_data is not None:
                validated_data["id"] = len(self.QUOTEREQUESTS) + 1  

                new_quote_request = QuoteRequest(
                    validated_data["id"], 
                    validated_data["quoteName"],  
                    validated_data["status"],  
                )
                self.QUOTEREQUESTS.append(new_quote_request)
                return Response(validated_data, status=status.HTTP_201_CREATED)
            else:
                return Response(
                    {"error": "Validated data is None"},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR,
                )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
