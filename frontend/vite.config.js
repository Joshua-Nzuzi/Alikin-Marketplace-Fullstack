// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Dossier que Vercel attend par défaut
    sourcemap: false, // Tu peux activer si tu veux debugger en prod
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    open: false,
  },
});
