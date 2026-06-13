import { defineConfig } from 'tailwindcss'

export default defineConfig({
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    "./node_modules/vite-plugin-vue-devtools/**/*.css",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
})
