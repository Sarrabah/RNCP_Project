from typing import List, TypedDict

from django.http import HttpRequest, JsonResponse


class QuoteRequest(TypedDict):
    id: int
    quoteName: str
    status: str


QUOTEREQUESTS: List[QuoteRequest] = [
    {
        "id": 1,
        "quoteName": "Quote 1",
        "status": "Pending",
    },
    {
        "id": 2,
        "quoteName": "Quote 2",
        "status": "Completed",
    },
]


def quote_request_list(request: HttpRequest) -> JsonResponse:
    return JsonResponse(QUOTEREQUESTS, safe=False)
