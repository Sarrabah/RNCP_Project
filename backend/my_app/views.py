from typing import List

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import QuoteRequestResponseSerializer, QuoteRequestSerializer


class QuoteRequest:
    def __init__(self, id: int, quoteName: str, status: str):
        self.id = id
        self.quoteName = quoteName
        self.status = status


qr1 = QuoteRequest(1, "QuoteR1", "Pending")
qr2 = QuoteRequest(2, "QuoteR2", "Pending")

QUOTEREQUESTS: List[QuoteRequest] = [qr1, qr2]


class QuoteRequestResponse:
    dataResponse: list[QuoteRequest]
    errorResponse: str


qrRes = QuoteRequestResponse()
qrRes.dataResponse = QUOTEREQUESTS
qrRes.errorResponse = ""


class QuoteRequestListApiView(APIView):

    def get(self, request):
        serializer = QuoteRequestResponseSerializer(qrRes)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = QuoteRequestSerializer(data=request.data)

        if serializer.is_valid():
            print(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
