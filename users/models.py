from django.db import models

# Create your models here.
class User(models.Model):
    name = models.CharField(max_length=50, blank=True)
    id = models.CharField(max_length=10, blank=True, primary_key=True)
    contacto = models.CharField(max_length=10, blank=True)
    email = models.EmailField(blank=True)
    eps = models.CharField(max_length=30, blank=True)
    genero = models.CharField(max_length=20, blank=True)
    usuario = models.CharField(max_length=20, blank=True)
    password = models.CharField(max_length=20, blank=True)
    name_emergencia = models.CharField(max_length=50, blank=True)
    contacto_emergencia = models.CharField(max_length=10, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)