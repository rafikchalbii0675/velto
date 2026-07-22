import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const port = Number(process.env.PORT || 5173);

export default defineConfig({
  server: {
    host: true,
    allowedHosts: [".trycloudflare.com"],
    port,
    strictPort: true,
    hmr: false,
  },

  plugins: [
    remix({
      ignoredRouteFiles: ["**/.*"],
    }),
    tsconfigPaths(),
  ],
});