# Generated by Django 4.2.3 on 2023-08-17 15:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('API', '0021_alter_user_email'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='published_at',
            field=models.DateTimeField(null=True),
        ),
    ]
