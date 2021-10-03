from django.shortcuts import render
from django.http import HttpResponse, HttpRequest, JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout


def index(request:HttpRequest):
    if request.method == 'GET':
        return render(request, 'index.html')

def register(request:HttpRequest):
    if request.method == 'GET':
        return render(request, '_register.html')
    if request.method == 'POST':
        new_user = User.objects.create(username=request.POST['login'], email=request.POST['login'], password=request.POST['password'])
        new_user.save()
        login(request, new_user)

        return JsonResponse({'success':True})
    


def auth(request:HttpRequest):
    if request.method == 'GET':
        return render(request, '_auth.html')
    if request.method == 'POST':
        user = authenticate(username=request.POST['login'], password=request.POST['password'])

        if user is not None:
            login(request, user)
            return JsonResponse({'success':True})

        return JsonResponse({'success':False})
    return HttpResponse('wrong request')
    
def profile(request:HttpRequest):
    if request.method == 'GET':
        return render(request, '_profile.html')
    return HttpResponse('wrong request')