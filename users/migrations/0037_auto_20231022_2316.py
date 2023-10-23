# Generated by Django 3.2.22 on 2023-10-23 04:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0036_alter_triage_unique_together'),
    ]

    operations = [
        migrations.AddField(
            model_name='triage',
            name='id',
            field=models.BigAutoField(auto_created=True, default=0, primary_key=True, serialize=False, verbose_name='ID'),
            preserve_default=False,
        ),
        migrations.AlterUniqueTogether(
            name='triage',
            unique_together=set(),
        ),
        migrations.RemoveField(
            model_name='triage',
            name='fecha',
        ),
        migrations.RemoveField(
            model_name='triage',
            name='hora',
        ),
    ]
