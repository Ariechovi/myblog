<template>
  <div class="friend-links">
    <div class="links-container">
      <a
        v-for="friend in friends"
        :key="friend.id"
        :href="friend.url"
        class="friend-card"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div class="top-section">
          <img :src="friend.avatar" alt="avatar" class="avatar" />
          <div class="info">
            <h2 class="name">{{ friend.name }}</h2>
            <p class="site-description">{{ friend.description }}</p>
            <p v-if="friend.my_description" class="personal-comment">{{ friend.my_description }}</p>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getFriendLinks } from '@/api/friendlinks.ts'

interface FriendLink {
  id: number
  name: string
  url: string
  avatar: string
  description: string
  my_description: string;
}

const friends = ref<FriendLink[]>([])

const fetchFriends = async () => {
  try {
    const response = await getFriendLinks()
    friends.value = response.data
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  fetchFriends()
})
</script>

<style scoped>
.friend-links {
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 20px;
}

.links-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  justify-content: center;
}

.friend-card {
  display: flex;
  background: #ffffff;
  border: 2px solid #f3aed7;
  border-radius: 10px;
  padding: 16px;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s;
}

.friend-card:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transform: translateY(-3px);
}

.top-section {
  display: flex;
  align-items: center;
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 16px;
}

.info {
  flex: 1;
}

.name {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 4px;
}

.site-description {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 4px;
}

.personal-comment {
  font-size: 0.85rem;
  color: #888;
}

@media (min-width: 1200px) {
  .links-container {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .links-container {
    grid-template-columns: 1fr;
  }
}
</style>
