import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@Mocks": path.resolve(__dirname, "./src/@mocks"),
      "@Types": path.resolve(__dirname, "./src/@types"),
      "@Components": path.resolve(__dirname, "./src/components"),
      "@Pages": path.resolve(__dirname, "./src/pages"),
      "@Assets": path.resolve(__dirname, "./src/core/assets"),
      "@Constants": path.resolve(__dirname, "./src/core/constants"),
      "@Helpers": path.resolve(__dirname, "./src/core/helpers"),
      "@Utils": path.resolve(__dirname, "./src/core/utils"),
      "@Services": path.resolve(__dirname, "./src/core/services"),
      "@Hooks": path.resolve(__dirname, "./src/hooks"),
      "@Stores": path.resolve(__dirname, "./src/core/store"), // Verifique isso
      "@Tests": path.resolve(__dirname, "./src/tests"),
      "@Routes": path.resolve(__dirname, "./src/routes"),
      "@Contexts": path.resolve(__dirname, "./src/context"),
    },
  },
});
