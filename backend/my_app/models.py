from django.contrib.auth.models import AbstractUser
from django.db import models


class Product(models.Model):
    id = models.AutoField(primary_key=True)
    image = models.CharField(max_length=255, blank=True)
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=100)

    def __str__(self) -> str:
        return self.name

    class Meta:
        db_table = "product"


class Architect(AbstractUser):
    id = models.AutoField(primary_key=True)
    email = models.CharField(unique=True, max_length=255)
    adress = models.CharField(max_length=255, blank=True, null=True)
    region_code = models.CharField(max_length=20)
    phone_number = models.CharField(max_length=30, blank=True, null=True)
    username = models.CharField(unique=False, max_length=100, default="username")

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name", "last_name"]

    def __str__(self) -> str:
        return self.email

    class Meta:
        db_table = "architect"


class HardwareStore(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    adresse = models.CharField(max_length=255, blank=True)
    region_code = models.CharField(max_length=10, blank=True)
    email = models.CharField(unique=True, max_length=255)

    def __str__(self) -> str:
        return self.name

    class Meta:
        db_table = "hardware_store"


class QuoteRequest(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    status = models.CharField(max_length=8)
    archi_id = models.ForeignKey(
        Architect, on_delete=models.CASCADE, db_column="archi_id"
    )

    def __str__(self) -> str:
        return self.name

    class Meta:
        db_table = "quote_request"


class QuoteRequestProduct(models.Model):
    id = models.AutoField(primary_key=True)
    quote_request_object = models.ForeignKey(
        QuoteRequest, on_delete=models.CASCADE, db_column="quote_request_id"
    )
    product_object = models.ForeignKey(
        Product, on_delete=models.CASCADE, db_column="product_id"
    )
    quantity = models.IntegerField()

    class Meta:
        db_table = "quote_request_product"
        unique_together = ("quote_request_object", "product_object")


class HardwareStoreQuoteRequest(models.Model):
    hardware_store_id = models.ForeignKey(
        HardwareStore, on_delete=models.CASCADE, db_column="hardware_store_id"
    )
    quote_request_id = models.ForeignKey(
        QuoteRequest, on_delete=models.CASCADE, db_column="quote_request_id"
    )

    class Meta:
        db_table = "hardware_store_quote_request"
