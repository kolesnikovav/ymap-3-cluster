import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue({
        features: {
          componentIdGenerator: (
            filepath: string,
            _source: string,
            _isProduction: boolean | undefined,
            getHash: (text: string) => string,
          ) => {
            const hs = `illegal-app-${getHash(filepath)}`;
            return hs;
          }

        },
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

