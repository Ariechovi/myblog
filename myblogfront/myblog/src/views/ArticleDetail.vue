<template>
  <div class="blog">
    <div class="container">
      <ArticleContent :articles="articles" />
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref,onMounted} from 'vue'
import {getArticleDetail} from '@/api/CreArticle'
import ArticleContent from '@/components/ArticleContent.vue'

interface Article {
  title: string;
  date_published: string;
  content: string;
  category: string[];
}

const articles = ref<Article>({
  title: '',
  date_published: '',
  content: '',
  category: []
});


const fetchArticleDetails = async (id :number | string) => {
  try {
    const response = await getArticleDetail(id)
    console.log(response)
    articles.value = response.data;
  }catch(error){
    console.log(error)
  }
};

onMounted(() => {
  const articleId = parseInt(window.location.pathname.split('/').pop() || '', 10);  // 从URL获取 id
  fetchArticleDetails(articleId);
});

</script>

<style scoped>

.blog {
  width: 100%;
  min-height: 100vh;
  background-color: white;
  display: block;
  padding-top: 80px;
}

.container {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  background-color: white;
  padding: 0 40px;
  border-radius: 20px;

}

@media (max-width: 768px) {
  .container {
    padding: 0 20px;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 10px;
  }
}

</style>
