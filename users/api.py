from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response


from .models import User
from .models import Eps
from .models import PerfilUsuario
from .models import Triage
from .models import Ips
from rest_framework import viewsets, permissions
from .serializers import UserSerializer
from .serializers import EpsSerializer
from .serializers import PerfilUsuarioSerializer
from .serializers import TriageSerializer
from .serializers import IpsSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    permissions_classes = [permissions.AllowAny]
    serializer_class = UserSerializer

class EpsViewSet(viewsets.ModelViewSet):
    queryset = Eps.objects.all()
    permissions_classes = [permissions.AllowAny]
    serializer_class = EpsSerializer

class IpsViewSet(viewsets.ModelViewSet):
    queryset = Ips.objects.all()
    permissions_classes = [permissions.AllowAny]
    serializer_class = IpsSerializer

class PerfilUsuarioViewSet(viewsets.ModelViewSet):
    queryset = PerfilUsuario.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = PerfilUsuarioSerializer

class TriageViewSet(viewsets.ModelViewSet):
    queryset = Triage.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = TriageSerializer


