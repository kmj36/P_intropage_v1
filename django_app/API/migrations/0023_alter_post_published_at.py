# Generated by Django 4.2.3 on 2023-08-17 16:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('API', '0022_post_published_at'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='published_at',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
