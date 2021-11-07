from django.contrib import admin
from .models import *

admin.site.register(Mark)
admin.site.register(UserDetail)
admin.site.register(Semester)

# Register your models here.

@admin.register(Subject)
class SubjectAdmin(admin.ModelAdmin):
    def response_add(self, request, obj):
        students = UserDetail.objects.filter(is_teacher=False)

        for stud in students:
            new_mark = Mark.objects.create(user=stud.user, subject=obj, mark=-1)
        
        return super().response_change(request, obj)