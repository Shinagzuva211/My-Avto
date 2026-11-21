/// <reference types="vitest/config" />
import type { IncomingMessage, ServerResponse } from 'node:http'
import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import { handleAdminRequest } from './api/admin/_handler'
import type { ServerEnv } from './api/admin/_auth'

// Mahalliy `vite dev` va `vite preview` ham /api/admin/* ni bajaradi.
// Ishlab chiqarishda esa Vercel serverless funksiyalari ishlaydi.
function adminMiddleware(env: ServerEnv) {
  return async (req: IncomingMessage, res: ServerResponse) => {
    try {
      const url = new URL(req.url ?? '/', 'http://localhost')
      const chunks: Buffer[] = []
      for await (const chunk of req) chunks.push(Buffer.from(chunk))
      const raw = Buffer.concat(chunks).toString('utf8')

      let body: unknown
      if (raw) {
        try {
          body = JSON.parse(raw)
        } catch {
          body = raw
        }
      }

      const query: Record<string, string | string[]> = {}
      url.searchParams.forEach((value, key) => {
        const existing = query[key]
        if (existing) query[key] = Array.isArray(existing) ? [...existing, value] : [existing, value]
        else query[key] = value
      })

      const result = await handleAdminRequest({
        method: req.method ?? 'GET',
        path: url.pathname,
        headers: req.headers,
        query,
        body,
        clientIp: req.socket?.remoteAddress,
      }, env)

      res.statusCode = result.status
      for (const [name, value] of Object.entries(result.headers)) res.setHeader(name, value)
      res.end(result.body)
    } catch (error) {
      res.statusCode = 500
      res.setHeader('Content-Type', 'application/json; charset=utf-8')
      res.end(JSON.stringify({ error: error instanceof Error ? error.message : 'Server xatoligi' }))
    }
  }
}

function adminApiDevPlugin(env: ServerEnv): Plugin {
  const middleware = adminMiddleware(env)
  return {
    name: 'admin-api-dev',
    configureServer(server) {
      server.middlewares.use('/api/admin', middleware)
    },
    configurePreviewServer(server) {
      server.middlewares.use('/api/admin', middleware)
    },
  }
}

export default defineConfig(({ mode }) => {
  // barcha env o'zgaruvchilari (VITE_ prefixesiz ham) faqat server tomonida o'qiladi.
  const env = loadEnv(mode, process.cwd(), '') as ServerEnv

  return {
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
      adminApiDevPlugin(env),
    ],
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: './src/test/setup.ts',
      css: false,
    },
  }
})
