# Generated by Django 5.1 on 2025-02-08 17:00

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("my_app", "0016_alter_quoterequestproduct_options"),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name="quoterequestproduct",
            unique_together={("quote_request_id", "product_id")},
        ),
    ]
