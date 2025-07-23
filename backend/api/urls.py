from django.urls import path

from userauths import views as userauths_views
from store import views as store_views

from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('usr/token/', userauths_views.MyTokenObtainPairView.as_view()),
    path('usr/token/refresh/', TokenRefreshView.as_view()),
    path('usr/register/', userauths_views.RegisterView.as_view()),
]