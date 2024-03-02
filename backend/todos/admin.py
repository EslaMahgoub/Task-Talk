from django.contrib import admin
from .models import Todo



class TodoAdmin(admin.ModelAdmin):
  list_editable = ['is_completed']
  list_display = ['user', 'title', 'is_completed', 'created_at']

admin.site.register(Todo, TodoAdmin)