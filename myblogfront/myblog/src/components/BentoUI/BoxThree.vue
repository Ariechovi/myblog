<template>
  <div class="BoxThree">
    <slot />
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.BoxThree {
  width: 360px;
  height: 180px;
  border-radius: 2rem;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.15); /* 半透明白色 */
  backdrop-filter: blur(10px); /* ✅ 背景模糊效果 */
  -webkit-backdrop-filter: blur(10px); /* ✅ 兼容性处理 */

  /* 视觉美化 */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.BoxThree:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  transform: scale(1.03);
}
</style>
