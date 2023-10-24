from rest_framework import serializers
from .models import Eps
from .models import Ips

class EpsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Eps
        fields = '__all__'

class IpsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ips
        fields = '__all__' 