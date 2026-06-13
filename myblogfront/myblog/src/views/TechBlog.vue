<template>
  <div class="blog">
    <div class="container">

      <h1 class="main-title">📑My Writings</h1>
      <h2 class="sub-title">----------------“ Building knowledge one note at a time. ”</h2>
      <hr class="divider" />

      <CardArticle />

    </div>
  </div>
</template>

<script setup lang="ts">

import CardArticle from '@/components/CardArticle.vue'
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
.main-title {
  font-size: 2.5rem;
  font-weight: bolder;
  font-family: 'Merriweather', serif;
  color: #000000;
  margin-bottom: 20px;
  animation: slideInLeft 1.2s ease-out;
}
.sub-title {
  font-size: 1.1rem;
  font-weight: 400;
  font-family: 'Merriweather', serif;
  color: #555;
  margin-bottom: 30px;
  letter-spacing: 1px;
}
.divider{
  width: 100%;
  height: 1px;
  background-color: #000000;
  margin-top:20px;
  margin-bottom: 40px;
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
@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}


</style>
