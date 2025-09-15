import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
  // Use relative paths in build output so the Chrome extension can load assets
  base: "./",
  build: {
    // Emit to `extension/popup/dist` to match manifest path
    outDir: "../dist",
    // Allow cleaning when outDir is outside root
    emptyOutDir: true,
  },
});
