from django.urls import path
from . import views

urlpatterns = [
    path('',views.results,name='results'),
    path('switch',views.switch_page,name="switch_page"),
]
