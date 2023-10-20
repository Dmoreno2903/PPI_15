from rest_framework import routers
from .api import UserViewSet
from .api import EpsViewSet

router = routers.DefaultRouter()

router.register('api/users', UserViewSet, 'users')
router.register('api/eps', EpsViewSet, 'eps')

urlpatterns = router.urls