from rest_framework import serializers
from .models import Eps
from .models import Ips
from .models import User
from .models import Triaje
from .models import PerfilUsuario

class EpsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Eps
        fields = '__all__'

class IpsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ips
        fields = '__all__' 

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__' 

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
            'alergias',
            'medicamentos',
            'RH'
        )
        read_only_fields = ('codigo')

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