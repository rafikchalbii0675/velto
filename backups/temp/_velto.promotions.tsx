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
    promotions: [
      { id: 1, title: "Promo T-shirt Velto", discount: "20%", product: "T-shirt Velto" },
      { id: 2, title: "Promo Bouteille Premium", discount: "15%", product: "Bouteille isotherme" },
      { id: 3, title: "Fin de série – Bracelet", discount: "30%", product: "Bracelet minimaliste" },
    ],
  });
}

export default function VeltoPromotions() {
  const { promotions } = useLoaderData();

  return (
    <Page title="Promotions – Velto">
      <BlockStack gap="400">
        {promotions.map((promo) => (
          <Card
            key={promo.id}
            padding="300"
            style={{
              backgroundColor: veltoGoldTheme.surface,
              borderRadius: veltoGoldTheme.radius,
              boxShadow: veltoGoldTheme.shadow,
            }}
          >
            <BlockStack gap="200">
              <InlineStack align="space-between">
                <Text variant="headingSm">{promo.title}</Text>
                <Text>{promo.discount}</Text>
              </InlineStack>

              <InlineStack align="space-between">
                <Text>Produit : {promo.product}</Text>
                <Text>Status : {promo.id === 3 ? "Expirée" : "Active"}</Text>
              </InlineStack>

              <InlineStack gap="200">
                <Button variant="primary">Modifier</Button>
                <Button tone="critical">Supprimer</Button>
              </InlineStack>
            </BlockStack>
          </Card>
        ))}
      </BlockStack>
    </Page>
  );
}
