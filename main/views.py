from django.shortcuts import render
from django.http import HttpResponse, HttpRequest, JsonResponse, HttpResponseNotAllowed
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout as logout_user
from django.template.loader import render_to_string
from django.shortcuts import redirect

from .models import *


def index(request:HttpRequest):
    return redirect('/profile')

def register(request:HttpRequest):
    if request.user.is_authenticated:
        return redirect('/profile')
    
    if request.method == 'GET':
        return render(request, '_register.html')
    
    if request.method == 'POST':
        founded_users_exists = User.objects.filter(username=request.POST['email']).exists()
        if founded_users_exists:
            return HttpResponse('<h3>Пользователь с таким email уже зрегистрирован!<h3><br>\
                                <a href="/register">Попробовать ещё</a>')

        new_user = User.objects.create_user(
            username=request.POST['email'], 
            email=request.POST['email'], 
            password=request.POST['password'])
        

        user_detail = UserDetail.objects.create(
            user=new_user,
            first_name=request.POST['firstName'], last_name=request.POST['lastName'],
            patronymic=request.POST['patronymic'], is_teacher=request.POST.get('isTeacher', False) == 'on')

        
        new_user.save()
        user_detail.save()

        login(request, new_user)

        return redirect("/profile")
    


def auth(request:HttpRequest):
    if request.user.is_authenticated:
        return redirect('/profile')
    

    if request.method == 'GET':
        return render(request, '_auth.html')

    if request.method == 'POST':
        user = authenticate(email=request.POST['email'],username=request.POST['email'], password=request.POST['password'])
        if user is not None:
            login(request, user)
            return redirect('/profile')
        
        return HttpResponse('<h3>Пользователь с таким email/паролем не найден!<h3><br>\
                                <a href="/auth">Попробовать ещё</a>')
    
    return redirect('/auth')
    
def profile(request:HttpRequest):
    if not request.user.is_authenticated:
        return redirect('/auth')

    if request.method == 'GET':
        return render(request, '_profile.html')

    if request.method == 'POST':
        ud = UserDetail.objects.get(user=request.user)

        if not ud.is_teacher:
            semesters = Semester.objects.all()

            semesters_data = [{"id": i.id, "name": i.name} for i in semesters]

            return JsonResponse({
                "info": {
                    "is_teacher": ud.is_teacher, 
                    "name": f"{ud.last_name} {ud.first_name} {ud.patronymic}",
                    "email": request.user.email
                },
                "semester": semesters_data
            }, json_dumps_params={'ensure_ascii': False})
        else:
            subjects = Subject.objects.filter(user=request.user)

            subjects_data = [{"id": i.id, "name": i.name} for i in subjects]
            
            return JsonResponse({
                "info": {
                    "is_teacher": ud.is_teacher, 
                    "name": f"{ud.last_name} {ud.first_name} {ud.patronymic}",
                    "email": request.user.email
                },
                "subjects": subjects_data
            }, json_dumps_params={'ensure_ascii': False})
    return HttpResponse('wrong request')

def logout(request:HttpRequest):
    logout_user(request)
    return redirect('/auth')

def get_panel_data(request):
    if request.method == "POST":
        data_id = request.POST["id"]
        response = {}
        ud = UserDetail.objects.get(user=request.user)

        if not ud.is_teacher:
            marks = Mark.objects.filter(user=request.user, subject__semester__pk=data_id)
            
            marks_data = []

            for i in marks:
                data = {
                    "name": i.subject.name,
                    "mark": i.mark,
                    "teacher": f"{i.subject.user.last_name} {i.subject.user.first_name[0]}.{i.subject.user.patronymic[0]}"
                }

                marks_data.append(data)        
            return JsonResponse({"marks": marks_data}, json_dumps_params={'ensure_ascii': False})
        else:
            marks = Mark.objects.filter(user=request.user, subject__pk=data_id)
            
            marks_data = []

            for i in marks:
                data = {
                    "mark": i.mark,
                    "student": f"{mark.user.last_name} {mark.user.first_name[0]}.{mark.user.patronymic[0]}"
                }

                marks_data.append(data)        
            return JsonResponse({"marks": marks_data}, json_dumps_params={'ensure_ascii': False})
    
    return HttpResponseNotAllowed("GET")