# Generated by Django 5.0.2 on 2024-02-24 22:59

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Committee',
            fields=[
                ('name', models.CharField(max_length=100, primary_key=True, serialize=False, unique=True)),
                ('department', models.CharField(max_length=200)),
                ('email', models.EmailField(max_length=254)),
                ('desc', models.TextField(max_length=500)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Faculty',
            fields=[
                ('name', models.CharField(max_length=100, unique=True)),
                ('department', models.CharField(max_length=200)),
                ('email', models.EmailField(max_length=254)),
                ('fac_id', models.CharField(max_length=20, primary_key=True, serialize=False, unique=True)),
                ('is_principle', models.BooleanField()),
                ('is_hod', models.BooleanField()),
                ('is_mentor', models.BooleanField()),
                ('is_dean', models.BooleanField()),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Student',
            fields=[
                ('name', models.CharField(max_length=100, unique=True)),
                ('department', models.CharField(max_length=200)),
                ('email', models.EmailField(max_length=254)),
                ('rollno', models.CharField(max_length=20, primary_key=True, serialize=False)),
                ('ac_year', models.IntegerField()),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]