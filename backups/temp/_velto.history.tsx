import {
  Page,
  Card,
  BlockStack,
  InlineStack,
  Text,
} from "@shopify/polaris";
import { authenticate } from "~/shopify.server";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export async function loader({ request }) {
  await authenticate.admin(request);

  return json({
    history: [
      {
        id: 1,
        module: "Optimisation IA",
        action: "Description optimisée pour Tapis de yoga",
        date: "2026-09-20 14:22",
      },
      {
        id: 2,
        module: "Promotion IA",
        action: "Suggestion de réduction appliquée : 10%",
        date: "2026-09-18 09:10",
      },
      {
        id: 3,
        module: "Analyse IA",
        action: "Analyse des ventes hebdomadaires générée",
        date: "2026-09-17 16:45",
      },
    ],
  });
}

export default function VeltoHistory() {
  const { history } = useLoaderData();

  return (
    <Page title="Historique des actions IA – Velto">
      <BlockStack gap="400">

        <Card>
          <BlockStack gap="200">
            <Text as="h2" variant="headingMd">
              Historique IA
            </Text>

            <BlockStack gap="300">
              {history.map((h) => (
                <Card key={h.id} padding="300">
                  <BlockStack gap="200">

                    <InlineStack align="space-between">
                      <Text variant="headingSm">{h.module}</Text>
                      <Text>{h.date}</Text>
                    </InlineStack>

                    <Text>{h.action}</Text>

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
