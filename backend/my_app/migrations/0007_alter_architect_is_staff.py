# Generated by Django 5.1 on 2025-01-16 08:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("my_app", "0006_alter_architect_is_superuser"),
    ]

    operations = [
        migrations.AlterField(
            model_name="architect",
            name="is_staff",
            field=models.BooleanField(default=False),
        ),
    ]
