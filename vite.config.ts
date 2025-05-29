import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue({
        template: {
          compilerOptions: {
            isCustomElement: (tag) => ['YMapControl'].includes(tag)
          }
        }
    }),
  ],
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js'
    }
  },
  build: {
    target: 'esnext' //browsers can handle the latest ES features
  }    
})

