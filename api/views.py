from django.shortcuts import render
from django.http import HttpResponse

#from django.contrib.auth import get_user_model
from rest_framework.generics import RetrieveAPIView
from rest_framework.response import Response
#from rest_framework import serializers
from rest_framework.permissions import IsAuthenticated

# Create your views here.

from rest_framework.decorators import api_view, permission_classes

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def testJwt(request):
    return HttpResponse("TEST")

'''
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('id', 'username')

class UserAPIView(RetrieveAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user
'''

def create_event(request):
    return HttpResponse("hello")