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
    products: [
      { id: 1, title: "Tapis de yoga écologique", price: "39.99$", stock: 12 },
      { id: 2, title: "Bouteille isotherme premium", price: "29.99$", stock: 4 },
      { id: 3, title: "Bracelet minimaliste", price: "14.99$", stock: 0 },
    ],
  });
}

export default function VeltoProducts() {
  const { products } = useLoaderData();

  return (
    <Page title="Produits – Velto">
      <BlockStack gap="400">
        {products.map((p) => (
          <Card
            key={p.id}
            padding="300"
            style={{
              backgroundColor: veltoGoldTheme.surface,
              borderRadius: veltoGoldTheme.radius,
              boxShadow: veltoGoldTheme.shadow,
            }}
          >
            <BlockStack gap="200">
              <InlineStack align="space-between">
                <Text variant="headingSm">{p.title}</Text>
                <Text>{p.price}</Text>
              </InlineStack>

              <InlineStack align="space-between">
                <Text>Stock : {p.stock}</Text>
                <Text>Status : {p.stock > 0 ? "Actif" : "Rupture"}</Text>
              </InlineStack>

              <Button variant="primary">Optimiser avec IA</Button>
            </BlockStack>
          </Card>
        ))}
      </BlockStack>
    </Page>
  );
}
