# Generated by Django 3.2.7 on 2021-11-13 14:23

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('main', '0008_alter_mark_mark'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='mark',
            unique_together={('user', 'subject')},
        ),
    ]
