import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  
  build: {
    target: 'es2020',
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
    
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['lucide-react', '@hello-pangea/dnd'],
          utils: ['date-fns'],
          Bolt Database: ['@supabase/Bolt Database-js']
        }
      }
    },
    
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.trace']
      }
    },
    
    chunkSizeWarningLimit: 1000
  },
  
  server: {
    port: 3000,
    host: true,
    hmr: {
      overlay: false
    }
  },
  
  preview: {
    port: 4173,
    host: true
  },
  
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'lucide-react',
      'date-fns',
      '@hello-pangea/dnd'
    ]
  },
  
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version || '1.0.0'),
    __BUILD_TIME__: JSON.stringify(new Date().toISOString())
  },
  
  envPrefix: 'VITE_',
  
  base: '/',
  
  assetsInclude: ['**/*.md']
});
