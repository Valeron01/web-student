from django.db import models
from django.contrib.auth.models import User

class Student(models.Model):
    user = models.ForeignKey(User, models.CASCADE, default=None)
    student_code = models.IntegerField(default=0)

    def __str__(self):
        return str(self.user)

class Teacher(models.Model):
    user = models.ForeignKey(User, models.CASCADE, default=None)

    def __str__(self):
        ud = UserDetail.objects.get(user=self.user)
        return str(ud)

class Semester(models.Model):
    name = models.CharField(max_length=20, default="Undefined_semester", unique=True)
    def __str__(self):
        return self.name

class Subject(models.Model):
    teacher = models.ForeignKey(Teacher, models.CASCADE, default=None)
    name = models.CharField(max_length=40)
    semester = models.ForeignKey(Semester, models.CASCADE)

    def __str__(self):
        return f"{self.teacher}, {self.name}"

class Mark(models.Model):
    student = models.ForeignKey(Student, models.CASCADE, default=None)
    subject = models.ForeignKey(Subject, models.CASCADE, default=None)
    mark = models.IntegerField(default=0)
    semester = models.ForeignKey(Semester, models.CASCADE, default=None)


class UserDetail(models.Model):
    user = models.ForeignKey(User, models.CASCADE, default=None)
    first_name = models.CharField(max_length=40)
    last_name = models.CharField(max_length=40)
    patronymic = models.CharField(max_length=40)

    is_teacher = models.BooleanField(default=False)

    def __str__(self):
        detail = 'преподаватель' if self.is_teacher else Student.objects.get(user=self.user).student_code
        return f'{self.first_name} {self.patronymic} {self.last_name}, {detail}'


    class Meta:
        verbose_name = 'Детальная информация'
        verbose_name_plural = 'Детальная информация'