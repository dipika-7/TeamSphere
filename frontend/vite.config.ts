import path from "path";
import { defineConfig } from "vite";
export default defineConfig({
  base: "./",
  root: "./src",
  server: {
    port: 3070,
  },
  resolve: {
    alias: {
      "~bootstrap": path.resolve(__dirname, "node_modules/bootstrap"),
    },
  },
});