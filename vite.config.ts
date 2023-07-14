import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import tsConfigPaths from "vite-tsconfig-paths";
import * as packageJson from "./package.json";

export default defineConfig(() => ({
  plugins: [
    react(),
    tsConfigPaths(),
    dts({
      include: ["src"],
    }),
  ],
  build: {
    lib: {
      entry: resolve("src", "index.ts"),
      name: "index",
      formats: ["es", "cjs"],
      fileName: (format) =>
        `index.${
          format === "cjs" ? "cjs" : "es.js"
        }`,
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          'react-dom': 'ReactDOM',
        },
      }
    },
    optimizeDeps: {
      exclude: Object.keys(packageJson.peerDependencies),
    },
    esbuild: {
      minify: true,
    },
  },
}));