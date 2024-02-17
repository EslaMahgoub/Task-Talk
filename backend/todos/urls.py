from django.urls import path
from . import views


urlpatterns = [
  path('', views.TodoListCreateAPIView.as_view(), name='todo-list'),
  path('<int:pk>/', views.TodoDetailAPIView.as_view(), name="product-detail"),
  path('<int:pk>/delete/', views.TodoDetailAPIView.as_view(), name='todo-delete'),
]
