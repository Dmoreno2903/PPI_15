from rest_framework import serializers
from .models import User
from .models import Eps
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