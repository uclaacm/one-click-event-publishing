from django.shortcuts import render
from django.http import HttpResponse

from rest_framework.generics import RetrieveAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

# Create your views here.

from rest_framework.decorators import api_view, permission_classes

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def testJwt(request):
    return HttpResponse("TEST")

def create_event(request):
    return HttpResponse("hello")