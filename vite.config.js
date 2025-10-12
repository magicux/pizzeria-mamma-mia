// HITO 6: evitar duplicados de React
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/pizzeria-mamma-mia/', // repo de github pages`
    resolve: {
    dedupe: ["react", "react-dom"],
  },
})