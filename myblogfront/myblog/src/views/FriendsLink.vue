<template>
  <div class="blog">
    <div class="container">
      <h1 class="main-title"> 🤩 Meet My Friends</h1>
      <h2 class="sub-title">----------------“ Discovering Tiny Universes ”</h2>
      <hr class="divider" />
      <FriendLink />



    </div>
  </div>
</template>

<script setup lang="ts">

import FriendLink from '@/components/FriendLink.vue'
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
  max-width: 1200px;
  margin: 0 auto;
  background-color: white;
  padding: 0 40px;
  border-radius: 20px;

}

.main-title {
  font-size: 2.5rem;
  font-weight: bolder;
  font-family: 'Merriweather', serif;
  color: rgb(0, 0, 0);
  margin-bottom: 20px;
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
  font-weight: bolder;
  font-family: 'Merriweather', serif;
  color: #000000;
  margin-bottom: 20px;
}
.sub-title {
  font-size: 1.1rem;
  font-weight: 400;
  font-family: 'Merriweather', serif;
  color: #555;
  margin-bottom: 30px;
  letter-spacing: 1px;
}
</style>
