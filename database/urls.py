
# Se importan las librerías necesarias
from rest_framework import routers

# Se importan las vistas de todos los modelos
from .api import EpsViewSet
from .api import IpsViewSet
from .api import UsuarioViewSet
from .api import TriajeViewSet
from .api import PerfilViewSet
from .api import CitasViewSet

# Se define un router que se encargará de administrar las rutas
router = routers.DefaultRouter()

# Se crean las rutas de acceso a cada una de las relaciones
router.register('api/eps', EpsViewSet, 'eps')
router.register('api/ips', IpsViewSet, "ips")
router.register('api/usuario', UsuarioViewSet, 'usuario')
router.register('api/triaje', TriajeViewSet, 'triaje')
router.register('api/perfil', PerfilViewSet, 'perfil')
router.register('api/citas', CitasViewSet, 'citas')

# Se le pasan al proyecto de django las rutas creadas
urlpatterns = router.urls