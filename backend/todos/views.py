from rest_framework import generics, permissions
from .models import Todo
from .serializers import TodoSerializer

class TodoListCreateAPIView(generics.ListCreateAPIView):
  queryset = Todo.objects.all()
  permission_classes = [permissions.IsAuthenticatedOrReadOnly]
  serializer_class = TodoSerializer
  
  def get_queryset(self, *args, **kwargs):
    if self.request.user and self.request.user.is_authenticated:
      user = self.request.user
      todos = Todo.objects.filter(user=user)
    else: 
      todos = Todo.objects.none()
    return todos


class TodoDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
  queryset = Todo.objects.all()
  permission_classes = [permissions.IsAuthenticated]
  serializer_class = TodoSerializer
  lookup_field = 'pk'

  def get_object(self): 
    return self.get_queryset().get(user=self.request.user, pk=self.kwargs[self.lookup_field])
