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
    { charSet: "utf-8" },
    { title: "Velto" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
  ];
}

export default function Root() {
  return (
    <html lang="fr">
      <head>
        <Meta />

        {/*  LIGNE OBLIGATOIRE POUR CORRIGER LES ACCENTS */}
        <meta charSet="utf-8" />

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
