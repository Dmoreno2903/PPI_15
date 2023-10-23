from rest_framework import routers
from .api import UserViewSet
from .api import EpsViewSet
from .api import PerfilUsuarioViewSet
from .api import TriageViewSet
from .api import IpsViewSet

from django.urls import path

router = routers.DefaultRouter()

router.register('api/users', UserViewSet, 'users')
router.register('api/ips', IpsViewSet, "ips")
router.register('api/eps', EpsViewSet, 'eps')
router.register('api/perfil-usuario', PerfilUsuarioViewSet, 'perfil-usuario')
router.register('api/triage', TriageViewSet, 'triage')



urlpatterns = router.urls