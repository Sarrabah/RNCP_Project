# Generated by Django 5.1 on 2025-01-16 07:56

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("my_app", "0003_alter_architect_username"),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name="architect",
            unique_together={("email", "username")},
        ),
    ]
