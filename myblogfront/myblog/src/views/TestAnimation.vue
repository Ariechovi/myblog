<template>
  <section class="hero" ref="heroRef" @mousemove="onMouseMove" @mouseleave="onMouseLeave">
    <div class="noise" />

    <div
      v-for="orb in orbs"
      :key="orb.id"
      :ref="(el) => setOrbRef(orb.id, el as HTMLElement)"
      class="orb"
      :style="{
        left: orb.x + '%',
        top: orb.y + '%',
        width: orb.size + 'px',
        height: orb.size + 'px',
        background: orb.gradient,
        opacity: orb.opacity,
        filter: 'blur(' + orb.blur + 'px)',
      }"
    />

    <div class="hero-content" ref="contentRef">
      <div class="heading-block" ref="headingRef">
        <p class="line line-left">
          <span
            v-for="(ch, i) in line1"
            :key="i"
            :class="['char-mask', { space: ch === ' ' }]"
          >
            <span class="char-body">{{ ch === ' ' ? '\u00A0' : ch }}</span>
          </span>
        </p>
        <p class="line line-right">
          <span
            v-for="(ch, i) in line2"
            :key="i"
            :class="['char-mask', { space: ch === ' ' }]"
          >
            <span class="char-body">{{ ch === ' ' ? '\u00A0' : ch }}</span>
          </span>
        </p>
        <p class="line line-left">
          <span
            v-for="(ch, i) in line3"
            :key="i"
            :class="['char-mask', { space: ch === ' ' }]"
          >
            <span class="char-body">{{ ch === ' ' ? '\u00A0' : ch }}</span>
          </span>
        </p>
      </div>

      <p class="subtitle" ref="subRef">
        A wildly robust blog built for creators &mdash; 记录生活 · 分享技术 · 保持热爱
      </p>

      <div class="btn-wrap" ref="btnWrapRef">
        <a href="/tech" class="cta-btn">
          <span class="btn-label">开始探索</span>
          <span class="btn-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </span>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { onMounted, onBeforeUnmount, ref } from 'vue'

/* ---- refs ---- */
const heroRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)
const headingRef = ref<HTMLElement | null>(null)
const subRef = ref<HTMLElement | null>(null)
const btnWrapRef = ref<HTMLElement | null>(null)

/* ---- text data ---- */
const line1 = [...'THIS BLOG']
const line2 = [...'THIS ME']
const line3 = [...'THIS BEAT']
const L1 = line1.length // 9
const L2 = line2.length // 7

/* ---- orbs ---- */
const orbs = [
  { id: 0, x: 10, y: 15, size: 360, opacity: 0.55, blur: 64, gradient: 'radial-gradient(circle at 40% 40%, rgba(10,228,72,0.7), transparent 70%)' },
  { id: 1, x: 75, y: 10, size: 280, opacity: 0.45, blur: 56, gradient: 'radial-gradient(circle at 50% 50%, rgba(192,132,252,0.6), transparent 70%)' },
  { id: 2, x: 85, y: 70, size: 340, opacity: 0.50, blur: 60, gradient: 'radial-gradient(circle at 60% 40%, rgba(255,135,9,0.55), transparent 70%)' },
  { id: 3, x: 20, y: 80, size: 300, opacity: 0.40, blur: 52, gradient: 'radial-gradient(circle at 30% 50%, rgba(14,165,233,0.5), transparent 70%)' },
  { id: 4, x: 50, y: 50, size: 200, opacity: 0.30, blur: 70, gradient: 'radial-gradient(circle at 50% 50%, rgba(236,72,153,0.45), transparent 70%)' },
  { id: 5, x: 60, y: 25, size: 160, opacity: 0.35, blur: 44, gradient: 'radial-gradient(circle at 50% 50%, rgba(10,228,72,0.5), transparent 70%)' },
]

const orbRefs: Record<number, HTMLElement> = {}
function setOrbRef(id: number, el: HTMLElement) { orbRefs[id] = el }

/* ---- parallax ---- */
let mouseX = 0.5, mouseY = 0.5, targetX = 0.5, targetY = 0.5, rafId = 0

function onMouseMove(e: MouseEvent) {
  const rect = heroRef.value?.getBoundingClientRect()
  if (!rect) return
  targetX = (e.clientX - rect.left) / rect.width
  targetY = (e.clientY - rect.top) / rect.height
}
function onMouseLeave() { targetX = 0.5; targetY = 0.5 }

