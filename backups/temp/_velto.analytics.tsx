import {
  Page,
  Card,
  BlockStack,
  InlineStack,
  Text,
  Button,
} from "@shopify/polaris";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { authenticate } from "~/shopify.server";
import { veltoGoldTheme } from "~/components/velto/VeltoTheme";

export async function loader({ request }) {
  await authenticate.admin(request);

  return json({
    insights: [
      "Vos ventes ont augmenté de 12% cette semaine.",
      "Les produits à moins de 20$ performent mieux que la moyenne.",
      "Les descriptions longues augmentent la conversion de 8%.",
    ],
    recommendations: [
      { id: 1, action: "Optimiser la description", product: "Tapis de yoga écologique" },
      { id: 2, action: "Ajouter une promotion de 10%", product: "Bouteille isotherme premium" },
      { id: 3, action: "Augmenter le stock", product: "Bracelet minimaliste" },
    ],
  });
}

export default function VeltoAnalytics() {
  const { insights, recommendations } = useLoaderData();

  return (
    <Page title="Analyse IA – Velto">
      <BlockStack gap="400">

        <Card
          padding="300"
          style={{
            backgroundColor: veltoGoldTheme.surface,
            borderRadius: veltoGoldTheme.radius,
            boxShadow: veltoGoldTheme.shadow,
          }}
        >
          <BlockStack gap="200">
            <Text variant="headingMd">Résumé intelligent</Text>
            {insights.map((i, index) => (
              <Text key={index}>{i}</Text>
            ))}
          </BlockStack>
        </Card>

        <Card
          padding="300"
          style={{
            backgroundColor: veltoGoldTheme.surface,
            borderRadius: veltoGoldTheme.radius,
            boxShadow: veltoGoldTheme.shadow,
          }}
        >
          <BlockStack gap="200">
            <Text variant="headingMd">Recommandations IA</Text>

            {recommendations.map((rec) => (
              <Card key={rec.id} padding="200">
                <BlockStack gap="200">
                  <InlineStack align="space-between">
                    <Text variant="headingSm">{rec.action}</Text>
                    <Text>{rec.product}</Text>
                  </InlineStack>

                  <Button variant="primary">Appliquer</Button>
                </BlockStack>
              </Card>
            ))}
          </BlockStack>
        </Card>

      </BlockStack>
    </Page>
  );
}
