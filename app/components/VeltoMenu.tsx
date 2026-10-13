import { Navigation } from "@shopify/polaris";

export function VeltoMenu() {
  return (
    <Navigation location="/apps/velto">
      <Navigation.Section
        items={[
          {
            label: "Tableau de bord",
            url: "/apps/velto/dashboard",
          },
          {
            label: "Produits",
            url: "/apps/velto/products",
          },
          {
            label: "Promotions",
            url: "/apps/velto/promotions",
          },
          {
            label: "Analyse IA",
            url: "/apps/velto/analytics",
          },
          {
            label: "Notifications IA",
            url: "/apps/velto/notifications",
          },
          {
            label: "Historique IA",
            url: "/apps/velto/history",
          },
          {
            label: "Crypto (verrouillé)",
            url: "/apps/velto/crypto",
          },
          {
            label: "Paramètres",
            url: "/apps/velto/settings",
          },
        ]}
      />
    </Navigation>
  );
}
