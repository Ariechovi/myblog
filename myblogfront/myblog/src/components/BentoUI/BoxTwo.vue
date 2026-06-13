<template>
  <div class="BoxTwo">
    <slot />
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.BoxTwo {
  width: 360px;
  height: 360px;
  border-radius: 2rem;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

}
.BoxTwo:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  transform: scale(1.03);
}
</style>
