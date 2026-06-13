from rest_framework import viewsets, generics, permissions
from .models import BlogArticle, FriendLink, Category
from .serializer import CategorySerializer
from .serializer import BlogArticleSerializer
from .serializer import ArticleListSerializer
from .serializer import FriendLinkSerializer
from .serializer import ArticleDetailSerializer
from .permissions import IsAdminUserOrReadOnly

class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class BlogArticleViewSet(viewsets.ModelViewSet):
    queryset = BlogArticle.objects.all()
    serializer_class = BlogArticleSerializer
    permission_classes = [IsAdminUserOrReadOnly]

class FriendLinkViewSet(viewsets.ModelViewSet):
    queryset = FriendLink.objects.all()
    serializer_class = FriendLinkSerializer
    permission_classes = [IsAdminUserOrReadOnly]

class ArticleDetailView(generics.RetrieveAPIView):
    queryset = BlogArticle.objects.all()
    serializer_class = ArticleDetailSerializer

class ArticleListView(generics.ListAPIView):
    serializer_class = ArticleListSerializer
    def get_queryset(self):
        return BlogArticle.objects.filter(category__is_tech=True)

class LifeArticleDetailView(generics.RetrieveAPIView):
    queryset = BlogArticle.objects.filter(category__is_tech=False)
    serializer_class = ArticleDetailSerializer

class LifeArticleListView(generics.ListAPIView):
    serializer_class = ArticleListSerializer
    def get_queryset(self):
        return BlogArticle.objects.filter(category__is_tech=False)



