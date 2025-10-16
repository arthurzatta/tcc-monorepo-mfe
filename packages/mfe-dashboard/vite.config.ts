import federation, {
  VitePluginFederationOptions,
} from "@originjs/vite-plugin-federation";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { defineConfig } from "vite";

function resolveModules(dir: string) {
  return path.resolve(__dirname, "src/ui/modules/", dir);
}

const federationConfig: VitePluginFederationOptions = {
  name: "mfe-dashboard",
  filename: "remoteEntry.js",
  exposes: {
    "./PatientsTable": resolveModules("PatientsTable/index.ts"),
    "./PatientsTableFilter": resolveModules("PatientsTableFilter/index.ts"),
  },
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte(), federation(federationConfig), tailwindcss()],
  resolve: {
    alias: {
      $lib: path.resolve("./src/lib"),
    },
  },
});
