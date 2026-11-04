import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    remix({
      ignoredRouteFiles: ["**/.*"],
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
    }),
    tsconfigPaths(),
  ],
  server: {
    port: Number(process.env.PORT) || 52823,
    host: true,
    allowedHosts: true,
    hmr: {
      clientPort: 443,
    },
  },
  build: { rollupOptions: { external: [] } },
  ssr: { noExternal: [/@shopify\//] },
});