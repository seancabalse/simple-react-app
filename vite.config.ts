/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import path from "node:path";


// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
      "@routes": path.resolve(__dirname, "./src/routes"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@models": path.resolve(__dirname, "./src/models"),
      "@data": path.resolve(__dirname, "./src/data"),
      "@context": path.resolve(__dirname, "./src/context"),
    },
  },
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './__tests__/setup.ts'
  },

})
