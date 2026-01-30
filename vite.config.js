import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.js',
      registerType: 'autoUpdate',
      devOptions: { enabled: false },
      manifest: {
        name: 'Veo Veo',
        short_name: 'VeoVeo',
        start_url: '/?source=pwa',
        description: 'Un desafío fotográfico diario: capturá imágenes del color del día.',
        theme_color: '#000000',
        background_color: '#000000',
        orientation: 'portrait',
        display: 'standalone',
        categories: ["productivity", "utilities"],
        icons: [
          {
            src: '/VeoVeo192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/VeoVeo512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
        ]
      }
    })
  ]
})
