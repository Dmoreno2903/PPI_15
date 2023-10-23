# from django.shortcuts import render
# from django.http import JsonResponse
# from django.views.decorators.csrf import csrf_exempt
# import json

from .models import Triage
from rest_framework import viewsets, permissions

class ClasificacionViewSet(viewsets.ModelViewSet):
    queryset = Triage.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]