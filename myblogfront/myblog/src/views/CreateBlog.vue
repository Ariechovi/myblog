<script setup lang="ts">
import { onMounted, ref } from 'vue'
import ToastEditor from '@/components/ToastEditor.vue'
import { createArticle } from '@/api/CreArticle'
import {getCategory} from '@/api/category'

const editorRef = ref()
const title = ref('')
const category = ref<string | number>('')
const categories = ref<{ id: number; name: string }[]>([])


onMounted(async () => {
  try {
    const response = await getCategory()
    categories.value = response || []
  } catch (error) {
    alert("无法加载分类数据")
    console.log(error)
  }
})

const handlePublish = async () => {
  const content = editorRef.value.getMarkdown()
  console.log(content)

  if (!title.value.trim() || !content.trim() || !category.value) {
    alert('标题、内容、分类都不能为空')
    return
  }

  try {
    await createArticle({
      title: title.value,
      content: content,
      category: category.value,
    })
    alert('发布成功')

    title.value = ''
    category.value = ''
    editorRef.value.setMarkdown('')
  } catch (error) {
    console.error('发布失败', error)
  }
}
</script>

<template>
  <div class="main-container">
    <h1 class="input">🪄发布新文章</h1>
    <input
      v-model="title"
      type="text"
      placeholder="请输入文章标题"
      class="w-1/2 border p-2 rounded mb-4"
    />

    <select v-model="category" class="w-1/2 border p-2 rounded mb-4">
      <option value="">请选择分类</option>
      <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
    </select>


    <ToastEditor ref="editorRef" />
    <button
      @click="handlePublish"
      class="mt-4 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded"
    >
      发布
    </button>
  </div>
</template>

<style scoped>
.main-container{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width:100%;
}
.input{
  font-family: '华文宋体', sans-serif;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-top:20px;
  margin-bottom: 10px;
  color: #ec4899;
}
</style>
