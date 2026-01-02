import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Nếu file nằm trong node_modules, tách nó ra thành file vendor riêng
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
  },
})
