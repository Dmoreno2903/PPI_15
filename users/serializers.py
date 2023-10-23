from rest_framework import serializers
from .models import Eps
from .models import Ips
from .models import User

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