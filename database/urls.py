from rest_framework import routers
from .api import EpsViewSet
from .api import IpsViewSet
from .api import UsuarioViewSet
from .api import TriajeViewSet
from .api import PerfilViewSet
from .api import IPSFiltradaViewSet

router = routers.DefaultRouter()

router.register('api/eps', EpsViewSet, 'eps')
router.register('api/ips', IpsViewSet, "ips")
router.register('api/usuario', UsuarioViewSet, 'usuario')
router.register('api/triaje', TriajeViewSet, 'triaje')
router.register('api/perfil', PerfilViewSet, 'perfil')
router.register('api/filtrada', IPSFiltradaViewSet, 'ips_filtrada')

urlpatterns = router.urls