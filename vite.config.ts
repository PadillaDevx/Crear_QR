import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    // qr-code-styling ships CommonJS; Vite needs to pre-bundle it
    include: ['qr-code-styling'],
  },
})
