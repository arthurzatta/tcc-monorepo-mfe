import federation, {
  VitePluginFederationOptions,
} from "@originjs/vite-plugin-federation";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { defineConfig } from "vite";

const federationConfig: VitePluginFederationOptions = {
  name: "mfe-dashboard",
  filename: "remoteEntry.js",
  exposes: {
    "./BarChart": "./src/ui/BarChart/index.ts",
  },
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte(), federation(federationConfig)],
});
