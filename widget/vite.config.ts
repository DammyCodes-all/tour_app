import { defineConfig } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Vite config for embeddable widget
export default defineConfig(({ mode }) => ({
  plugins: [],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/main.ts"),
      name: "Tourify",
      fileName: "widget",
      formats: ["iife"],
    },
    cssCodeSplit: false,
    outDir: "dist",
    sourcemap: mode === "development",
    minify: mode === "production",
    rollupOptions: {
      output: {
        globals: {
          window: "window",
          document: "document",
        },
      },
    },
  },
  server: {
    port: 5173,
    strictPort: true,
    cors: true, // allow test pages to load widget from dev server
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
}));
