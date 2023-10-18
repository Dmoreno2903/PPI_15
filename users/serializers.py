from rest_framework import serializers
from .models import User

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