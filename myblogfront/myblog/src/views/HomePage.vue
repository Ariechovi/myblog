<template>
  <div class="page-wrapper">

    <section class="hero-section">
      <main class="main-container">

        <div class="horizontal-line">
          <div class="text-line left">
            THIS&nbsp;&nbsp;&nbsp;<span class="highlight fade-in">BLOG</span>
          </div>
          <div class="img">
            <img class="top" src="@/assets/images/blogtwo.jpg" alt="装饰">
          </div>
        </div>

        <div class="text-line right">
          THIS&nbsp;&nbsp;&nbsp;<span class="highlight fade-in">ME</span>
        </div>

        <div class="horizontal-line">
          <div class="text-line left">
            THIS&nbsp;&nbsp;&nbsp;<span class="highlight fade-in">BEAT</span>
          </div>
          <div class="img">
            <img class="bottom" src="@/assets/images/blogtwo.jpg" alt="装饰">
          </div>
        </div>

      </main>
    </section>

    <section class="after-hero">

      <div class="main-container after-hero-layout">

        <div class="title">
          <a href="/tech" class="text-link">
            <h1 class="text">
              &nbsp;📝What’s New
            </h1>
          </a>
        </div>

        <div class="title">
          <RecentPost
            v-for="(item, index) in articles"
            :key="index"
            :title="item.title"
            :date="item.date"
            :link="item.link"
          />
        </div>


        <BentonLayout />

      </div>

    </section>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap");
@import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');

.hero-section {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-top: 5px;
  background-color: #ffffff;
}

.main-container {
  display: flex;
  flex-direction: column;
  justify-content:flex-start;
  min-height: 100vh;
  padding: 5px 40px;
  margin-left:20px;
  margin-right:20px;
}

.horizontal-line {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 25px;
}

.text-line {
  font-family: "Bebas Neue", sans-serif;
  font-size: 12rem;
  font-weight: bolder;
  line-height: 1;
  letter-spacing: 0.3rem;
  color: rgba(255, 130, 148, 0.74);
  mix-blend-mode: multiply;
}

.text-line .highlight {
  color: #f5389c;
  font-size: 14rem;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
}

.left {
  align-self: flex-start;
}

.right {
  align-self: flex-end;
}
.fade-in {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 1.2s ease-out forwards;
}

.fade-in:nth-child(1) {
  animation-delay: 0.2s;
}
.fade-in:nth-child(2) {
  animation-delay: 1s;
}
.fade-in:nth-child(3) {
  animation-delay: 1.8s;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.img {
  flex-shrink: 0;

}

.top{
  width:400px;
  height:180px;
  object-fit:cover;
  object-position: top center;
  border-radius: 30px;
}

.bottom{
  width:400px;
  height:180px;
  object-fit:cover;
  object-position: bottom center;
  border-radius: 30px;
}

.after-hero {
  min-height: 100vh;
}
.after-hero-layout {
  width: 100%;
  max-width: 60%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

@media (max-width: 768px) {
  .after-hero-layout {
    max-width: 90%;
  }
}
.title {
  width: 100%;
}

.text{
  font-family: 'Pacifico', cursive;
  font-size: 2rem;
  font-weight: bolder;
  background-color: #ffddc8;
  text-shadow: 2px 2px 8px rgb(255, 255, 255);
  border-radius: 30px;
  transition: all 0.3s ease;
}
.text:hover {
  background: linear-gradient(to right, rgba(255, 207, 128, 0.73), rgba(253, 204, 233, 0.55));
  transform: scale(1.1);
  box-shadow: 4px 4px 15px rgba(0, 0, 0, 0.3);
}
</style>


<script setup lang="ts">
import { ref, onMounted } from 'vue'
import RecentPost from '@/components/RecentPost.vue'
import BentonLayout from '@/components/BentonLayout.vue'
import { getArticleList } from '@/api/CreArticle'

const articles = ref<{ title: string; date: string; link: string }[]>([])

onMounted(async () => {
  try {
    const response = await getArticleList()
    articles.value = response.data.slice(0, 3).map((item: { id: number; title: string; date_published: string }) => ({
      title: item.title,
      date: item.date_published.slice(0, 10),
      link: `/articles/${item.id}`
    }))
  } catch (error) {
    console.error('Failed to fetch recent articles:', error)
  }
})
</script>
