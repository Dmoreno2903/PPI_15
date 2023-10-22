from rest_framework import routers
from .api import UserViewSet
from .api import EpsViewSet
from .api import IpsViewSet

router = routers.DefaultRouter()

router.register('api/users', UserViewSet, 'users')
router.register('api/eps', EpsViewSet, 'eps')
router.register('api/ips', IpsViewSet, "ips")

urlpatterns = router.urls