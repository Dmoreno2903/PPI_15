from django.db import models

# Create your models here.

# Relación EPS
class Eps(models.Model):
    codigo = models.CharField(max_length=10, blank=False, primary_key=True)
    nit = models.CharField(max_length=15, blank=False)
    regimen = models.CharField(max_length=20, blank=False)
    entidad = models.CharField(max_length=50, blank=False)

    def __str__(self):
        return (self.entidad)

# Relación ips
class Ips(models.Model):
    codigo = models.CharField(max_length=10, blank=False, primary_key=True)
    nombre_prestador = models.CharField(max_length=250, blank=False)
    nit = models.CharField(max_length=15, blank=False)
    naturaleza = models.CharField(max_length=15, blank=False)
    direccion = models.CharField(max_length=10, blank=False)
    email = models.CharField(max_length=30, blank=False)
    telefono = models.CharField(max_length=10, blank=False)

    def __str__(self):
        return (self.nombre_prestador)
    
# Relación Usuario
class User(models.Model):
    name = models.CharField(max_length=50, blank=False)
    id = models.CharField(max_length=10, blank=False, primary_key=True)
    contacto = models.CharField(max_length=10, blank=False)
    email = models.EmailField(blank=False)
    eps = models.ForeignKey(Eps, on_delete=models.CASCADE)
    genero = models.CharField(max_length=20, blank=False)
    usuario = models.CharField(max_length=20, blank=False, unique=True)
    password = models.CharField(max_length=20, blank=False)
    name_emergencia = models.CharField(max_length=50, blank=False)
    contacto_emergencia = models.CharField(max_length=10, blank=False)