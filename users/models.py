from django.db import models

# Create your models here.

# Relación EPS
class Eps(models.Model):
    codigo = models.CharField(max_length=10, blank=True, primary_key=True)
    nit = models.CharField(max_length=15, null=False)
    regimen = models.CharField(max_length=20, null=False)
    entidad = models.CharField(max_length=50, null=False)

# Relación Usuarios
class User(models.Model):
    name = models.CharField(max_length=50, blank=True)
    id = models.CharField(max_length=10, blank=True, primary_key=True)
    contacto = models.CharField(max_length=10, blank=True)
    email = models.EmailField(blank=True)
    eps = models.ForeignKey(Eps, on_delete=models.CASCADE)
    genero = models.CharField(max_length=20, blank=True)
    usuario = models.CharField(max_length=20, blank=True)
    password = models.CharField(max_length=20, blank=True)
    name_emergencia = models.CharField(max_length=50, blank=True)
    contacto_emergencia = models.CharField(max_length=10, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)