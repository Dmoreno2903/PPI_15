from .models import Eps
from .models import Ips
from .models import User
from .models import PerfilUsuario
from .models import Triage
from rest_framework import viewsets, permissions
from .serializers import EpsSerializer
from .serializers import IpsSerializer
from .serializers import UserSerializer
from .serializers import PerfilUsuarioSerializer
from .serializers import TriageSerializer

class EpsViewSet(viewsets.ModelViewSet):
    queryset = Eps.objects.all()
    permissions_classes = [permissions.AllowAny]
    serializer_class = EpsSerializer

class IpsViewSet(viewsets.ModelViewSet):
    queryset = Ips.objects.all()
    permissions_classes = [permissions.AllowAny]
    serializer_class = IpsSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    permissions_classes = [permissions.AllowAny]
    serializer_class = UserSerializer

class PerfilUsuarioViewSet(viewsets.ModelViewSet):
    queryset = PerfilUsuario.objects.all()
    permissions_classes = [permissions.AllowAny]
    serializer_class = PerfilUsuarioSerializer

class TriageViewSet(viewsets.ModelViewSet):
    queryset = Triage.objects.all()
    permissions_classes = [permissions.AllowAny]
    serializer_class = TriageSerializer
