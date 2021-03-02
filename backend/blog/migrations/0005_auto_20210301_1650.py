# Generated by Django 3.1.7 on 2021-03-01 16:50

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('blog', '0004_auto_20210301_1341'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='comment',
            name='email',
        ),
        migrations.RemoveField(
            model_name='comment',
            name='name',
        ),
        migrations.RemoveField(
            model_name='comment',
            name='website',
        ),
        migrations.AddField(
            model_name='comment',
            name='author',
            field=models.ForeignKey(default=True, on_delete=django.db.models.deletion.CASCADE, related_name='comments', related_query_name='comment', to=settings.AUTH_USER_MODEL),
        ),
    ]
