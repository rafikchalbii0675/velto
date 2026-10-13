import {
  Page,
  Card,
  BlockStack,
  InlineStack,
  Text,
  Button,
} from "@shopify/polaris";
import { authenticate } from "~/shopify.server";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export async function loader({ request }) {
  await authenticate.admin(request);

  return json({
    alerts: [
      {
        id: 1,
        type: "Produit à optimiser",
        message: "Le Tapis de yoga écologique pourrait augmenter sa conversion.",
      },
      {
        id: 2,
        type: "Stock faible",
        message: "Bracelet minimaliste : stock inférieur à 3 unités.",
      },
      {
        id: 3,
        type: "Promotion expirée",
        message: "La promotion Bouteille Premium est arrivée à expiration.",
      },
    ],
  });
}

export default function VeltoNotifications() {
  const { alerts } = useLoaderData();

  return (
    <Page title="Notifications IA – Velto">
      <BlockStack gap="400">

        <Card>
          <BlockStack gap="200">
            <Text as="h2" variant="headingMd">
              Alertes IA
            </Text>

            <BlockStack gap="300">
              {alerts.map((a) => (
                <Card key={a.id} padding="300">
                  <BlockStack gap="200">
                    <InlineStack align="space-between">
                      <Text variant="headingSm">{a.type}</Text>
                    </InlineStack>

                    <Text>{a.message}</Text>

                    <InlineStack>
                      <Button variant="primary">Voir le produit</Button>
                    </InlineStack>
                  </BlockStack>
                </Card>
              ))}
            </BlockStack>
          </BlockStack>
        </Card>

      </BlockStack>
    </Page>
  );
}
