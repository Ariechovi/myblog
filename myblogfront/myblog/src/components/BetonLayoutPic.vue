<script setup lang="ts">
import BoxOne from '@/components/BentoUI/BoxOne.vue'
import BoxThree from '@/components/BentoUI/BoxThree.vue'
import BoxFour from '@/components/BentoUI/BoxFour.vue'
import BoxTwo from '@/components/BentoUI/BoxTwo.vue'

</script>

<template>
  <div class="layout">
    <div class="container">

      <a href="https://music.163.com/#/song?id=2677400220" target="_blank" class="link-1">
        <BoxOne class="item-1"/>
      </a>

      <a href="https://music.163.com/#/song?id=2124955474" target="_blank" class="link-2">
        <BoxThree class="item-2"/>
      </a>

      <a href="https://music.163.com/#/song?id=2676001035" target="_blank" class="link-3">
        <BoxFour class="item-3"/>
      </a>

      <a href="https://music.163.com/#/song?id=2628630026" target="_blank" class="link-4">
        <BoxFour class="item-4"/>
      </a>

      <a href="https://music.163.com/#/song?id=1980392121" target="_blank" class="link-5">
        <BoxTwo class="item-5"/>
      </a>

      <a href="https://music.163.com/#/song?id=2155975891" target="_blank" class="link-6">
        <BoxOne class="item-6"/>
      </a>

      <a href="https://music.163.com/#/song?id=2026224200" target="_blank" class="link-7">
        <BoxThree class="item-7"/>
      </a>

      <a href="https://music.163.com/#/song?id=2659382255" target="_blank" class="link-8">
        <BoxTwo class="item-8"/>
      </a>

      <a href="https://music.163.com/#/song?id=2637675448" target="_blank" class="link-9">
        <BoxThree class="item-9"/>
      </a>

      <a href="https://music.163.com/#/song?id=1442320451" target="_blank" class="link-10">
        <BoxTwo class="item-10"/>
      </a>
    </div>
  </div>
</template>

<style scoped>
.layout{
  width:100%;
  display: flex;
  padding-top: 50px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.container{
  display:grid;
  grid-template-columns:repeat(4,180px);
  grid-template-rows: repeat(6,180px);
  gap:12px;
  height:auto;
  overflow: visible;
}

.item-1 {
  grid-row: 1/2;
  grid-column: 1/2;
  background-image: url('@/assets/images/pic10.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.link-1{
  grid-row: 1/2;
  grid-column: 1/2;
  background: none;
  outline: none;
}
.item-2 {
  grid-row: 1/2;
  grid-column: 2/4;
  background-image: url('@/assets/images/pic11.jpg');
  background-size: cover;
  background-position: center 33% ;
  background-repeat: no-repeat;
}
.link-2 {
  grid-row: 1/2;
  grid-column: 2/4;
  background: none;
  outline: none;
}
.item-3 {
  grid-row: 1/2;
  grid-column: 4;
  background-image: url('@/assets/images/pic8.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.link-3{
  grid-row: 1/2;
  grid-column: 4;
  background: none;
  outline: none;
}
.item-4 {
  grid-row: 2/4;
  grid-column: 1/2;
  background-image: url('@/assets/images/pic3.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.link-4{
  grid-row: 2/4;
  grid-column: 1/2;
  background: none;
  outline: none;
}
.item-5 {
  grid-row: 2/4;
  grid-column: 2/4;
  background-image: url('@/assets/images/pic.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.link-5{
  grid-row: 2/4;
  grid-column: 2/4;
  background: none;
  outline: none;
}
.item-6 {
  grid-row: 3/4;
  grid-column: 4/4;
  background-image: url('@/assets/images/pic2.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.link-6{
  grid-row: 3/4;
  grid-column: 4/4;
  background: none;
  outline: none;
}

.item-7 {
  grid-row: 4/5;
  grid-column: 3/4;
  background-image: url('@/assets/images/pic9.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.link-7{
  grid-row: 4/5;
  grid-column: 3/4;
  background: none;
  outline: none;
}

.item-8 {
  grid-row: 5/7;
  grid-column: 3/5;
  background-image: url('@/assets/images/blogtwo.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.link-8{
  grid-row: 5/7;
  grid-column: 3/5;
  background: none;
  outline: none;
}
.item-9 {
  grid-row: 6/7;
  grid-column: 1/3;
  background-image: url('@/assets/images/pic5.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.link-9{
  grid-row: 6/7;
  grid-column: 1/3;
  background: none;
  outline: none;
}

.item-10 {
  grid-row: 4/6;
  grid-column: 1/3;
  background-image: url('@/assets/images/pic12.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.link-10{
  grid-row: 4/6;
  grid-column: 1/3;
  background: none;
  outline: none;
}

</style>
