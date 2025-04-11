import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import fs from 'node:fs'
import path from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    {
      name: 'generate-spa-redirect',
      writeBundle() {
        // Create redirects file for SPA routing
        const redirectsContent = '/* /index.html 200'
        const outDir = path.resolve(__dirname, 'dist')
        fs.writeFileSync(path.join(outDir, '_redirects'), redirectsContent)
        console.log('Generated _redirects file for SPA routing')
      }
    }
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
