import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fg from "fast-glob";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: "load-markdown-files",
      async load(id) {
        if (/\/public\/notes\/index\.js$/.test(id)) {
          const files = await fg("public/notes/*.md");
          return `export const posts = ${JSON.stringify(files)};`;
        }
        return null;
      },
    },
  ],
});
