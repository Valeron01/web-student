from django.shortcuts import render
from django.http import HttpResponse, HttpRequest, JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.template.loader import render_to_string
from django.shortcuts import redirect

from .models import *


def index(request:HttpRequest):
    if request.method == 'GET':
        return render(request, 'index.html')

    if request.method == 'POST':
        if request.user.is_authenticated:
            return render(request, '_profile.html')
        else:
            return render(request, '_auth.html')

def register(request:HttpRequest):
    if request.method == 'GET':
        return render(request, '_register.html')
    if request.method == 'POST':
        new_user = User.objects.create(username=request.POST['email'], email=request.POST['email'], password=request.POST['password'])

        user_detail = UserDetail.objects.create(
            new_user,
            request.POST['firstName'], request.POST['lastName'],
            request.POST['patronymic'], request.POST['isTeacher'], 
            request.POST['studentCode'])
        
        new_user.save()
        login(request, new_user)

        return JsonResponse({'success':True})
    


def auth(request:HttpRequest):
    if request.method == 'GET':
        return render(request, '_auth.html')
    if request.method == 'POST':
        user = authenticate(username=request.POST['email'], password=request.POST['password'])

        if user is not None:
            login(request, user)
            return redirect('/')

        return JsonResponse({'success':False})


    return HttpResponse('wrong request')
    
def profile(request:HttpRequest):
    if request.method == 'GET':
        return render(request, '_profile.html')
    return HttpResponse('wrong request')