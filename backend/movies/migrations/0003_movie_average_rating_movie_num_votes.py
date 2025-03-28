# Generated by Django 5.1.7 on 2025-03-15 01:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('movies', '0002_alter_principal_characters'),
    ]

    operations = [
        migrations.AddField(
            model_name='movie',
            name='average_rating',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='movie',
            name='num_votes',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
