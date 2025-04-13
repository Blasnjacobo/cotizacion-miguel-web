import { defineConfig } from 'vite'
import { resolve } from "path";
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/cotizacion-miguel-web/',
  plugins: [react()],
  resolve: {
      alias: {
        "@assets": resolve(__dirname, "./src/assets"),
        "@styles": resolve(__dirname, "./src/styles"),
        "@components": resolve(__dirname, "./src/components"),
        "@providers": resolve(__dirname, "./src/providers"),
        "@utils": resolve(__dirname, "./src/utils"),
        "@models": resolve(__dirname, "./src/models"),
        "@hooks": resolve(__dirname, "./src/hooks"),
      },
  }
})