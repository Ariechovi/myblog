<script setup lang="ts">

</script>

<template>
  <div class="brand">Ariechovi</div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
.brand {
  font-family: 'Pacifico', cursive;
  font-size: 1.6rem;
  font-weight: bold;
  color: #ec4899;
  text-shadow: 2px 2px 6px rgba(236, 72, 153, 0.1);
  transition: transform 0.3s;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }
}
</style>
