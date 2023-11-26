from django.db import models

class Eps(models.Model):
    """ Modelo que representa la entidad EPS en el sistema.

    Atributos:
    - `codigo`: Código identificador único de la EPS (clave primaria).
    - `nit`: NIT (Número de Identificación Tributaria) de la EPS.
    - `regimen`: Régimen al que pertenece la EPS.
    - `entidad`: Nombre de la entidad EPS.

    Método:
    - `__str__`: Método que devuelve la representación en cadena
    de la entidad EPS (nombre de la entidad).
    """
    codigo = models.CharField(max_length=10, blank=False, primary_key=True)
    nit = models.CharField(max_length=15, blank=False)
    regimen = models.CharField(max_length=20, blank=False)
    entidad = models.CharField(max_length=50, blank=False)

    def __str__(self):
        return (self.entidad)

class Ips(models.Model):
    """
    Modelo que representa la entidad IPS en el sistema.

    Atributos:
    - `codigo`: Código identificador único de la IPS (clave primaria).
    - `nombre_prestador`: Nombre del prestador de servicios de salud.
    - `nit`: NIT (Número de Identificación Tributaria) de la IPS.
    - `naturaleza`: Naturaleza de la IPS.
    - `direccion`: Dirección de la IPS.
    - `email`: Correo electrónico de la IPS.
    - `telefono`: Número de teléfono de la IPS.
    - `tiempo_urgencias`: Tiempo de atención en urgencias.
    - `complejidad`: Nivel de complejidad de la IPS.
    - `latitud`: Coordenada de latitud de la ubicación de la IPS.
    - `longitud`: Coordenada de longitud de la ubicación de la IPS.

    Método:
    - `__str__`: Método que devuelve la representación en cadena 
    de la entidad IPS (nombre del prestador).
    """
    codigo = models.CharField(max_length=10, blank=False, primary_key=True)
    nombre_prestador = models.CharField(max_length=250, blank=False)
    nit = models.CharField(max_length=15, blank=False)
    naturaleza = models.CharField(max_length=15, blank=False)
    direccion = models.CharField(max_length=100, blank=False)
    email = models.CharField(max_length=30, blank=False)
    telefono = models.CharField(max_length=10, blank=False)
    tiempo_urgencias = models.CharField(max_length=4, blank=False)
    complejidad = models.CharField(max_length=1, blank=False)
    latitud = models.CharField(max_length=50, blank=False)
    longitud = models.CharField(max_length=50, blank=False)

    def __str__(self):
        return (self.nombre_prestador)

class Usuario(models.Model):
    """Modelo que representa la entidad Usuario en el sistema.

    Atributos:
    - `name`: Nombre del usuario.
    - `last_name`: Apellido del usuario.
    - `cedula`: Número de cédula del usuario (clave única).
    - `eps`: Relación con la entidad EPS a la que está afiliado el usuario.
    - `genero`: Género del usuario.
    - `usuario`: Nombre de usuario (clave primaria).
    - `password`: Contraseña del usuario.

    Método:
    - `__str__`: Método que devuelve la representación en
    cadena del usuario (nombre de usuario).
    """
    name = models.CharField(max_length=30, blank=False)
    last_name = models.CharField(max_length=30, blank=False)
    cedula = models.CharField(max_length=10, blank=False, unique=True)
    eps = models.ForeignKey(Eps, on_delete=models.CASCADE)
    genero = models.CharField(max_length=20, blank=False)
    usuario = models.CharField(max_length=20, blank=False, primary_key=True)
    password = models.CharField(max_length=20, blank=False)
    
    def __str__(self):
        return (self.usuario)
    
