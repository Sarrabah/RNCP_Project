from typing import List, TypedDict

from django.http import HttpRequest, JsonResponse


class Article(TypedDict):
    id: int
    title: str
    content: str


ARTICLES: List[Article] = [
    {
        "id": 1,
        "title": "Premier article",
        "content": "Contenu du premier article",
    },
    {
        "id": 2,
        "title": "Deuxième article",
        "content": "Contenu du deuxième article",
    },
    {
        "id": 3,
        "title": "Troisième article",
        "content": "Contenu du troisième article",
    },
]


def article_list(request: HttpRequest) -> JsonResponse:
    return JsonResponse(ARTICLES, safe=False)
