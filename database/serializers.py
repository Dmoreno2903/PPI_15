
# Se importan las librerías necesarias
from rest_framework import serializers

# Se importan los modelos
from .models import Eps
from .models import Ips
from .models import Usuario
from .models import Triaje
from .models import PerfilUsuario
from .models import Citas
# Se crea el serializador de la relación EPS
class EpsSerializer(serializers.ModelSerializer):
    """
    Serializador para la entidad EPS.

    Este serializador transforma los objetos EPS en 
    representaciones JSON y viceversa.

    Atributos:
    - `model`: Modelo de la entidad EPS asociado al serializador.
    - `fields`: Lista de campos a incluir en la representación JSON.

    """
    class Meta:
        model = Eps
        fields = '__all__'


# Se crea el serializador de la relación IPS
class IpsSerializer(serializers.ModelSerializer):
    """
    Serializador para la entidad IPS.

    Este serializador transforma los objetos IPS en
    representaciones JSON y viceversa.

    Atributos:
    - `model`: Modelo de la entidad IPS asociado al serializador.
    - `fields`: Lista de campos a incluir en la representación JSON.

    """
    class Meta:
        model = Ips
        fields = '__all__'


# Se crea el serializador de la relación Usuario
class UsuarioSerializer(serializers.ModelSerializer):
    """
    Serializador para la entidad Usuario.

    Este serializador transforma los objetos Usuario en
    representaciones JSON y viceversa.

    Atributos:
    - `model`: Modelo de la entidad Usuario asociado al serializador.
    - `fields`: Lista de campos a incluir en la representación JSON.

    """
    class Meta:
        model = Usuario
        fields = '__all__'


# Se crea el serializador de la relación Triage
class TriajeSerializer(serializers.ModelSerializer):
    """
    Serializador para la entidad Triaje.

    Este serializador transforma los objetos Triaje en
    representaciones JSON y viceversa.

    Atributos:
    - `model`: Modelo de la entidad Triaje asociado al serializador.
    - `fields`: Lista de campos a incluir en la representación JSON.
    - `read_only_fields`: Lista de campos de solo lectura en la
    representación JSON.

    """
    class Meta:
        model = Triaje
        fields = (
            'user',
            'respiratoria',
            'traumatismos',
            'quemaduras',
            'perdida',
            'hemorragia',
            'trabajo_parto',
            'abuso_sexual',
            'signos_vitales',
            'convulsivo',
            'deficiencia_respiratoria',
            'crisis_hipertensiva',
            'fiebre',
            'vertigo',
            'respiratoria_leve',
            'tos_congestion',
            'dolor_cabeza_cronico',
            'triage_calculado'
        )
        read_only_fields = ('codigo', 'fecha')


# Se crea el serializador de la relación Perfil de usuario
class PerfilUsuarioSerializer(serializers.ModelSerializer):
    """
    Serializador para la entidad Perfil de Usuario.

    Este serializador transforma los objetos Perfil de Usuario en
    representaciones JSON y viceversa.

    Atributos:
    - `model`: Modelo de la entidad Perfil de Usuario asociado al serializador.
    - `fields`: Lista de campos a incluir en la representación JSON.
    - `read_only_fields`: Lista de campos de solo lectura en la representación JSON.

    """
    class Meta:
        model = PerfilUsuario
        fields = (
            'user',
            'email',
            'telefono',
            'contacto_emergencia',
            'telefono_emergencia',
            'direccion',
            'acceso_ubicacion',
            'latitud',
            'longitud',
            'alergias',
            'medicamentos',
            'rh'
        )
        read_only_fields = ('codigo')


# Se crea el serializador de la relación Citas
class CitasSerializer(serializers.ModelSerializer):
    """
    Serializador para la entidad Citas.

    Este serializador transforma los objetos Citas en representaciones
    JSON y viceversa.

    Atributos:
    - `model`: Modelo de la entidad Citas asociado al serializador.
    - `fields`: Lista de campos a incluir en la representación JSON.

    """
    class Meta:
        model = Citas
        fields = '__all__'
