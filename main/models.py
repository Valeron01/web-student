from django.db import models
from django.contrib.auth.models import User

class UserDetail(models.Model):
    user = models.ForeignKey(User, models.CASCADE, default=None)
    first_name = models.CharField(max_length=40)
    last_name = models.CharField(max_length=40)
    patronymic = models.CharField(max_length=40)

    is_teacher = models.BooleanField(default=False)

    def __str__(self):
        detail = 'преподаватель' if is_teacher else student_code
        return f'{first_name} {last_name} {patronymic}, {detail}'


    class Meta:
        verbose_name = 'Детальная информация'
        verbose_name_plural = 'Детальная информация'


class Student(models.Model):
    user = models.ForeignKey(User, models.CASCADE, default=None)
    student_code = models.IntegerField(default=0)

class Teacher(models.Model):
    user = models.ForeignKey(User, models.CASCADE, default=None)

class Subject(models.Model):
    teacher = models.ForeignKey(Teacher, models.CASCADE, default=None)
    name = models.CharField(max_length=40)
    semester = models.IntegerField(default=-1)

class Mark(models.Model):
    student = models.ForeignKey(Student, models.CASCADE, default=None)
    subject = models.ForeignKey(Subject, models.CASCADE, default=None)
    mark = models.IntegerField(default=0)