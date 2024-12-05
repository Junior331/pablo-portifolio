import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      utils: "@/utils",
      state: "@/state",
      pages: "@/pages",
      config: "@/config",
      routes: "@/routes",
      styles: "@/styles",
      service: "@/service",
      locales: "@/locales",
      components: "@/components",
    },
  },
  server: {
    watch: {
      usePolling: true,
    },
  },
});
