from django.contrib import admin
from userauths.models import User, Profile

class UserAdmin(admin.ModelAdmin):
    list_display = ['full_name', 'email', 'phone']

class ProfileAdmin(admin.ModelAdmin):
    list_display = ['full_name', 'gender', 'country']
    list_editable = [ 'gender', 'country']

    search_fields = ['full_name', 'date'] 
    list_filter = ['date']

# Register your models here.

# Esto es importante
# si solo lo dejamos de esta manera"
# admin.site.register(User)
# Ciertamente mostrará en el admin la vista de User por defecto, pero al crear una clase personalizada la cambiamos (línea de abajo)
admin.site.register(User, UserAdmin)
admin.site.register(Profile, ProfileAdmin)
