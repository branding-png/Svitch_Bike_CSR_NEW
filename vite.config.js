import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    cssCodeSplit:false,
    // Split vendor bundles so a single React update doesn't bust the cache
    // for swiper/bootstrap chunks (and vice versa). Each group lands in its
    // own dist/assets/<name>-<hash>.js with long-cache headers.
    rollupOptions: {
      output: {
        // Rolldown (Vite 8) only accepts the function form of manualChunks.
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (/[\\/]node_modules[\\/](react|react-dom|react-router-dom)[\\/]/.test(id)) return 'react-vendor'
          if (/[\\/]node_modules[\\/]swiper[\\/]/.test(id)) return 'swiper-vendor'
          if (/[\\/]node_modules[\\/]glightbox[\\/]/.test(id)) return 'glightbox-vendor'
          if (/[\\/]node_modules[\\/]bootstrap[\\/]/.test(id)) return 'bootstrap-vendor'
        },
      },
    },
    // Inline assets under 4 KB into the JS bundle (default 4096), bump to
    // 8 KB so small SVG icons don't trigger an extra round-trip.
    assetsInlineLimit: 8192,
    // Vite 8 + plugin-react 6 use OXC by default — it already strips
    // `debugger` statements and dead code. No extra esbuild config needed.
  },
})
