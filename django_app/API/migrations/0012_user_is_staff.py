# Generated by Django 4.2.3 on 2023-07-30 11:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('API', '0011_remove_user_is_staff_category_madeby_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='is_staff',
            field=models.BooleanField(default=False),
        ),
    ]
