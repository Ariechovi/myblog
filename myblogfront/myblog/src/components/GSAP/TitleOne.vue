<script setup lang="ts">
import { gsap } from 'gsap';
import { onMounted } from 'vue';

const t1 = gsap.timeline(); // 创建时间线

onMounted(() => {
  t1.to(".a", { duration: 1, x: 200 }) // 第一个动画：.a 移动
    .to(".gsap-wave span", { duration: 0.8 }) // 第二个动画：.gsap-wave span 动画
    .to(".a", {  ease: "power2.out", color: "#f5389c" }) // 第三个动画：.a 旋转，变色
    .fromTo(".gsap-wave span", {
      y: -50,
      opacity: 0,
    }, {
      y: 0,
      opacity: 1,
      stagger: 0.1,
      yoyo: true,
      ease: "bounce.out",
    }); // 最后一个动画：.gsap-wave span 上下跳动
});
</script>

<template>
  <div class="a">This</div>
  <h1 class="gsap-wave">
    <span>W</span>
    <span>a</span>
    <span>v</span>
    <span>e</span>
    <span> </span>
    <span>w</span>
    <span>i</span>
    <span>t</span>
    <span>h</span>
    <span> </span>
    <span>G</span>
    <span>S</span>
    <span>A</span>
    <span>P</span>
    <span>!</span>
  </h1>


</template>

<style scoped>
.a {
  font-size: 50px;
}

.gsap-wave span {
  display: inline-block;
  font-size: 3rem;
  font-weight: bold;
  color: #f5389c;
}
</style>
