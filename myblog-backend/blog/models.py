from django.db import models
from django.utils import timezone
from autoslug import AutoSlugField
from slugify import slugify

def custom_slugify(value):
    return slugify(value, allow_unicode=False)

class Category(models.Model):
    name = models.CharField("分类名", max_length=50, unique=True)
    is_tech = models.BooleanField("技术类", default=True)

    def __str__(self):
        return self.name

class BlogArticle(models.Model):
    objects = models.Manager()
    title=models.CharField("标题",max_length=100)
    content=models.TextField("内容")
    excerpt=models.TextField("摘要",blank=True,null=True)
    slug=AutoSlugField(
        "URL别名",
        populate_from="title",
        unique=True,
        slugify=custom_slugify
    )
    date_published=models.DateTimeField("发布日期",default=timezone.now)
    date_updated=models.DateTimeField("最后更新时间",auto_now=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, verbose_name="分类",default=1)

    class Meta:
        ordering=["-date_published"]

    def __str__(self):
        return self.title


class FriendLink(models.Model):
    objects = models.Manager()
    avatar=models.URLField("头像链接",blank=True,null=True)
    name=models.CharField("昵称",max_length=100)
    url=models.URLField("链接地址")
    site_description=models.TextField("站点描述",blank=True,null=True)
    my_description=models.TextField("我的介绍",blank=True,null=True)
    is_active=models.BooleanField(default=True)
    created_time=models.DateTimeField("添加时间",auto_now_add=True)

    def __str__(self):
        return self.name
