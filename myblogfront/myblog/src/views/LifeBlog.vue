<template>
  <div class="blog">
    <div class="container">

      <h1 class="main-title"> Life Boom</h1>
      <CardLifeArticle />
      <BetonLayoutPic />
    </div>
  </div>
</template>

<script setup lang="ts">

import BetonLayoutPic from '@/components/BetonLayoutPic.vue'
import CardLifeArticle from '@/components/CardLifeArticle.vue'
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
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

.main-title {
  font-size: 2.5rem;
  font-weight: lighter;
  font-family: 'Pacifico', cursive;
  color: transparent;
  margin-bottom: 20px;
  animation: gradient-animation 20s ease infinite;
  -webkit-background-clip: text;
  background-clip: text;
}

@keyframes gradient-animation {
  0% {
    background-image: linear-gradient(45deg, #ff6f61, #d4a5a5);
  }
  25%{
    background-image: linear-gradient(-45deg, #ffe3f1, #ff9a9a);
  }
  50% {
    background-image: linear-gradient(45deg, #f5389c, rgba(246, 191, 223, 0.89));
  }
  75%{
    background-image: linear-gradient(-45deg, #f3aed7, rgba(245, 56, 156, 0.87));
  }
  100% {
    background-image: linear-gradient(45deg, #f3aed7, rgba(255, 130, 148, 0.88));
  }
}



</style>
