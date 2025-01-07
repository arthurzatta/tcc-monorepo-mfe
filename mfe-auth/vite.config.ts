import federation from "@originjs/vite-plugin-federation";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
// import packageJson from "./package.json";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "mfe-auth",
      filename: "remoteEntry.js",
      exposes: {
        "./Auth": "./src/main.tsx",
      },
      // shared: ["react", "react-dom"],
      // shared: packageJson.dependencies,
    }),
  ],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});
