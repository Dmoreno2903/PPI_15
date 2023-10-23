from rest_framework import serializers
from .models import User
from .models import Eps
from .models import PerfilUsuario
from .models import Triage
from .models import Ips

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'name',
            'id',
            'contacto',
            'email',
            'eps',
            'genero',
            'usuario',
            'password',
            'name_emergencia',
            'contacto_emergencia',
        )
        read_only_fields = ('created_at', )

class EpsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Eps
        fields = (
            'codigo',
            'nit',
            'regimen',
            'entidad',
        )
class IpsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ips
        #Serializa todos los campos
        fields = '__all__' 


# PerfilUsuario.objects.all().delete()
class PerfilUsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = PerfilUsuario
        fields = (
            # 'id',
            'nombre_completo',
            'id',
            'numero_contacto',
            'correo_electronico',
            'eps',
            'sexo',
            'nombre_contacto_emergencia',
            'numero_contacto_emergencia',
            'direccion_residencia',
            'acceso_ubicacion_habilitado',
            'alergias',
            'medicamentos',
            'tipo_sangre',
            'medicamentos_alergicos',
            # 'perfil_completo',
        )
        read_only_fields = ('created_at', )

class TriageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Triage
        fields = '__all__'