<template>
  <div class="quote-container">
    <!-- part1 单词分开，每个字母独立 -->
    <div class="part1">
      <span
        v-for="(word, i) in part1Words"
        :key="'p1-word-' + i"
        class="word"
      >
        <span
          v-for="(char, j) in word.split('')"
          :key="'p1-letter-' + j"
          class="letter"
        >
          {{ char }}
        </span>
      </span>
    </div>

    <!-- part2 单词分开，每个字母独立 -->
    <div class="part2 mt-4">
      <span
        v-for="(word, i) in part2Words"
        :key="'p2-word-' + i"
        class="word"
      >
        <span
          v-for="(char, j) in word.split('')"
          :key="'p2-letter-' + j"
          class="letter"
        >
          {{ char }}
        </span>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { gsap } from 'gsap'

// 句子的两个部分
const part1 = '“Just   Pursue'
const part2 = '                    what   you   want”'

// 将每个部分分割成单词数组
const part1Words = part1.split(' ')
const part2Words = part2.split(' ')

onMounted(() => {
  // part1 动画：每个字母逐个出现
  gsap.fromTo(
    '.part1 .letter',
    { opacity: 0, y: -20 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'back.out(1.7)',
    }
  )

  // part2 动画：每个字母逐个出现
  gsap.fromTo(
    '.part2 .letter',
    { opacity: 0, y: -20 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'back.out(1.7)',
      delay: 1,
    }
  )

  // 给每个字母添加一个轻微跳动的循环动画
  setTimeout(() => {
    const letters = document.querySelectorAll('.letter')
    letters.forEach((el, index) => {
      gsap.to(el, {
        y: -8,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: index * 0.05, // 每个字母的动画错开时间
      })
    })
  }, 2000) // 等待入场动画完成再动
})
</script>


<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poetsen+One&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");

.quote-container {
  text-align: center;
  margin-top: 100px;
  font-size: 100px;
  font-weight: bold;
  font-family: "Poetsen One", sans-serif;
  white-space: nowrap;
}

.part1, .part2 {
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
}

.word {
  display: inline-block;
  margin-right: 10px;
}

.letter {
  display: inline-block;
  opacity: 0;
  color: #ec4899; /* 改成柔和的粉色（可根据你整体风格换颜色） */
  text-shadow:
    2px 2px 4px rgba(0, 0, 0, 0.2), /* 黑色轻阴影 */
    -1px -1px 0 rgba(255, 255, 255, 0.3); /* 提亮反光 */
  transition: color 0.3s ease;
}
</style>
