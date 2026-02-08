import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  root: 'dev',
  plugins: [react()],
  resolve: {
    alias: {
      '@granat': path.resolve(__dirname)
    }
  },
  server: {
    fs: {
      allow: [path.resolve(__dirname)]
    }
  },
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    emptyOutDir: true,
    lib: {
      entry: path.resolve(__dirname, 'index.ts'),
      name: 'GranatUI',
      // Ensure CJS output keeps a real `.cjs` extension even with `"type": "module"`.
      fileName: (format) => (format === 'cjs' ? 'granat-ui.cjs' : 'granat-ui.es.js'),
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    }
  }
});