class Triaje(models.Model):
    """Modelo que representa la entidad Triaje en el sistema.

    Atributos:
    - `codigo`: Código identificador único del triaje 
    (clave primaria).
    - `user`: Relación con la entidad Usuario a la que se 
    asocia el triaje.
    - `respiratoria`: Indica si el triaje incluye evaluación 
    de problemas respiratorios.
    - `traumatismos`: Indica si el triaje incluye evaluación 
    de traumatismos.
    - `quemaduras`: Indica si el triaje incluye evaluación
     de quemaduras.
    - `perdida`: Indica si el triaje incluye evaluación de
     pérdida de conocimiento.
    - `hemorragia`: Indica si el triaje incluye evaluación 
    de hemorragias.
    - `trabajo_parto`: Indica si el triaje incluye evaluación
     de trabajo de parto.
    - `abuso_sexual`: Indica si el triaje incluye evaluación 
    de abuso sexual.
    - `signos_vitales`: Indica si el triaje incluye evaluación
     de signos vitales.
    - `convulsivo`: Indica si el triaje incluye evaluación 
    de convulsiones.
    - `deficiencia_respiratoria`: Indica si el triaje 
    incluye evaluación de deficiencia respiratoria.
    - `crisis_hipertensiva`: Indica si el triaje incluye 
    evaluación de crisis hipertensiva.
    - `fiebre`: Indica si el triaje incluye evaluación de fiebre.
    - `vertigo`: Indica si el triaje incluye evaluación de vértigo.
    - `respiratoria_leve`: Indica si el triaje incluye 
    evaluación de problemas respiratorios leves.
    - `tos_congestion`: Indica si el triaje incluye 
    evaluación de tos y congestión.
    - `dolor_cabeza_cronico`: Indica si el triaje incluye 
    evaluación de dolor de cabeza crónico.
    - `triage_calculado`: Valor calculado del triaje.
    - `fecha`: Fecha y hora de registro del triaje.

    """
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


class PerfilUsuario(models.Model):
    """
    Modelo que representa la entidad Perfil de Usuario en el sistema.

    Atributos:
    - `codigo`: Código identificador único del perfil de usuario 
    (clave primaria).
    - `user`: Relación con la entidad Usuario al que 
    pertenece el perfil.
    - `email`: Dirección de correo electrónico del usuario.
    - `telefono`: Número de teléfono del usuario.
    - `contacto_emergencia`: Nombre del contacto de 
    emergencia del usuario.
    - `telefono_emergencia`: Número de teléfono del
     contacto de emergencia.
    - `direccion`: Dirección del usuario.
    - `acceso_ubicacion`: Indica si el usuario permite el 
    acceso a su ubicación.
    - `latitud`: Coordenada de latitud de la ubicación del usuario.
    - `longitud`: Coordenada de longitud de la ubicación del usuario.
    - `alergias`: Lista de alergias del usuario.
    - `medicamentos`: Lista de medicamentos que toma el usuario.
    - `rh`: Tipo de grupo sanguíneo y factor Rh del usuario.

    """
    codigo = models.AutoField(primary_key=True)
    user = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    email = models.EmailField(max_length=30, blank=True)
    telefono = models.CharField(max_length=10, blank=False)
    contacto_emergencia = models.CharField(max_length=50, blank=False)
    telefono_emergencia = models.CharField(max_length=10, blank=False)
    direccion = models.CharField(max_length=50, blank=False)
    acceso_ubicacion = models.BooleanField(blank=False, default=False)
    latitud = models.CharField(max_length=50, blank=False)
    longitud = models.CharField(max_length=50, blank=False)
    alergias = models.CharField(max_length=100, blank=False)
    medicamentos = models.CharField(max_length=100, blank=False)
    rh = models.CharField(max_length=3, blank=False)

# Relación Perfil-Usuario
class Citas(models.Model):
    """Modelo que representa la entidad Citas en el sistema.

    Atributos:
    - `codigo`: Código identificador único de la cita (clave primaria).
    - `user`: Relación con la entidad Usuario a la que se asigna la cita.
    - `tipo_cita`: Tipo de cita programada.
    - `fecha`: Fecha de la cita.
    - `hora`: Hora de la cita.
    - `ips`: Relación con la entidad IPS donde se realiza la cita.

    """
    codigo = models.AutoField(primary_key=True)
    user = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    tipo_cita = models.CharField(max_length=50, blank=False)
    fecha = models.CharField(max_length=50, blank=False)
    hora = models.CharField(max_length=50, blank=False)
    ips = models.ForeignKey(Ips, on_delete=models.CASCADE)