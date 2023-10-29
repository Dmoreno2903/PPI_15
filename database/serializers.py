
# Se importan las librerías necesarias
from rest_framework import serializers

# Se importan los modelos
from .models import Eps
from .models import Ips
from .models import Usuario
from .models import Triaje
from .models import PerfilUsuario

# Se crea el serializador de la relación EPS
class EpsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Eps
        fields = '__all__'

# Se crea el serializador de la relación IPS
class IpsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ips
        fields = '__all__' 

# Se crea el serializador de la relación Usuario
class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = '__all__' 

# Se crea el serializador de la relación Triage
class TriajeSerializer(serializers.ModelSerializer):
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
        read_only_fields = (['codigo'])
