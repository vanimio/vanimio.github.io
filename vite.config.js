import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// For a user-site repo (vanimio.github.io) the base is '/'.
// For a project repo (e.g. vanimio/flex-app) you'd set base: '/flex-app/'.
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
  },
});
