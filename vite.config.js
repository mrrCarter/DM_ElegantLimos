import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) {
            return undefined;
          }

          if (
            id.includes("react") ||
            id.includes("scheduler") ||
            id.includes("history")
          ) {
            return "react-vendor";
          }

          if (id.includes("@stripe") || id.includes("@react-google-maps")) {
            return "booking-vendor";
          }

          if (
            id.includes("swiper") ||
            id.includes("slick") ||
            id.includes("wow.js")
          ) {
            return "ui-vendor";
          }

          return "vendor";
        },
      },
    },
  },
  server: {
    host: true, // Allows listening on all interfaces
    port: 1573, // Specifies the desired port
  },
});
