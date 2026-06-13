<template>
  <div class="list">
    <a
      v-for="article in articles"
      :key="article.id"
      :href="`/articles/${article.id}`"
      class="card"
    >
      <div class="a">
        <div class="left">
          <h2 class="title">{{ article.title }}</h2>

          <div class="excerpt">{{article.excerpt}}</div>

          <div class="date"><CalendarDays class="w-5 h-5"/> {{ formatDate(article.date_published) }}</div>

        </div>

        <div class="right"><ChevronsRight class="w-6 h-6" /></div>
      </div>
    </a>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getArticleList } from '@/api/CreArticle';
import { CalendarDays } from 'lucide-vue-next';
import { ChevronsRight } from 'lucide-vue-next';
interface Article {
  id: number;
  title: string;
  excerpt:string,
  date_published: string;
}

const articles =ref<Article[]>([]);

const fetchArticles = async () => {
  try {
    const response = await getArticleList();
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
.list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-bottom: 60px;
}

.card {
  display: block;
  padding: 20px;
  border: 2px solid rgba(246, 191, 223, 0.89);
  border-radius: 20px;
  text-decoration: none;
  background-color: #fff;
  transition: box-shadow 0.3s ease, transform 0.2s ease;
}

.card:hover {
  box-shadow:
              inset 0 0 10px rgba(245, 56, 156, 0.87);
  transform: translateY(-2px);

}
.a{
  display:flex;
}
.left{
  display: flex;
  flex-direction: column;
}
.right {
  position: absolute;
  right: 0;
  top:50%;
  transform: translateY(-50%);
  background: linear-gradient(45deg, #f66da1, #f39cbb);
  padding:10px 10px;
  border-radius: 20px;
  color: white;
  border: none;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.1s ease, right 0.4s ease;
}
.card:hover .right {
  right: 30px;
  opacity: 1;
}
.title {
  font-size: 1.4rem;
  font-weight: bold;
  font-family: "Source Han Serif SC", serif;
  margin-bottom: 8px;
  color: #f5389c;
}
.excerpt{
  font-size: 14px;
  color: #888888;
  margin-bottom: 5px;
}
.date {
  display: flex;
  font-size: 1.1rem;
  color: #000000;
  font-family:"华文宋体", "Microsoft YaHei",sans-serif ;
}

</style>
