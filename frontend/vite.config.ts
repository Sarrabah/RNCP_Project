import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
    server: {port: 3000,
        proxy: {
            '/api': {
              target: 'http://localhost:8000',
              changeOrigin: true,
              secure: false,
            },
          },
    },
    plugins: [react()],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/setupTests.ts',
    },
})