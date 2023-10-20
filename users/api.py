from .models import User
from .models import Eps
from rest_framework import viewsets, permissions
from .serializers import UserSerializer
from .serializers import EpsSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    permissions_classes = [permissions.AllowAny]
    serializer_class = UserSerializer

class EpsViewSet(viewsets.ModelViewSet):
    queryset = Eps.objects.all()
    permissions_classes = [permissions.AllowAny]
    serializer_class = EpsSerializer