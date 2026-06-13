<template>
  <a :href="link" class="recent-post-item no-underline hover:bg-pink-50 transition">
    <span class="title">{{ title }}</span>
    <span class="date">{{ date }}</span>
  </a>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  date: string
  link: string
}>()
</script>

<style scoped>
.recent-post-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1rem;
  margin-bottom: 1rem;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid #ec4899;

  text-decoration: none;
  -webkit-tap-highlight-color: transparent;
  outline: none;
}

.recent-post-item:focus,
.recent-post-item:active {
  outline: none;
  background-color: transparent !important;
}

.recent-post-item:hover {
  background-color: rgba(255, 227, 241, 0.52);
}



.title {
  font-family: '华文宋体', sans-serif;
  font-size: 1.2rem;
  color: #000000;
  font-weight: bolder;
}

.date {
  font-family: '华文宋体', sans-serif;
  font-size: 0.9rem;
  color: #000000;
  white-space: nowrap;
}
</style>
