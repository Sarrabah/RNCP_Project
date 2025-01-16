from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.timezone import now


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
    adress = models.CharField(max_length=255, blank=True)
    region_code = models.CharField(max_length=20)
    phone_number = models.CharField(max_length=30, blank=True)
    last_login = models.DateTimeField(default=now, blank=True)
    is_superuser = models.BooleanField(default=False)
    username = models.CharField(max_length=100)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(default=now)

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
    archi_id = models.ForeignKey(Architect, models.DO_NOTHING, db_column="archi_id")

    def __str__(self) -> str:
        return self.name

    class Meta:
        db_table = "quote_request"


class QuoteRequestProduct(models.Model):
    quote_request_id = models.ForeignKey(
        QuoteRequest, models.DO_NOTHING, db_column="quote_request_id"
    )
    product_id = models.ForeignKey(Product, models.DO_NOTHING, db_column="product_id")
    quantity = models.IntegerField()

    class Meta:
        db_table = "quote_request_product"


class HardwareStoreQuoteRequest(models.Model):
    hardware_store_id = models.ForeignKey(
        HardwareStore, models.DO_NOTHING, db_column="hardware_store_id"
    )
    quote_request_id = models.ForeignKey(
        QuoteRequest, models.DO_NOTHING, db_column="quote_request_id"
    )

    class Meta:
        db_table = "hardware_store_quote_request"
