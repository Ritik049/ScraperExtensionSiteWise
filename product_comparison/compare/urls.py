from django.urls import path
from compare import views

urlpatterns = [
    path('', views.index, name='index'),
    path('api/compare', views.compare_prices, name='compare_prices'),
]
