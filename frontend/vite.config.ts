import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Vite configuration for VenueLink frontend
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // Fast Refresh for React components during development
    react(),
  ],

  // Path aliases matching tsconfig.json for absolute imports
  // Prevents messy relative imports like '../../../components'
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/features': path.resolve(__dirname, './src/features'),
      '@/components': path.resolve(__dirname, './src/components'),
      '@/layout': path.resolve(__dirname, './src/layout'),
      '@/lib': path.resolve(__dirname, './src/lib'),
      '@venuelink/shared': path.resolve(__dirname, '../shared/src'),
    },
  },

  // Development server configuration
  server: {
    port: 3000,
    // Proxy API requests to backend during development
    // This avoids CORS issues when frontend calls backend
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },

  // Build optimization
  build: {
    // Source maps for debugging production issues
    sourcemap: true,
    // Warn if chunk size exceeds 500kb (prevents bundle bloat)
    chunkSizeWarningLimit: 500,
  },
});
