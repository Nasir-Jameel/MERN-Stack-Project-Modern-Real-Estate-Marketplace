import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        secure: false,
        changeOrigin: true
      }
    },
  },

  headers: {
    "Cross-Origin-Opener-Policy": "same-origin",
  },

  plugins: [
    react(),
    tailwindcss(),
  ],

  resolve: {
    alias: {
      'redux-persist/lib/storage': 'redux-persist/es/storage',
    },
  },

  build: {
    outDir: "dist"
  }
})