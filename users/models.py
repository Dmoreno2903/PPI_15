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
class Usuario(models.Model):
    name = models.CharField(max_length=30, blank=False)
    last_name = models.CharField(max_length=30, blank=False)
    cedula = models.CharField(max_length=10, blank=False, unique=True)
    eps = models.ForeignKey(Eps, on_delete=models.CASCADE)
    genero = models.CharField(max_length=20, blank=False)
    usuario = models.CharField(max_length=20, blank=False, primary_key=True)
    password = models.CharField(max_length=20, blank=False)
    
    def __str__(self):
        return (self.usuario)
    
# Relación Triaje
class Triaje(models.Model):
    codigo = models.AutoField(primary_key=True)
    user = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    respiratoria = models.BooleanField(blank=False, default=False) 
    traumatismos = models.BooleanField(blank=False , default=False )
    quemaduras = models.BooleanField(blank=False , default=False )
    perdida = models.BooleanField(blank=False , default=False )
    hemorragia = models.BooleanField(blank=False , default=False )
    trabajo_parto = models.BooleanField(blank=False , default=False )
    abuso_sexual = models.BooleanField(blank=False , default=False )
    signos_vitales = models.BooleanField(blank=False , default=False )
    convulsivo = models.BooleanField(blank=False , default=False )
    deficiencia_respiratoria = models.BooleanField(blank=False , default=False )
    crisis_hipertensiva = models.BooleanField(blank=False , default=False )
    fiebre = models.BooleanField(blank=False , default=False )
    vertigo = models.BooleanField(blank=False , default=False )
    respiratoria_leve = models.BooleanField(blank=False , default=False )
    tos_congestion = models.BooleanField(blank=False , default=False )
    dolor_cabeza_cronico = models.BooleanField(blank=False , default=False )
    triage_calculado = models.CharField(max_length=1, blank=False, default = 0)
    fecha = models.DateTimeField(auto_now_add=True)