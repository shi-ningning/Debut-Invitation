import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Needed for BrowserRouter — fallback all routes to index.html
  preview: {
    port: 4173,
  },
})
