# Generated by Django 5.1 on 2025-02-24 17:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        (
            "my_app",
            "0022_rename_product_id_quoterequestproduct_product_object_and_more",
        ),
    ]

    operations = [
        migrations.AlterField(
            model_name="quoterequestproduct",
            name="id",
            field=models.BigAutoField(
                auto_created=True, primary_key=True, serialize=False, verbose_name="ID"
            ),
        ),
    ]
