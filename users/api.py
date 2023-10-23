from .models import Eps
from .models import Ips
from rest_framework import viewsets, permissions
from .serializers import EpsSerializer
from .serializers import IpsSerializer

class EpsViewSet(viewsets.ModelViewSet):
    queryset = Eps.objects.all()
    permissions_classes = [permissions.AllowAny]
    serializer_class = EpsSerializer

class IpsViewSet(viewsets.ModelViewSet):
    queryset = Ips.objects.all()
    permissions_classes = [permissions.AllowAny]
    serializer_class = IpsSerializer