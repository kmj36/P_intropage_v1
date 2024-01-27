# Generated by Django 4.2.3 on 2023-08-17 00:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('API', '0018_comment_is_secret_comment_secrected_at'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='category',
            name='lastupdated_at',
        ),
        migrations.RemoveField(
            model_name='tag',
            name='lastupdated_at',
        ),
        migrations.AddField(
            model_name='category',
            name='updated_at',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AddField(
            model_name='tag',
            name='updated_at',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AlterField(
            model_name='category',
            name='madeby',
            field=models.CharField(blank=True, editable=False, max_length=32, null=True),
        ),
        migrations.AlterField(
            model_name='tag',
            name='madeby',
            field=models.CharField(blank=True, editable=False, max_length=32, null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='email',
            field=models.EmailField(max_length=256, unique=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='last_login',
            field=models.DateTimeField(null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='nickname',
            field=models.CharField(max_length=64, unique=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='password',
            field=models.CharField(max_length=128, verbose_name='User Password'),
        ),
        migrations.AlterField(
            model_name='user',
            name='userid',
            field=models.CharField(max_length=32, primary_key=True, serialize=False, verbose_name='User ID'),
        ),
    ]
