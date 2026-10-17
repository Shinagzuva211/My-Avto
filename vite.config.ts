/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.png', 'logo.png', 'logo-dark.webp', 'logo-light.webp'],
      manifest: {
        name: 'Hodiy Avto',
        short_name: 'Hodiy Avto',
        description: 'Toshkent Avtomobil Sotuv Markazi',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          { src: '/logo.png', sizes: '512x512', type: 'image/png' },
          { src: '/favicon.png', sizes: '192x192', type: 'image/png' },
        ],
      },
    }),
  ],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
    css: false,
  },
})
