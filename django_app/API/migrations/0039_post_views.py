# Generated by Django 4.2.3 on 2023-10-22 18:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('API', '0038_alter_post_thumbnailurl_alter_tag_tagid'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='views',
            field=models.PositiveIntegerField(default=0, verbose_name='View Counts'),
        ),
    ]
