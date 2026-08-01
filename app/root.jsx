import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import { AppProvider } from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";
import translations from "@shopify/polaris/locales/fr.json";

export function links() {
  return [];
}

export function meta() {
  return [
    { charset: "utf-8" },
    { title: "Velto" },
    { viewport: "width=device-width, initial-scale=1" },
  ];
}

export default function Root() {
  return (
    <html lang="fr">
      <head>
        <Meta />
        <Links />
      </head>

      <body>
        <AppProvider i18n={translations}>
          <Outlet />
        </AppProvider>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
