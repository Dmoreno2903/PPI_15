from rest_framework import viewsets, permissions

from .models import Eps
from .models import Ips
from .models import Usuario
from .models import Triaje
from .models import PerfilUsuario
from .models import IPSFiltrada

from .serializers import EpsSerializer
from .serializers import IpsSerializer
from .serializers import UsuarioSerializer
from .serializers import TriajeSerializer
from .serializers import PerfilUsuarioSerializer
from .serializers import IPSFiltradaSerializer

class EpsViewSet(viewsets.ModelViewSet):
    queryset = Eps.objects.all()
    permissions_classes = [permissions.AllowAny]
    serializer_class = EpsSerializer

class IpsViewSet(viewsets.ModelViewSet):
    queryset = Ips.objects.all()
    permissions_classes = [permissions.AllowAny]
    serializer_class = IpsSerializer

class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    permissions_classes = [permissions.AllowAny]
    serializer_class = UsuarioSerializer

class TriajeViewSet(viewsets.ModelViewSet):
    queryset = Triaje.objects.all()
    permissions_classes = [permissions.AllowAny]
    serializer_class = TriajeSerializer

class PerfilViewSet(viewsets.ModelViewSet):
    queryset = PerfilUsuario.objects.all()
    permissions_classes = [permissions.AllowAny]
    serializer_class = PerfilUsuarioSerializer

class IPSFiltradaViewSet(viewsets.ModelViewSet):
    queryset = IPSFiltrada.objects.all()
    permissions_classes = [permissions.AllowAny]
    serializer_class = IPSFiltradaSerializer