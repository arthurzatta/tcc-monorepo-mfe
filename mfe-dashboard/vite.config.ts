import federation, {
  VitePluginFederationOptions,
} from "@originjs/vite-plugin-federation";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import path from "path";
import { defineConfig } from "vite";

function resolveModules(dir: string) {
  return path.resolve(__dirname, "src/ui/modules/", dir);
}

const federationConfig: VitePluginFederationOptions = {
  name: "mfe-dashboard",
  filename: "remoteEntry.js",
  exposes: {
    // "./BarChart": "./src/ui/modules/BarChart/index.ts",
    "./BarChart": resolveModules("BarChart/index.ts"),
    // "./LineChart": "./src/ui/modules/LineChart/index.ts",
    "./LineChart": resolveModules("LineChart/index.ts"),
    "./ServicesTable": resolveModules("ServicesTable/index.ts"),
  },
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte(), federation(federationConfig)],
});
