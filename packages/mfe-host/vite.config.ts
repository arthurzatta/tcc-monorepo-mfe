import federation from "@originjs/vite-plugin-federation";
import tailwindcss from "@tailwindcss/vite";
// import { federation } from "@module-federation/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    react({
      exclude: ["mfe-auth"],
    }),
    federation({
      name: "mfe-host",
      remotes: {
        "mfe-patients": "http://localhost:3002/remoteEntry.js",
        "mfe-dashboard": "http://localhost:3003/remoteEntry.js",
      },
      shared: ["react", "react-dom"],
    }),
    tailwindcss(),
  ],
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
  server: {
    port: 3001,
    host: "localhost",
    fs: {
      allow: [".."],
    },
  },
  optimizeDeps: {
    include: ["@tcc/ui-lib"],
  },
});
