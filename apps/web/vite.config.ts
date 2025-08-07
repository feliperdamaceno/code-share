import { fileURLToPath } from 'node:url'

import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import svgLoader from 'vite-svg-loader'

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    outDir: '../server/static',
    emptyOutDir: true
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    proxy: {
      ['/api']: 'http://localhost:5000'
    }
  },

  plugins: [vue(), svgLoader()]
})
