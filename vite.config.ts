import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Required for GitHub Pages: assets must be served from /Crear_QR/
  base: '/Crear_QR/',
  optimizeDeps: {
    // qr-code-styling ships CommonJS; Vite needs to pre-bundle it
    include: ['qr-code-styling'],
  },
})
