from .models import User
from .models import Eps
from .models import Ips
from rest_framework import viewsets, permissions
from .serializers import UserSerializer
from .serializers import EpsSerializer
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