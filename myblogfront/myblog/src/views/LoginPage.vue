<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const isFlipped = ref(route.name === 'register')

watch(() => route.name, (name) => {
  isFlipped.value = name === 'register'
})

const loginUsername = ref('')
const loginPassword = ref('')
const loginError = ref('')

const regUsername = ref('')
const regPassword = ref('')
const regPassword2 = ref('')
const regError = ref('')
const regSuccess = ref('')

async function handleLogin() {
  loginError.value = ''
  if (!loginUsername.value.trim() || !loginPassword.value.trim()) {
    loginError.value = '请输入用户名和密码'
    return
  }
  try {
    await authStore.login({ username: loginUsername.value, password: loginPassword.value })
    const redirect = (route.query.redirect as string) || '/home'
    router.push(redirect)
  } catch {
    loginError.value = '用户名或密码错误'
  }
}

async function handleRegister() {
  regError.value = ''
  regSuccess.value = ''
  if (!regUsername.value.trim() || !regPassword.value.trim() || !regPassword2.value.trim()) {
    regError.value = '请填写所有字段'
    return
  }
  if (regPassword.value !== regPassword2.value) {
    regError.value = '两次密码不一致'
    return
  }
  try {
    await authStore.register({
      username: regUsername.value,
      password: regPassword.value,
      password2: regPassword2.value,
    })
    regSuccess.value = '注册成功！'
    regUsername.value = ''
    regPassword.value = ''
    regPassword2.value = ''
  } catch (e: unknown) {
    const err = e as { response?: { data?: Record<string, string[]> } }
    const data = err?.response?.data
    if (data) {
      const msgs = Object.values(data).flat()
      regError.value = msgs.join(', ')
    } else {
      regError.value = '注册失败，请重试'
    }
  }
}

watch(regSuccess, (val) => {
  if (val) {
    setTimeout(() => {
      isFlipped.value = false
      regError.value = ''
      regSuccess.value = ''
      router.replace({ name: 'login' })
    }, 1200)
  }
})
</script>

