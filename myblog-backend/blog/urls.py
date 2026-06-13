from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .views import BlogArticleViewSet, CategoryViewSet, ArticleListView,ArticleDetailView,LifeArticleDetailView,LifeArticleListView
from .views import FriendLinkViewSet
from .auth_views import RegisterView, UserInfoView
from django.urls import path, include

router = DefaultRouter()
router.register(r'category', CategoryViewSet)
router.register(r'articles',BlogArticleViewSet)
router.register(r'friendlinks',FriendLinkViewSet)

urlpatterns = [
    path('',include(router.urls)),
    path('articlelist/',ArticleListView.as_view(),name='article-list'),
    path('articles/<int:pk>/', ArticleDetailView.as_view(), name='article-detail'),
    path('lifearticleslist/',LifeArticleListView.as_view(),name='lifearticle-list'),
    path('lifearticles/<int:pk>/',LifeArticleDetailView.as_view(),name='lifearticle-detail'),
    path('auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/register/', RegisterView.as_view(), name='register'),
    path('auth/user/', UserInfoView.as_view(), name='user_info'),
]