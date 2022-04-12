from tracemalloc import start
from django.shortcuts import render
from django.http import HttpResponse
from .utilities import create_discord_event
import json


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
    data = json.loads(request.body.decode('utf-8'))

    name = data['name']
    description = data['description']
    start_time = data['start_time']
    end_time = data['end_time']
    location = data['location']
    image = data['image']


    create_discord_event(
        name = name,
        description = description,
        start_time = start_time,
        end_time = end_time,
        location = location,
        image = image,
    )

    return HttpResponse("hello")


