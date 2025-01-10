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


class Architect(models.Model):
    id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.CharField(unique=True, max_length=255)
    password = models.CharField(max_length=255)
    adress = models.CharField(max_length=255, blank=True)
    region_code = models.CharField(max_length=20)
    phone_number = models.CharField(max_length=30, blank=True)

    def __str__(self) -> str:
        return self.first_name

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
