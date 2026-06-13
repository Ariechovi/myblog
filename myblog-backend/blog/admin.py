from django.contrib import admin
from .models import Category,BlogArticle, FriendLink

admin.site.register(Category)
admin.site.register(BlogArticle)
admin.site.register(FriendLink)
