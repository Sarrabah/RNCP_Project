from typing import List

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import (ProductsResponseSerializer,
                          QuoteRequestResponseSerializer,
                          QuoteRequestSerializer)


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


class Product:
    def __init__(self, id: int, name: str, image: str, category: str):
        self.id = id
        self.image = image
        self.name = name
        self.category = category


class ProductResponse:
    dataResponse: list[Product]
    errorResponse: str


class ProductListApiView(APIView):
    Products: List[Product] = [
        Product(
            1,
            "https://bricola.tn/13553-large_default/bouton-de-porte-503-satine-cebi.jpg",
            "Button",
            "furniture",
        ),
        Product(
            2,
            "https://alba-creation.com/fr/3540-thickbox_default/cale-de-porte-lestee.jpg",
            "Door stop",
            "door",
        ),
        Product(
            3,
            "https://www.lecnt.com/20220-home_default/parquet-terraclick-2g-m26324-chene-clair-ac3-12035x1917x8-mm.jpg",
            "Parquet",
            "floor",
        ),
        Product(
            4,
            "https://www.10000articles.shop/images/thumbs/0017244_robinet-jardin-chrome-1521.jpeg",
            "Faucet",
            "bathroom",
        ),
        Product(
            5,
            "https://www.meubletmoi.com/32650-large_default/lot-de-4-pieds-de-meuble-17-cm-x-4-cm-conique-courbe-en-bois-de-hetre.jpg",
            "Leg",
            "furniture",
        ),
        Product(
            6,
            "https://www.thirard.fr/wp-content/uploads/2022/08/Poigne%CC%81es.jpeg",
            "Handles",
            "furniture",
        ),
        Product(
            7,
            "https://www.brun-doutte.com/wp-content/uploads/2019/12/gar95-rampe-paris.jpg",
            "Rump",
            "furniture",
        ),
        Product(
            8,
            "https://medias.maisonsdumonde.com/images/ar_1:1,c_pad,f_auto,q_auto,w_732/v1/mkp/M24039577_5/cloche-en-fonte-marron-28-x-20-cm.jpg",
            "Bell",
            "door",
        ),
        Product(
            9,
            "https://bricola.tn/8330-large_default/poignee-de-porte-dilara-grand-trou-satin-chrome-doganlar.jpg",
            "Handles",
            "door",
        ),
        Product(
            10,
            "https://www.stevens-locks.com/pictures/products/PH64.JPG",
            "Door puller",
            "door",
        ),
        Product(
            11,
            "https://media.cdn.saint-maclou.com/3061_6060_A_Small.jpg?frz-w=640&frz-resizeimgs=true",
            "Tiling",
            "floor",
        ),
        Product(
            12,
            "https://www.stonenaturelle.be/library/media/bilder/produits-interieur/carrelage%20en%20travertin/travertinfliesen%20classic%20country/carrelage-travertin-classic-country-couloir-tabouret.jpg?w=748&hash=E3EA24BCC3BC25278F805962B6F396247DD5B564",
            "Tiling",
            "floor",
        ),
        Product(
            13,
            "https://www.somocergroup.com/wp-content/uploads/2021/04/AMBIANCE-AKROM-60X120.jpg",
            "Tiling",
            "floor",
        ),
        Product(
            14,
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9jPo-1QDjlX0kBITDL4mHc7jHFwASDWUjQw&s",
            "vanity unit set",
            "bathroom",
        ),
        Product(
            15,
            "https://media.adeo.com/mkp/a4582c8e25168d4335552ff3baeb31a7/media.jpg?width=650&height=650&format=jpg&quality=80&fit=bounds",
            "Mirror",
            "bathroom",
        ),
        Product(
            16,
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcSiuoDAnCbrVjlzEF87BpnsdWm6NYOnf9ww&s",
            "Basin",
            "bathroom",
        ),
    ]

    def get(self, request):
        productsRes = ProductResponse()
        productsRes.dataResponse = self.Products
        productsRes.errorResponse = ""

        serializer = ProductsResponseSerializer(productsRes)
        return Response(serializer.data, status=status.HTTP_200_OK)
