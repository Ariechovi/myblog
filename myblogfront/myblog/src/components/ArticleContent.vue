<template>
  <div class="article-content">

    <h1>{{ articles.title }}</h1>

    <hr class="divider" />

    <div class="markdown-body container" v-html="contentHtml"></div>
    <div class="categories">
      <p><strong>Categories:</strong></p>
      <ul>
        <li v-for="(category, index) in articles.category" :key="index">{{ category }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue';
import { marked } from 'marked';
import 'github-markdown-css/github-markdown.css';

const props = defineProps<{
  articles: {
    title: string;
    date_published: string;
    content: string;
    category: string[];
  };
}>();

const contentHtml = computed(() => {
  return marked(props.articles.content);
});
</script>

<style scoped>


h1 {
  font-size: 3rem;
  font-family: '华文中宋',sans-serif;
  text-align: center;
  text-decoration: underline;
  text-decoration-style: wavy;
  text-decoration-color: rgb(255, 255, 255);
}
.divider{
  height:3px;
  margin-top: 20px;
  margin-bottom: 70px;
  color:#888888;
}

p {
  font-size: 1rem;
  color: #555;
}
.categories {
  margin-top: 20px;
}

.markdown-body {
  font-family: 'Georgia', serif;
  line-height: 1.7;
  font-size: 17px;
}

:deep(.markdown-body h1){
  font-family: 'Georgia', serif;
  font-weight: bold;
  color: rgba(245, 56, 156, 0.73);
}
:deep(.markdown-body h2){
  font-family: 'Georgia', serif;
  font-weight: bold;
  color: rgba(245, 56, 156, 0.73);
}
:deep(.markdown-body h3){
  font-family: 'Georgia', serif;
  font-weight: bold;
  color: rgba(245, 56, 156, 0.73);
}
:deep(.markdown-body ul){
  list-style-type:disc;
  margin-left:1px;
}
:deep(.markdown-body ol){
  list-style-type: decimal;
  margin-left:1px;
}
:deep(.markdown-body ul li::marker){
  font-size: 1.2rem;
}
:deep(.markdown-body ol li::marker){
  font-size: 18px;
}
</style>
