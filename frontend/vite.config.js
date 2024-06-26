import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    port:5000,
    host: '0.0.0.0',
    proxy:{
      '/api':{
        // target: 'http://backend:3000',
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
})
