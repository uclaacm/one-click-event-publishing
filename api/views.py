from django.shortcuts import render
from django.http import HttpResponse
#from rest_framework.decorators import api_view
# Create your views here.

#@api_view(['GET','POST'])
def main(request):
    routes=[
        {
            'Endpoint':'/signin',
            'method':'POST',
            'body':{'password':""},
            'description':'Sign in for website'
        },
        {
            'Endpoint':'/home',
            'method':'GET',
            'body':None,
            'description':'Sign in for website'
        }
    ]
    return HttpResponse(routes)

# @api_view(['POST'])
def signin(request):
    return HttpResponse('Signed in')

def home(request):
    return HttpResponse('Event home')