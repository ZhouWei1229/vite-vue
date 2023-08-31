import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
      ? '/vite-vue/'
      : '/'
}
export default defineConfig({
  plugins: [vue()],
})
