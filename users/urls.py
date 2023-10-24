from rest_framework import routers
from .api import EpsViewSet
from .api import IpsViewSet
from .api import UserViewSet

router = routers.DefaultRouter()

router.register('api/eps', EpsViewSet, 'eps')
router.register('api/ips', IpsViewSet, "ips")
router.register('api/user', UserViewSet, 'user')
router.register('api/perfil', UserViewSet, 'perfil')
router.register('api/triaje', UserViewSet, 'triaje')

urlpatterns = router.urls