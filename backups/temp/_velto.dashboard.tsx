import {
  Page,
  Card,
  BlockStack,
  InlineStack,
  Text,
} from "@shopify/polaris";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { authenticate } from "~/shopify.server";

// Import du thème Velto Gold
import { veltoGoldTheme } from "~/components/velto/VeltoTheme";

export async function loader({ request }) {
  await authenticate.admin(request);

  return json({
    summary: "Votre boutique a généré une croissance stable cette semaine.",
    sales7days: "$1,240",
    topProducts: [
      { title: "Produit A", sales: "$420" },
      { title: "Produit B", sales: "$310" },
      { title: "Produit C", sales: "$210" },
    ],
    notifications: [
      "2 produits nécessitent une optimisation",
      "Une promotion se termine bientôt",
    ],
  });
}

export default function VeltoDashboard() {
  const data = useLoaderData();

  return (
    <Page title="Velto – Tableau de bord">
      <BlockStack gap="400">

        {/* Résumé IA */}
        <Card
          padding="300"
          style={{
            backgroundColor: veltoGoldTheme.surface,
            borderRadius: veltoGoldTheme.radius,
            boxShadow: veltoGoldTheme.shadow,
          }}
        >
          <BlockStack gap="200">
            <Text as="h2" variant="headingMd">
              Résumé intelligent
            </Text>
            <Text as="p">{data.summary}</Text>
          </BlockStack>
        </Card>

        {/* Statistiques */}
        <Card
          padding="300"
          style={{
            backgroundColor: veltoGoldTheme.surface,
            borderRadius: veltoGoldTheme.radius,
            boxShadow: veltoGoldTheme.shadow,
          }}
        >
          <BlockStack gap="200">
            <Text as="h2" variant="headingMd">
              Statistiques des 7 derniers jours
            </Text>
            <Text as="p">Ventes totales : {data.sales7days}</Text>
          </BlockStack>
        </Card>

        {/* Produits performants */}
        <Card
          padding="300"
          style={{
            backgroundColor: veltoGoldTheme.surface,
            borderRadius: veltoGoldTheme.radius,
            boxShadow: veltoGoldTheme.shadow,
          }}
        >
          <BlockStack gap="200">
            <Text as="h2" variant="headingMd">
              Produits performants
            </Text>

            <BlockStack gap="100">
              {data.topProducts.map((p, i) => (
                <InlineStack key={i} align="space-between">
                  <Text>{p.title}</Text>
                  <Text>{p.sales}</Text>
                </InlineStack>
              ))}
            </BlockStack>
          </BlockStack>
        </Card>

        {/* Notifications */}
        <Card
          padding="300"
          style={{
            backgroundColor: veltoGoldTheme.surface,
            borderRadius: veltoGoldTheme.radius,
            boxShadow: veltoGoldTheme.shadow,
          }}
        >
          <BlockStack gap="200">
            <Text as="h2" variant="headingMd">
              Notifications
            </Text>

            <BlockStack gap="100">
              {data.notifications.map((n, i) => (
                <Text key={i}>{n}</Text>
              ))}
            </BlockStack>
          </BlockStack>
        </Card>

      </BlockStack>
    </Page>
  );
}
