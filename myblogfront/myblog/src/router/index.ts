import { createRouter, createWebHistory } from 'vue-router'
import FriendsLink from '@/views/FriendsLink.vue'
import TechBlog from '@/views/TechBlog.vue'
import LifeBlog from '@/views/LifeBlog.vue'
import HomePage from '@/views/HomePage.vue'
import AboutMe from '@/views/AboutMe.vue'
import LoginPage from '@/views/LoginPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',
      redirect:'/home',
    },
    {
      path: '/home',
      name: 'home',
      component: HomePage,
    },
    {
      path:'/tech',
      name:'tech',
      component: TechBlog,
    },
    {
      path:'/life',
      name:'life',
      component:LifeBlog,
    },
    {
      path:'/friends',
      name:'friends',
      component:FriendsLink
    },
    {
      path:'/about',
      name:'about',
      component:AboutMe
    },
    {
      path:'/CreateBlog',
      name:'CreateBlog',
      component: () => import('@/views/CreateBlog.vue'),
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path:'/articles/:id',
      name:'acticledetail',
      component: () => import('@/views/ArticleDetail.vue'),
    },
    {
      path:'/lifeacticles/:id',
      name:'lifeacticledetail',
      component: () => import('@/views/LifeArticleDetail.vue'),
    },
    {
      path:'/login',
      name:'login',
      component: LoginPage,
    },
    {
      path:'/register',
      name:'register',
      component: LoginPage,
    },
    {
      path:'/test-animation',
      name:'test-animation',
      component: () => import('@/views/TestAnimation.vue'),
    },
  ],
})

router.beforeEach(async (to, _from, next) => {
  const { useAuthStore } = await import('@/stores/auth')
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    return next({ name: 'login', query: { redirect: to.fullPath } })
  }

  if (to.meta.requiresAdmin && !authStore.isAdmin) {
    return next({ name: 'home' })
  }

  next()
})

export default router
