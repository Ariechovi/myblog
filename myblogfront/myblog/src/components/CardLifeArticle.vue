<template>
  <div class="article-list">
    <a
      v-for="article in articles"
      :key="article.id"
      :href="`/articles/${article.id}`"
      class="article-card"
    >
      <h2 class="article-title">📝 {{ article.title }}</h2>
      <div class="article-tags">
        <span class="tag">📌#{{ article.category }}</span>
      </div>
      <p class="article-date">📅  {{ formatDate(article.date_published) }}</p>
    </a>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getLifeArticleList } from '@/api/CreArticle';


interface Article {
  id: number;
  title: string;
  category: string[];
  date_published: string;
}

const articles =ref<Article[]>([]);

const fetchArticles = async () => {
  try {
    const response = await getLifeArticleList();
    articles.value = response.data;
  } catch (error) {
    console.error("Error fetching articles:", error);
  }
};
onMounted(() => {
  fetchArticles();
});

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

</script>

<style scoped>
.article-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-bottom: 60px;
}

.article-card {
  display: block;
  padding: 20px;
  border: 3px solid #f4c8d6;
  border-radius: 20px;
  text-decoration: none;
  background-color: #fff;
  transition: box-shadow 0.3s ease, transform 0.2s ease;
}

.article-card:hover {
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

.article-title {
  font-size: 1.4rem;
  font-weight: bold;
  font-family: "华文宋体", "Microsoft YaHei",sans-serif;
  margin-bottom: 8px;
  color: #000;
}

.article-tags {
  margin-bottom: 10px;
}

.tag {
  display: inline-block;
  background-color: rgba(255, 227, 241, 0.52);
  color: #333;
  font-size: 0.9rem;
  padding: 2px 8px;
  margin-right: 8px;
  border-radius: 8px;
}

.article-date {
  font-size: 1.1rem;
  color: #888;
  font-family:"华文宋体", "Microsoft YaHei",sans-serif ;
}
</style>
