import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";

// Configuração exclusiva do Pages. O build original do Lovable é preservado.
export default defineConfig({
  base: "./",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
    dedupe: ["react", "react-dom", "@tanstack/react-router"],
  },
  define: {
    "import.meta.env.VITE_GITHUB_PAGES": JSON.stringify("true"),
    "import.meta.env.VITE_PAGES_HAS_LOGOS": JSON.stringify(String(
      existsSync("public/trames_logo_compact.png") && existsSync("public/trames_logo_horizontal.png")
    )),
  },
  build: {
    outDir: "dist-pages",
    rollupOptions: { input: "pages.html" },
  },
});