<template>
  <div class="doodle-wrapper">
    <input
      id="doodle-flip"
      v-model="isFlipped"
      type="checkbox"
      class="doodle-toggle"
      aria-label="切换登录和注册"
    />

    <div class="doodle-header">
      <span class="doodle-mode-text login-text">登录</span>
      <label class="doodle-switch-label" for="doodle-flip" tabindex="0">
        <span class="doodle-switch-handle"></span>
      </label>
      <span class="doodle-mode-text signup-text">注册</span>
    </div>

    <div class="doodle-card-scene">
      <svg
        class="doodle-svg doodle-star"
        viewBox="0 0 24 24"
        fill="#ffd166"
        stroke="var(--ink)"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polygon
          points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
        ></polygon>
      </svg>
      <svg
        class="doodle-svg doodle-sparkle"
        viewBox="0 0 24 24"
        fill="#06d6a0"
        stroke="var(--ink)"
        stroke-width="1.5"
      >
        <path
          d="M12 2 Q12 12 22 12 Q12 12 12 22 Q12 12 2 12 Q12 12 12 2 Z"
        ></path>
      </svg>
      <svg
        class="doodle-svg doodle-swirl"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--ink)"
        stroke-width="1.5"
        stroke-linecap="round"
      >
        <path
          d="M3 12 C 3 5 10 5 16 5 C 20 5 21 9 18 12 C 15 15 10 13 12 9 C 14 5 22 9 21 16"
        ></path>
      </svg>

      <div class="doodle-card-inner">
        <!-- Login Front -->
        <div class="doodle-card-front">
          <div class="doodle-title">欢迎回来!</div>
          <form class="doodle-form" @submit.prevent="handleLogin">
            <div class="doodle-input-wrapper">
              <input
                v-model="loginUsername"
                class="doodle-input"
                name="login-username"
                placeholder="用户名"
                type="text"
                required
              />
            </div>
            <div class="doodle-input-wrapper">
              <input
                v-model="loginPassword"
                class="doodle-input"
                name="login-password"
                placeholder="密码"
                type="password"
                required
              />
            </div>
            <div v-if="loginError" class="doodle-msg doodle-msg-error">{{ loginError }}</div>
            <button class="doodle-btn" :disabled="authStore.loading">
              {{ authStore.loading ? '登录中...' : "Let's Go!" }}
            </button>
          </form>
        </div>

        <!-- Register Back -->
        <div class="doodle-card-back">
          <div class="doodle-title doodle-title-alt">加入我们!</div>
          <form class="doodle-form" @submit.prevent="handleRegister">
            <div class="doodle-input-wrapper">
              <input
                v-model="regUsername"
                class="doodle-input"
                name="reg-username"
                placeholder="用户名"
                type="text"
                required
              />
            </div>
            <div class="doodle-input-wrapper">
              <input
                v-model="regPassword"
                class="doodle-input"
                name="reg-password"
                placeholder="密码"
                type="password"
                required
              />
            </div>
            <div class="doodle-input-wrapper">
              <input
                v-model="regPassword2"
                class="doodle-input"
                name="reg-password2"
                placeholder="确认密码"
                type="password"
                required
              />
            </div>
            <div v-if="regError" class="doodle-msg doodle-msg-error">{{ regError }}</div>
            <div v-if="regSuccess" class="doodle-msg doodle-msg-success">{{ regSuccess }}</div>
            <button class="doodle-btn doodle-btn-alt" :disabled="authStore.loading">
              {{ authStore.loading ? '注册中...' : '确认!' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.doodle-wrapper {
  --ink: #323232;
  --paper-front: #fff9e6;
  --paper-back: #e6f0ff;
  --bg-color: #ffffff;
  --primary-btn: #ff6b6b;
  --primary-btn-hover: #ff5252;
  --secondary-btn: #4ecdc4;
  --secondary-btn-hover: #3bbfb6;
  --switch-bg: #ffe66d;
  --input-focus: #2d8cf0;

  --card-width: 300px;
  --card-height: 350px;
  --input-width: 250px;
  --input-height: 40px;
  --btn-width: 120px;
  --btn-height: 40px;

  --border-width: 2px;
  --shadow-offset: 4px;

  --sketch-radius-1: 8px 24px 8px 24px / 24px 8px 24px 8px;
  --sketch-radius-2: 24px 8px 24px 8px / 8px 24px 8px 24px;
  --sketch-radius-btn: 16px 5px 16px 5px / 5px 16px 5px 16px;

  font-family: "Comic Sans MS", "Chalkboard SE", "Marker Felt", "Gochi Hand",
    sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  box-sizing: border-box;
  padding-top: 60px;
  min-height: calc(100vh - 200px);

}

.doodle-toggle {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.doodle-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 25px;
  z-index: 5;
}

.doodle-mode-text {
  font-size: 18px;
  font-weight: bold;
  color: var(--ink);
  transition: opacity 0.3s;
}

.doodle-toggle:not(:checked) ~ .doodle-header .signup-text {
  opacity: 0.5;
}

.doodle-toggle:checked ~ .doodle-header .login-text {
  opacity: 0.5;
}

.doodle-switch-label {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
  background-color: var(--switch-bg);
  border: var(--border-width) solid var(--ink);
  border-radius: 20px;
  cursor: pointer;
  box-shadow: 2px 2px 0px var(--ink);
  transition:
    transform 0.1s,
    box-shadow 0.1s;
}

.doodle-switch-label:active {
  transform: translate(2px, 2px);
  box-shadow: 0px 0px 0px var(--ink);
}

.doodle-switch-handle {
  position: absolute;
  top: 2px;
  left: 3px;
  width: 16px;
  height: 16px;
  background-color: var(--bg-color);
  border: var(--border-width) solid var(--ink);
  border-radius: 50%;
  transition: transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.doodle-toggle:checked
  ~ .doodle-header
  .doodle-switch-label
  .doodle-switch-handle {
  transform: translateX(24px);
}

.doodle-card-scene {
  position: relative;
  perspective: 1000px;
  width: var(--card-width);
  height: var(--card-height);
  z-index: 2;
}

.doodle-svg {
  position: absolute;
  z-index: -1;
  pointer-events: none;
}

.doodle-star {
  top: -25px;
  left: -35px;
  width: 48px;
  height: 48px;
  animation: float-star 4s ease-in-out infinite;
}

.doodle-sparkle {
  bottom: -20px;
  right: -25px;
  width: 40px;
  height: 40px;
  animation: float-sparkle 4s ease-in-out infinite 1s;
}

.doodle-swirl {
  top: 30px;
  right: -30px;
  width: 32px;
  height: 32px;
  animation: float-swirl 4s ease-in-out infinite 2s;
}

@keyframes float-star {
  0%,
  100% {
    transform: translateY(0) rotate(-15deg);
  }
  50% {
    transform: translateY(-8px) rotate(-10deg);
  }
}

@keyframes float-sparkle {
  0%,
  100% {
    transform: translateY(0) rotate(10deg);
  }
  50% {
    transform: translateY(-8px) rotate(15deg);
  }
}

@keyframes float-swirl {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-8px) rotate(5deg);
  }
}

.doodle-card-inner {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.8s cubic-bezier(0.4, 0.2, 0.2, 1);
}

.doodle-toggle:checked ~ .doodle-card-scene .doodle-card-inner {
  transform: rotateY(180deg);
}

.doodle-card-front,
.doodle-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
  border: var(--border-width) solid var(--ink);
  border-radius: var(--sketch-radius-1);
  box-shadow: var(--shadow-offset) var(--shadow-offset) 0px var(--ink);

  background-image: repeating-linear-gradient(
    transparent,
    transparent 28px,
    rgba(0, 0, 0, 0.06) 28px,
    rgba(0, 0, 0, 0.06) 30px
  );
  background-position: 0 15px;
}

