import VeltoLayout from "../components/velto/VeltoLayout";
import { useEffect, useState } from "react";
import {
  Card,
  Page,
  Layout,
  Badge,
  BlockStack,
  InlineStack,
  Text,
} from "@shopify/polaris";

export default function Products() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setProducts([
        {
          id: 1,
          title: "T-shirt Velto Premium",
          views: 310,
          sales: 120,
          inventory: 8,
        },
        {
          id: 2,
          title: "Casquette Velto",
          views: 250,
          sales: 95,
          inventory: 15,
        },
        {
          id: 3,
          title: "Sweat Édition Limitée",
          views: 180,
          sales: 60,
          inventory: 4,
        },
      ]);
      setLoading(false);
    }, 1200);
  }, []);

  if (loading) {
    return (
      <Page title="Produits">
        <Card>
          <Card.Section>
            <Text variant="headingLg">Chargement…</Text>
            <Text variant="bodyMd" tone="subdued">
              Velto analyse vos produits.
            </Text>
          </Card.Section>
        </Card>
      </Page>
    );
  }

  return (
    <Page title="Produits">
      <Layout>
        <Layout.Section>
          <BlockStack gap="400">
            {products.map((p) => (
              <Card
                key={p.id}
                background="bg-surface-secondary"
                padding="400"
                roundedAbove="sm"
                style={{
                  backgroundColor: "#fdf8f3", // Cozy Warm crème/caramel
                  borderRadius: "14px",
                  border: "1px solid #e8d9c5",
                  boxShadow: "0px 2px 6px rgba(0,0,0,0.06)",
                }}
              >
                <BlockStack gap="300">
                  <Text variant="headingMd">{p.title}</Text>

                  <InlineStack gap="400" wrap={false}>
                    <Badge tone="attention">
                      Vues : {p.views}
                    </Badge>

                    <Badge tone="success">
                      Ventes : {p.sales}
                    </Badge>

                    <Badge tone={p.inventory < 10 ? "critical" : "info"}>
                      Stock : {p.inventory}
                    </Badge>
                  </InlineStack>
                </BlockStack>
              </Card>
            ))}
          </BlockStack>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
