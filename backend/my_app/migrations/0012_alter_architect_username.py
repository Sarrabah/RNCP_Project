# Generated by Django 5.1 on 2025-01-17 07:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("my_app", "0011_alter_architect_last_login"),
    ]

    operations = [
        migrations.AlterField(
            model_name="architect",
            name="username",
            field=models.CharField(default="username", max_length=100),
        ),
    ]