.doodle-card-front {
  background-color: var(--paper-front);
}

.doodle-card-back {
  background-color: var(--paper-back);
  transform: rotateY(180deg);
  border-radius: var(--sketch-radius-2);
}

.doodle-title {
  font-size: 25px;
  font-weight: 900;
  color: var(--ink);
  margin: 10px 0 20px 0;
  text-transform: uppercase;
  letter-spacing: 1px;
  transform: rotate(-3deg);
  text-shadow: 1px 1px 0px rgba(0, 0, 0, 0.1);
}

.doodle-title-alt {
  transform: rotate(2deg);
  margin: 0px 0 15px 0;
}

.doodle-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  align-items: center;
}

.doodle-input-wrapper {
  position: relative;
}

.doodle-input {
  width: var(--input-width);
  height: var(--input-height);
  padding: 5px 15px;
  box-sizing: border-box;
  font-family: inherit;
  font-size: 15px;
  font-weight: 600;
  color: var(--ink);
  background-color: var(--bg-color);
  border: var(--border-width) solid var(--ink);
  border-radius: var(--sketch-radius-1);
  box-shadow: 3px 3px 0px var(--ink);
  outline: none;
  transition: all 0.2s ease;
}

.doodle-input::placeholder {
  color: #666;
  opacity: 0.8;
}

.doodle-input:hover {
  transform: translateY(-2px);
  box-shadow: 4px 4px 0px var(--ink);
}

.doodle-input:focus,
.doodle-input:focus-visible {
  border: var(--border-width) solid var(--input-focus);
  border-radius: var(--sketch-radius-2);
  background-color: #fffdf5;
  box-shadow: 4px 4px 0px var(--ink);
}

.doodle-btn {
  margin: 15px 0;
  width: var(--btn-width);
  height: var(--btn-height);
  font-family: inherit;
  font-size: 17px;
  font-weight: 900;
  letter-spacing: 1px;
  color: var(--ink);
  background-color: var(--primary-btn);
  border: var(--border-width) solid var(--ink);
  border-radius: var(--sketch-radius-btn);
  box-shadow: 4px 4px 0px var(--ink);
  cursor: pointer;
  transition: all 0.15s ease;
  transform: rotate(-1deg);
}

.doodle-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.doodle-btn-alt {
  background-color: var(--secondary-btn);
  transform: rotate(1deg);
}

.doodle-btn:hover:not(:disabled) {
  background-color: var(--primary-btn-hover);
  transform: translateY(-2px) rotate(-2deg);
  box-shadow: 5px 5px 0px var(--ink);
}

.doodle-btn-alt:hover:not(:disabled) {
  background-color: var(--secondary-btn-hover);
  transform: translateY(-2px) rotate(2deg);
}

.doodle-btn:active:not(:disabled) {
  transform: translate(3px, 3px) rotate(0deg);
  box-shadow: 0px 0px 0px var(--ink);
}

.doodle-card-scene:hover .doodle-title {
  animation: doodle-wiggle 0.5s ease-in-out;
}

@keyframes doodle-wiggle {
  0%,
  100% {
    transform: rotate(-3deg);
  }
  25% {
    transform: rotate(2deg);
  }
  50% {
    transform: rotate(-4deg);
  }
  75% {
    transform: rotate(1deg);
  }
}

.doodle-msg {
  font-family: inherit;
  font-size: 13px;
  font-weight: 600;
  text-align: center;
  padding: 4px 12px;
  border-radius: 8px;
  max-width: var(--input-width);
}

.doodle-msg-error {
  color: #e63946;
  background: #ffe0e0;
  border: 1.5px dashed #e63946;
}

.doodle-msg-success {
  color: #2a9d8f;
  background: #e0f7f4;
  border: 1.5px dashed #2a9d8f;
}
</style>
