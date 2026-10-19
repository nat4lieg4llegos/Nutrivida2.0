import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // Permite usar describe, it y expect sin importarlos en cada archivo
    environment: 'jsdom', // Navegador simulado para las pruebas
    setupFiles: './src/setupTests.js', // Archivo de configuración inicial
  }
})
