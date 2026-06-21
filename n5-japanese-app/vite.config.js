import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
      id: 'com.nihongo.app', // 🔥 Required for Android update logic
      name: 'Nihongo - JLPT N5/N4',
      short_name: 'Nihongo',
      description: 'A calm, focused place to master Japanese.',
      theme_color: '#0b0c0f',
      background_color: '#0b0c0f',
      display: 'standalone',
      start_url: '/', // 🔥 Explicitly forces it to start at the root
      scope: '/',     // 🔥 Explicitly limits the app to your domain
      icons: [
    { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
    { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
    { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' }
  ]
}
    })
  ]
});