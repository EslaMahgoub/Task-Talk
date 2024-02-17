from django.db import models
from django.conf import settings

User = settings.AUTH_USER_MODEL

class Todo(models.Model):
  user = models.ForeignKey(User,  related_name="todos", on_delete=models.CASCADE)
  title = models.CharField(max_length=255)
  description = models.TextField(null=True, blank=True)
  is_completed = models.BooleanField(default=False)
  created_at = models.DateTimeField(auto_now_add=True)

  def __str__(self):
    return self.title[:25]
  