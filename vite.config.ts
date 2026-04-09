import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      formats: ["es"],
      fileName: "index",
    },
    target: "node22",
    ssr: true,
    rollupOptions: {
      external: ["express"],
    },
    outDir: "dist",
    emptyOutDir: true,
  },
  test: {
    environment: "node",
    globals: true,
  },
});
