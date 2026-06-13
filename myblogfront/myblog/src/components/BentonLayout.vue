<script setup lang="ts">
import BoxOne from '@/components/BentoUI/BoxOne.vue'
import BoxThree from '@/components/BentoUI/BoxThree.vue'
import BoxFour from '@/components/BentoUI/BoxFour.vue'
import BoxTwo from '@/components/BentoUI/BoxTwo.vue'
import MyLogo from '@/components/MyLogo.vue'
import { GlobeLock as LucideGlobeLock } from 'lucide-vue-next';
import { ArrowBigRight as LucideArrowBigRight } from 'lucide-vue-next';
import { CircleArrowRight as LucideCircleArrowRigh } from 'lucide-vue-next';
import { useRouter } from 'vue-router';
const router = useRouter()

const goToPage = () => {
  router.push('/about')
}
</script>

<template>
  <div class="layout">
    <div class="container">

      <BoxOne class="item-1">
        <MyLogo />
        </BoxOne>

      <BoxThree class="item-2">
        <span class="school">
          🏫HNUST
          <span class="school-icon">
            <a href="https://www.hnust.edu.cn/" target="_blank">
            <LucideArrowBigRight  class="school-icon"/>
            </a>
          </span>
        </span>
      </BoxThree>

      <BoxFour class="item-3">
        <div class="major">
          <span class="icon">🌐</span>
          <span class="icon">🔒</span>
          <span class="major-title"><LucideGlobeLock  class="lock"/>信息安全</span>
          <span class="major-title-el">Information Security</span>
        </div>
      </BoxFour>

      <BoxFour class="item-4" >
        <span class="home">湖南</span>
        <span class="home-el">Hunan province</span>
        <span class="home-icon">🌄🏞️🌳🍚🌶️🍲🍢🎉🎤🎭🌤️🤩</span>
      </BoxFour>

      <BoxTwo class="item-5">
      </BoxTwo>

      <BoxOne class="item-6" >
        <span class="mbti">ENFP</span>
        <a href="https://www.16personalities.com/tw/enfp-%E6%80%A7%E6%A0%BC" target="_blank" class="a">
          <LucideCircleArrowRigh class="arrow" />
        </a>
      </BoxOne>

      <BoxThree class="item-7">
        <div class="love-1">
          <span class="love-title-el">🎧Hip-hop lover</span>
          <span class="love-slogan">"bow down to the KeyNG"🔥&🎫</span>
          <span class="love-slogan">"capper made in the future"🥀&⚔️</span>
        </div>
      </BoxThree>
      <BoxThree class="item-8" >
        <div class="love-2">
          <span class="sentence">"Just Pursue What You Want🌷"</span>
          <button class="btn" @click="goToPage">查看更多</button>
        </div>
      </BoxThree>
      <BoxTwo class="item-9" />

    </div>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Alfa+Slab+One&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Cal+Sans&family=Playwrite+AU+SA:wght@100..400&family=Alfa+Slab+One&display=swap");
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
.item-1{
  grid-row:1/2;
  grid-column:1/2;
  background-color: rgba(255, 227, 241, 0.76);
  border:  3px dashed #f5389c;
}
.item-2{
  grid-row:1/2;
  grid-column:2/4;
  position: relative;
  width: 100%;
  height: 100%;
  border:  8px double rgba(98, 94, 94, 0.89);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.school{
  width: 100%;
  height: 100%;
  display: flex;
  margin-top: 15px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 50px;
  font-family: 'Merriweather', serif;
  font-weight: bold;
  color: rgb(0, 0, 0);
  text-shadow: 2px 2px 5px rgba(255, 227, 241, 0.52), -2px -2px 5px rgba(98, 94, 94, 0.48);
  text-decoration: underline;
  text-decoration-style: dotted;
}

.school-icon{
  width:50px;
  height:30px;
  stroke: rgb(0, 0, 0);
  margin-bottom: 5px;
  margin-left:90px;
  text-decoration: underline;
  transition: all 0.3s ease;
}
.school-icon:hover {
  transform: translateY(-2px) scale(1.02);
}

.item-3{
  grid-row:1/2;
  grid-column:4;
  border:3px dashed rgba(249, 178, 52, 0.68);
}

.major{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
.icon{
  font-size: 60px;
  transition: all 0.3s ease;
}
.icon:hover {
  transform: translateY(-5px) scale(1.05);
}
.major-title{
  font-size: 28px;
  text-align: center;
  font-family: '华文中宋',sans-serif;
  font-weight: lighter;
  margin-top: 20px;
  display: flex;
  flex-direction: row;
}

.major-title-el{
  font-size: 13px;
  text-align: center;
  font-family: 'Merriweather', serif;
  font-weight: bolder;
}
.item-4{
  grid-row:2/4;
  grid-column:1/2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 5px dashed rgba(245, 113, 56, 0.87);
}
.home{
  font-size: 50px;
  font-family: '华文中宋',sans-serif;
  font-weight: lighter;
  margin-top: 20px;
}
.home-el{
  font-size: 17px;
  font-family: 'Merriweather', serif;
}
.home-icon{
  margin-top:20px;
  font-size: 30px;
  margin-bottom: 15px;
  margin-left: 10px;
}
.item-5{
  grid-row:2/4;
  grid-column:2/4;
  background-image: url('@/assets/images/blogthree.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.item-6{
  grid-row:3/4;
  grid-column:4/4;
  border:8px ridge #a9fccf;
  background-color: rgba(227, 255, 248, 0.6);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.mbti{
  font-size: 40px;
  font-weight: lighter;
  text-align: center;
  font-family:  "Alfa Slab One", serif;
  color: rgba(17, 255, 0, 0.73);
  text-shadow: 2px 2px 5px rgba(191, 246, 221, 0.89), -2px -2px 5px rgb(255, 255, 255);
  transform: rotateX(10deg) rotateY(10deg);
  text-decoration: underline;
  text-decoration-style: wavy;
  text-decoration-color: rgb(0, 173, 59);
}
.arrow{
  margin-top: 20px;
  margin-left: 80px;
  color: rgba(0, 0, 0, 0.35);
  transition: all 0.5s ease;
}
.arrow:hover {
  transform: translateY(-5px) scale(1.05);
}
.a {
  background: none;
  outline: none;
}

.item-7{
  grid-row:4/5;
  grid-column:3/4;
  border:3px dashed rgba(249, 52, 52, 0.84);
  background-color: rgba(255, 255, 255, 0.64);
}
.love-1{
  display: flex;
  flex-direction:column ;
  justify-content: center;

}

.love-title-el{
  font-size: 38px;
  font-weight: bolder;
  font-family: "Playwrite AU SA", cursive;
  color: rgba(255, 22, 57, 0.97);
}
.love-slogan{
  margin-top: 5px;
  font-size: 18px;
  text-align: center;
  font-family: "Merriweather", serif;
  font-weight: bolder;
}
.item-8{
  grid-row:5/6;
  grid-column:3/4;
  border:3px dashed rgb(195, 199, 248);
}
.love-2{
  display:flex;
  flex-direction:column ;
  justify-content:center
}
.sentence{
  font-size:20px;
  font-family: 'Dialog', serif;
  margin-top:50px;
}
.btn {
  width: 120px;
  height: 45px;
  font-size: 18px;
  background: #e3e5ff;
  border: none;
  border-radius: 50px;
  color: #000;
  outline: none;
  cursor: pointer;
  transition: all 0.4s;
  margin-left:170px;
  margin-top:30px;
  font-weight: lighter;
  font-family:  '华文中宋',sans-serif;
}

.btn:hover {
  box-shadow: inset 0 0 0 4px #ef476f,
  inset 0 0 0 8px #ffd166,
  inset 0 0 0 12px #06d6a0,
  inset 0 0 0 16px #118ab2;
  background: #073b4c;
  color: #fff;
}


.item-9{
  grid-row:4/6;
  grid-column:1/3;
  background-image: url('@/assets/images/blogfour.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
