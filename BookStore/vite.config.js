import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
      extensions: [".jsx", ".js"],
      alias: {
        "@views": path.resolve(__dirname, "src/views"),
        "@routes": path.resolve(__dirname, "src/routes"),
        "@layouts": path.resolve(__dirname, "src/layouts"),
        "@assets": path.resolve(__dirname, "src/assets"),
        "@hooks": path.resolve(__dirname, "src/hooks"),
      },
    },
})
