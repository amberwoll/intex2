import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/UserMovieRecommendations': 'https://localhost:5500',
      '/Movie': 'https://localhost:5500',
    },
  },
});
