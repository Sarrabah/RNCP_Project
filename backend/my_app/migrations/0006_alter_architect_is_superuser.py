# Generated by Django 5.1 on 2025-01-16 08:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("my_app", "0005_alter_architect_unique_together_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="architect",
            name="is_superuser",
            field=models.BooleanField(default=False),
        ),
    ]
