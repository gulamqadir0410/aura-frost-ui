import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  splitting: true,
  treeshake: true,
  clean: true,
  outDir: "dist",
  external: ["react", "react-dom", "tailwindcss"],
  banner: {
    js: '"use client";',
  },
  esbuildOptions(options) {
    options.jsx = "automatic";
  },
  onSuccess: async () => {
    // Copy CSS and tailwind config to dist
    const fs = await import("fs");
    const path = await import("path");

    // Ensure dist/styles exists
    fs.mkdirSync("dist/styles", { recursive: true });
    fs.copyFileSync("src/styles/glassic.css", "dist/styles/glassic.css");
    fs.copyFileSync("src/tailwind.config.js", "dist/tailwind.config.js");
  },
});
