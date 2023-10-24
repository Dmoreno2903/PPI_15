from rest_framework import routers
from .api import EpsViewSet
from .api import IpsViewSet
from .api import UsuarioViewSet
from .api import PerfilViewSet
from .api import TriajeViewSet

router = routers.DefaultRouter()

router.register('api/eps', EpsViewSet, 'eps')
router.register('api/ips', IpsViewSet, "ips")
router.register('api/user', UsuarioViewSet, 'user')
router.register('api/perfil', PerfilViewSet, 'perfil')
router.register('api/triaje', TriajeViewSet, 'triaje')


urlpatterns = router.urls