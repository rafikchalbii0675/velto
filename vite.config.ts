import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  server: {
    port: process.env.PORT ? Number(process.env.PORT) : 5173,
    allowedHosts: true,
    hmr: { clientPort: 443 },
  },
  plugins: [remix({ future: { v3_fetcherPersist: true, v3_relativeSplatPath: true, v3_throwAbortReason: true, v3_singleFetch: true, v3_lazyRouteDiscovery: true } })],
  resolve: { alias: { "~": path.resolve(__dirname, "./app") } },
});