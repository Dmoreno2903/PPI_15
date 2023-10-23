from rest_framework import serializers
from .models import Eps
from .models import Ips
from .models import User
from .models import PerfilUsuario
from .models import Triage

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

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        #Serializa todos los campos
        fields = '__all__'

class PerfilUsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = PerfilUsuario
        #Serializa todos los campos
        fields = '__all__' 

class TriageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Triage
        #Serializa todos los campos
        fields = '__all__' 