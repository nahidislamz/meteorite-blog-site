# Generated by Django 3.1.7 on 2021-03-04 18:07

import accounts.models
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('website', models.URLField(blank=True, default='')),
                ('profile_pic', models.ImageField(default='profile/avater.png', null=True, upload_to=accounts.models.upload_to)),
                ('bio', models.TextField(blank=True, default='', max_length=100)),
                ('facebook', models.CharField(blank=True, default='', max_length=40)),
                ('twitter', models.CharField(blank=True, default='', max_length=40)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='profile', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
