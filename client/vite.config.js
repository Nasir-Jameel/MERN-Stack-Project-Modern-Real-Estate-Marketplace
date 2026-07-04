import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        secure: false,
      }
    }
  },
  plugins: [
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Fixes the redux-persist setItem bug by pointing to the clean ESM bundle
      'redux-persist/lib/storage': 'redux-persist/es/storage',
    },
  },
})
