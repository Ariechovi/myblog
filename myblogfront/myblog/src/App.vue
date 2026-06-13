<template>
  <div id="app">
    <div class="bg-wrapper">
      <header>
      <MyLogo class="logo" />
      <MainNavigator />
      </header>
      <router-view class="content-wrapper" />
    </div>
  </div>
</template>

<script setup lang="ts">
import MainNavigator from '@/components/MainNavigator.vue'
import MyLogo from '@/components/MyLogo.vue'
</script>

<style>
#app {
  min-height: 100vh;
  width: 100%;
  background: white ;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
}
.bg-wrapper {
  flex: 1;
  width: 100%;
  background-color: #ffffff;
}

.logo {
  position: absolute;
  left: 40px;
  top: 15px;
  width: 120px;
}

.content-wrapper {
  padding-top: 80px;
  width: 100%;
}
@media (max-width: 768px) {
  .logo {
    left: 20px;
    top: 10px;
    width: 80px;
  }
  .bg-wrapper {
    padding: 0 20px;
  }

  .content-wrapper {
    padding-top: 60px;
  }
}

@media (max-width: 480px) {
  .logo {
    width: 60px;
    top: 8px;
    left: 10px;
  }

  .bg-wrapper {
    padding: 0 10px;
  }

  .content-wrapper {
    padding-top: 50px;
  }
}
</style>
