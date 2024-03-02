from rest_framework import serializers
from .models import Todo


class TodoSerializer(serializers.ModelSerializer):
  class Meta:
    model = Todo
    fields = [
      'id',
      'user',
      'title',
      'description',
      'is_completed',
      'created_at',
    ]