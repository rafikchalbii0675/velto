import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import VeltoLayout from "../components/velto/VeltoLayout";

// Import PRO après organisation PowerShell
import { analyzePromotionPerformance } from "../utils/ai/ai.performance.server";
import { readHistory } from "../utils/history/history.server";

import {
  Page,
  Card,
  ResourceList,
  ResourceItem,
  Text,
  Badge,
} from "@shopify/polaris";

/* LOADER : analyse IA + historique */
export async function loader() {
  const performance = await analyzePromotionPerformance();
  const history = readHistory();

  return json({ performance, history });
}

/* PAGE : Performance des promotions Cozy Warm */
export default function PromotionsPerformanceRoute() {
  const { performance, history } = useLoaderData();

  return (
    <VeltoLayout title="Performance des promotions Cozy Warm">
      <Page>
        {/* Analyse IA */}
        <Card title="Analyse IA des promotions" sectioned>
          <p style={{ fontSize: "16px", marginBottom: "12px" }}>
            Voici l’analyse IA de vos promotions Cozy Warm.
          </p>

          <div style={{ marginTop: "12px" }}>
            <Badge status="success">
              Score IA : {performance.score} / 100
            </Badge>
          </div>

          <div style={{ marginTop: "12px" }}>
            <Text variant="bodyMd" tone="subdued">
              {performance.comment}
            </Text>
          </div>
        </Card>

        {/* Historique */}
        <Card title="Historique des promotions" sectioned>
          <ResourceList
            resourceName={{ singular: "promotion", plural: "promotions" }}
            items={history}
            renderItem={(item) => {
              const {
                title,
                discount,
                productId,
                discountCode,
                createdAt,
              } = item;

              return (
                <ResourceItem id={discountCode}>
                  <h3>
                    <Text variant="bodyMd" fontWeight="bold">
                      {title}
                    </Text>
                  </h3>

                  <div style={{ marginTop: "8px" }}>
                    <Badge status="info">{discount}%</Badge>
                  </div>

                  <div style={{ marginTop: "8px" }}>
                    <Text variant="bodyMd" tone="subdued">
                      Produit : {productId}
                    </Text>
                  </div>

                  <div style={{ marginTop: "8px" }}>
                    <Text variant="bodyMd" fontWeight="bold" as="span">
                      Code :
                    </Text>{" "}
                    {discountCode}
                  </div>

                  <div style={{ marginTop: "8px" }}>
                    <Text variant="bodyMd" tone="subdued">
                      Créé le : {new Date(createdAt).toLocaleString()}
                    </Text>
                  </div>
                </ResourceItem>
              );
            }}
          />
        </Card>
      </Page>
    </VeltoLayout>
  );
}