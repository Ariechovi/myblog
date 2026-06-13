from rest_framework import serializers
from .models import Category, BlogArticle, FriendLink

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"

class BlogArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogArticle
        fields = '__all__'

class ArticleListSerializer(serializers.ModelSerializer):
    category=serializers.CharField(source='category.name')
    class Meta:
        model = BlogArticle
        fields = ['id','title','category','excerpt','date_published']

class ArticleDetailSerializer(serializers.ModelSerializer):
    category=serializers.CharField(source='category.name')
    class Meta:
        model = BlogArticle
        fields = ['title','date_published','content','category']

class FriendLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = FriendLink
        fields = ['id','name','url','avatar','site_description','my_description']
