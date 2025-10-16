import federation from "@originjs/vite-plugin-federation";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "mfe-patients",
      filename: "remoteEntry.js",
      exposes: {
        "./Patients": "./src/main.tsx",
      },
      remotes: {
        "mfe-dashboard": "http://localhost:3003/remoteEntry.js",
      },
      // shared: ["react", "react-dom"],
    }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  build: {
    target: "esnext",
  },
  server: {
    port: 3002,
  },
});
