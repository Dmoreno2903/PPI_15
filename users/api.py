from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response


from .models import User
from .models import Eps
from .models import PerfilUsuario
from .models import Triage
from rest_framework import viewsets, permissions
from .serializers import UserSerializer
from .serializers import EpsSerializer
from .serializers import PerfilUsuarioSerializer
from .serializers import TriageSerializer


# # Para la categorización del triage
# from rest_framework.decorators import api_view
# from rest_framework.response import Response

# def categorizar_triage(temperatura, presion, frecuencia_cardiaca, frecuencia_respiratoria, saturacion_oxigeno, nivel_dolor):
#     # Define los rangos para cada medida
#     # Puedes ajustar estos rangos según los estándares médicos
#     temperatura_normal = (36.0, 37.0)
#     presion_normal = ("90/60", "120/80")
#     frecuencia_cardiaca_normal = (60, 100)
#     frecuencia_respiratoria_normal = (12, 20)
#     saturacion_oxigeno_normal = ("95%", "100%")
#     nivel_dolor_bajo = ("0", "3")
    
#     # Verifica la temperatura
#     if temperatura < temperatura_normal[0]:
#         return "Triage Rojo"  # Condición crítica
#     elif temperatura < temperatura_normal[1]:
#         return "Triage Amarillo"  # Preocupante, pero no crítico

#     # Verifica la presión
#     if presion < presion_normal[0]:
#         return "Triage Rojo"
#     elif presion < presion_normal[1]:
#         return "Triage Amarillo"

#     # Verifica la frecuencia cardíaca
#     if frecuencia_cardiaca < frecuencia_cardiaca_normal[0]:
#         return "Triage Rojo"
#     elif frecuencia_cardiaca < frecuencia_cardiaca_normal[1]:
#         return "Triage Amarillo"

#     # Repite el proceso para las otras medidas

#     # Si todas las medidas están dentro de los rangos normales, entonces es una categoría menos crítica
#     if (temperatura_normal[0] <= temperatura <= temperatura_normal[1] and
#         presion_normal[0] <= presion <= presion_normal[1] and
#         frecuencia_cardiaca_normal[0] <= frecuencia_cardiaca <= frecuencia_cardiaca_normal[1] and
#         frecuencia_respiratoria_normal[0] <= frecuencia_respiratoria <= frecuencia_respiratoria_normal[1] and
#         saturacion_oxigeno_normal[0] <= saturacion_oxigeno <= saturacion_oxigeno_normal[1] and
#         nivel_dolor_bajo[0] <= nivel_dolor <= nivel_dolor_bajo[1]):
#         return "Triage Verde"  # Menos grave

#     # Si no se cumple ninguna de las condiciones anteriores, es una categoría intermedia
#     return "Triage Naranja"

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    permissions_classes = [permissions.AllowAny]
    serializer_class = UserSerializer

class EpsViewSet(viewsets.ModelViewSet):
    queryset = Eps.objects.all()
    permissions_classes = [permissions.AllowAny]
    serializer_class = EpsSerializer

class PerfilUsuarioViewSet(viewsets.ModelViewSet):
    queryset = PerfilUsuario.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = PerfilUsuarioSerializer

class TriageViewSet(viewsets.ModelViewSet):
    queryset = Triage.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = TriageSerializer


