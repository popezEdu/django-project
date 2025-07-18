from django.db import models
from django.contrib.auth.models import AbstractUser


from shortuuid.django_fields import ShortUUIDField

# Se recomienda modificar el modelo de usuario por defecto para que sea más flexible y poder agregar más campos
class User(AbstractUser):
    username = models.CharField(max_length=50, unique=True)
    email = models.EmailField(max_length=100, unique=True)
    full_name = models.CharField(max_length=100, null=True, blank=True)
    phone = models.CharField(max_length=20, null=True, blank=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email
    
    def save(self, *args, **kwargs):
        email_username, mobile = self.email.split('@')

        if self.full_name == "" or self.full_name is None: 
            self.full_name = email_username

        if self.username == "" or self.username is None:
            self.username = email_username
        
        super(User, self).save(*args, **kwargs)

class Profile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    image = models.FileField(upload_to='image', null=True, blank=True, default='default/default-user.png')
    full_name = models.CharField(max_length=100, null=True, blank=True)
    about = models.TextField(null=True, blank=True)
    gender = models.CharField(max_length=10, null=True, blank=True)
    country = models.CharField(max_length=100, null=True, blank=True)
    state = models.CharField(max_length=100, null=True, blank=True)
    city = models.CharField(max_length=100, null=True, blank=True)
    address = models.CharField(max_length=100, null=True, blank=True)
    date = models.DateTimeField(auto_now_add=True)
    pid = ShortUUIDField(unique=True, length=10, max_length=20, alphabet='abcdefghijk')

    def __str__(self):
        if self.full_name:
            return str(self.full_name)
        else:
            return str(self.user.full_name)

    def save(self, *args, **kwargs):

        if self.full_name == "" or self.full_name is None: 
            self.full_name = self.user.full_name
        
        super(Profile, self).save(*args, **kwargs)