/* ---- lifecycle ---- */
let orbTl: gsap.core.Timeline | null = null

onMounted(() => {
  /* ===== 1. 光球浮动 ===== */
  orbTl = gsap.timeline({ repeat: -1, yoyo: true, defaults: { ease: 'sine.inOut' } })
  Object.values(orbRefs).forEach((el, i) => {
    if (!el) return
    orbTl!.to(el, {
      x: gsap.utils.random(-40, 40),
      y: gsap.utils.random(-30, 30),
      scale: gsap.utils.random(0.85, 1.15),
      duration: gsap.utils.random(4, 8),
    }, i * 0.6)
  })

  /* ===== 2. 主时间轴 ===== */
  const bodyEls = headingRef.value!.querySelectorAll<HTMLElement>('.char-body')
  const maskEls = headingRef.value!.querySelectorAll<HTMLElement>('.char-mask')
  const total = bodyEls.length // 25

  const tl = gsap.timeline({ defaults: { ease: 'power2.out', duration: 0.6 } })
  tl.set(maskEls, { visibility: 'visible' })

  // --- 全量 clip-reveal 基础层 ---
  // 所有字符从 mask 下方 105% 滑入，每字间隔 0.04s
  tl.fromTo(bodyEls, {
    yPercent: 105,
  }, {
    yPercent: 0,
    duration: 0.65,
    stagger: { each: 0.04, from: 'start' },
    ease: 'power3.out',
  }, 0.15)

  // --- 逐字符个性动画层 ---
  // 使用绝对时间插入，与 GSAP 官网做法一致

  /* 行首 T 3D 翻转 (rotationX) */
  const firstChars = [0, L1, L1 + L2] // indices 0, 9, 16
  firstChars.forEach((idx) => {
    const mask = maskEls[idx]
    const body = bodyEls[idx]
    if (!mask || !body) return
    gsap.set(mask, { perspective: 750, transformOrigin: '50% 100%' })
    tl.fromTo(mask, {
      rotationX: -160,
    }, {
      rotationX: 0,
      duration: 1,
      ease: 'back.out(1.7)',
    }, '-=0.35')
  })

  /* 关键词 BLOG/ME/BEAT 弹性弹出 */
  const kwRanges: [number, number][] = [
    [5, 8],           // BLOG: indices 5-8
    [L1 + 5, L1 + 6], // ME: indices 14-15
    [L1 + L2 + 5, total - 1], // BEAT: indices 21-24
  ]
  kwRanges.forEach(([start, end]) => {
    for (let i = start; i <= end; i++) {
      const body = bodyEls[i]
      if (!body) continue
      const isLastBeat = i === total - 1
      const isMiddleME = (i >= kwRanges[1][0] && i <= kwRanges[1][1])
      tl.fromTo(body, {
        scale: 0,
        rotation: isMiddleME ? -15 : 8,
      }, {
        scale: 1,
        rotation: 0,
        duration: isLastBeat ? 0.8 : 0.5,
        ease: isLastBeat ? 'elastic.out(1, 0.4)' : 'back.out(2)',
      }, '<')
    }
  })

  /* 部分字符从左侧滑入 */
  const slideFromLeft = [1, 6, 10, 17, 22]
  slideFromLeft.forEach((idx) => {
    const body = bodyEls[idx]
    if (!body) return
    tl.fromTo(body, {
      xPercent: -100,
    }, {
      xPercent: 0,
      duration: 0.6,
      ease: 'power2.out',
    }, '<')
  })

  /* 部分字符从上方掉落 */
  const dropFromAbove = [3, 8, 12, 15, 19, 23]
  dropFromAbove.forEach((idx) => {
    const body = bodyEls[idx]
    if (!body) return
    tl.fromTo(body, {
      yPercent: -105,
    }, {
      yPercent: 0,
      duration: 0.5,
      ease: 'back.out(1.4)',
    }, '<')
  })

  // --- 副标题 ---
  tl.fromTo(subRef.value,
    { y: 28, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.75, ease: 'power2.out' },
    '-=0.3'
  )

  // --- 按钮 ---
  tl.fromTo(btnWrapRef.value,
    { y: 40, opacity: 0, scale: 0.85 },
    { y: 0, opacity: 1, scale: 1, duration: 1, ease: 'elastic.out(1, 0.6)' },
    '-=0.15'
  )

  /* ===== 3. 鼠标视差 ===== */
  const loop = () => {
    mouseX += (targetX - mouseX) * 0.06
    mouseY += (targetY - mouseY) * 0.06

    if (contentRef.value) {
      const dx = (mouseX - 0.5) * 28
      const dy = (mouseY - 0.5) * 28
      contentRef.value.style.transform = `translate3d(${dx}px, ${dy}px, 0)`
    }

    Object.entries(orbRefs).forEach(([id, el]) => {
      if (!el) return
      const depth = 0.5 + parseInt(id) * 0.15
      const dx = (mouseX - 0.5) * 60 * depth
      const dy = (mouseY - 0.5) * 60 * depth
      el.style.transform = `translate3d(${dx}px, ${dy}px, 0)`
    })

    rafId = requestAnimationFrame(loop)
  }
  rafId = requestAnimationFrame(loop)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(rafId)
  orbTl?.kill()
  gsap.killTweensOf('*')
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');

.hero {
  position: fixed;
  inset: 0;
  z-index: 0;
  display: flex;
  align-items: center;
  background: #080808;
  overflow: hidden;
  cursor: default;
}

/* ---- 噪声纹理 ---- */
.noise {
  position: absolute;
  inset: 0;
  opacity: 0.035;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 200px 200px;
  pointer-events: none;
}

/* ---- 光球 ---- */
.orb {
  position: absolute;
  border-radius: 50%;
  will-change: transform;
  pointer-events: none;
}

/* ---- 内容 ---- */
.hero-content {
  position: relative;
  z-index: 2;
  width: 100%;
  padding: 0 max(2rem, 6vw);
  will-change: transform;
}

.heading-block { display: flex; flex-direction: column; }

/* ---- 文本行 ---- */
.line {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(3.5rem, 11vw, 13rem);
  line-height: 0.88;
  letter-spacing: -0.02em;
  color: #fffce1;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
}
.line-left  { justify-content: flex-start; }
.line-right { justify-content: flex-end; }

/* ---- 核心: clip-reveal mask 系统 ---- */
.char-mask {
  display: inline-block;
  overflow: hidden;       /* 裁剪区域 */
  visibility: hidden;     /* 初始隐藏，GSAP set 后变为 visible */
  position: relative;
}
.char-mask.space {
  width: 0.35em;
}

.char-body {
  display: inline-block;
  will-change: transform;
}

/* 关键词绿色高亮 */
.line:nth-child(1) .char-mask:nth-child(n+6) .char-body,
.line:nth-child(2) .char-mask:nth-child(n+6) .char-body,
.line:nth-child(3) .char-mask:nth-child(n+6) .char-body {
  color: #0ae448;
}

/* ---- 副标题 ---- */
.subtitle {
  margin-top: clamp(1.2rem, 2.5vh, 2.5rem);
  font-size: clamp(0.875rem, 1.6vw, 1.125rem);
  color: #6b6b60;
  letter-spacing: 0.08em;
  font-family: 'Source Han Serif SC', 'Noto Serif SC', serif;
}

/* ---- 按钮 ---- */
.btn-wrap {
  margin-top: clamp(2rem, 4vh, 3.5rem);
  display: inline-block;
  will-change: transform, opacity;
}

.cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 36px;
  border-radius: 999px;
  border: 1.5px solid #3a3a36;
  background: transparent;
  color: #fffce1;
  font-size: 1rem;
  letter-spacing: 0.04em;
  text-decoration: none;
  cursor: pointer;
  transition: border-color 0.3s;
  position: relative;
  overflow: hidden;
}
.cta-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 999px;
  background: radial-gradient(ellipse at center, rgba(10,228,72,0.12), transparent 70%);
  opacity: 0;
  transition: opacity 0.3s;
}
.cta-btn:hover { border-color: #0ae448; }
.cta-btn:hover::before { opacity: 1; }
.cta-btn:hover .btn-icon { transform: translateX(4px); }
.btn-label { position: relative; z-index: 1; }
.btn-icon {
  display: flex;
  align-items: center;
  color: #0ae448;
  transition: transform 0.3s ease;
}

/* ---- 响应式 ---- */
@media (max-width: 768px) {
  .hero-content { padding: 0 1.25rem; }
  .line { font-size: clamp(2.5rem, 10vw, 4.5rem); line-height: 0.92; }
  .cta-btn { padding: 12px 28px; font-size: 0.9rem; }
}
</style>
