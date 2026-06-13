<template>
  <div :class="['nav-wrapper', { 'nav-floating': scrolled }]">
    <nav class="nav-bar">
      <ul class="nav-list">

        <li>
          <router-link to="/home" class="nav-item">
            <span class="icon-text">
              <LucideHome class="w-4 h-4 " />首页
            </span>
          </router-link>
        </li>

        <li>
          <router-link to="/tech" class="nav-item">
            <span class="icon-text">
              <LucideNotebookPen class="w-4 h-4 " />博客
            </span>
          </router-link>
        </li>

        <!-- 友链隐藏，代码保留
        <li>
          <router-link to="/friends" class="nav-item">
            <span class="icon-text">
              <LucidePersonStanding class="w-5 h-5 " />友链
            </span>
          </router-link>
        </li>
        -->

        <li>
          <router-link to="/life" class="nav-item">
            <span class="icon-text">
              <LucideWandSparkles class="w-4 h-4 " />记录
            </span>
          </router-link>
        </li>


        <li>
          <router-link to="/about" class="nav-item">
            <span class="icon-text">
              <LucideBolt class="w-4 h-4 " />关于
            </span>
          </router-link>
        </li>

        <li v-if="authStore.isAdmin">
          <router-link to="/CreateBlog" class="nav-item nav-write">
            <span class="icon-text">
              <LucidePenLine class="w-4 h-4" />写博客
            </span>
          </router-link>
        </li>

        <template v-if="authStore.isLoggedIn">
          <li>
            <span class="nav-item nav-user">
              <span class="icon-text">
                <LucideUser class="w-4 h-4" />{{ authStore.user?.username }}
              </span>
            </span>
          </li>
          <li>
            <a href="#" class="nav-item" @click.prevent="handleLogout">
              <span class="icon-text">
                <LucideLogOut class="w-4 h-4" />退出
              </span>
            </a>
          </li>
        </template>

        <template v-else>
          <li>
            <router-link to="/login" class="nav-item">
              <span class="icon-text">
                <LucideLogIn class="w-4 h-4" />登录
              </span>
            </router-link>
          </li>
        </template>

      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { Home as LucideHome } from 'lucide-vue-next';
import { NotebookPen as LucideNotebookPen } from 'lucide-vue-next';
import { WandSparkles as LucideWandSparkles } from 'lucide-vue-next';
import { Bolt as LucideBolt } from 'lucide-vue-next';
// import { PersonStanding as LucidePersonStanding } from 'lucide-vue-next'; // 友链隐藏
import { PenLine as LucidePenLine } from 'lucide-vue-next';
import { User as LucideUser } from 'lucide-vue-next';
import { LogOut as LucideLogOut } from 'lucide-vue-next';
import { LogIn as LucideLogIn } from 'lucide-vue-next';

const router = useRouter()
const authStore = useAuthStore()

const scrolled = ref(false)

const handleScroll = () => {
  scrolled.value = window.scrollY > 100
}

function handleLogout() {
  authStore.logout()
  router.push('/home')
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  if (authStore.accessToken && !authStore.user) {
    authStore.fetchUser()
  }
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.nav-wrapper {
  position: fixed;
  top: 15px;
  left: 50%;
  transform: translateX(-50%);
  width: fit-content;
  max-width: 1000px;
  background-color: rgba(255, 255, 255, 0.8);
  border: #ec4899 1px solid;
  border-radius: 16px;
  transition: all 0.3s ease;
  z-index: 999;
  padding: 4px 16px;
}


.nav-bar {
  display: flex;
  justify-content: center;
  align-items: center;

}

.nav-list {
  display: flex;
  gap: 10px;
  padding: 0;
  margin: 0;
  list-style: none;
  white-space: nowrap;
}

.nav-item {
  display: flex;
  align-items: center;
  font-family: '华文宋体', sans-serif;
  font-weight:bolder;
  font-size: 16px;
  padding: 2px 10px;
  color: #000000;
  text-decoration: none;
  border-radius: 10px;
  transition: all 0.3s ease;
}

.nav-item:hover {
  background-color: #ffe3f1;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  color: rgba(251, 113, 133, 0.79);
}

.icon-text {
  display: flex;
  align-items: center;
  gap: 4px;
}

</style>
