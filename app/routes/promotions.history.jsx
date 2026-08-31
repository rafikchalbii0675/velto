import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import VeltoLayout from "../components/velto/VeltoLayout";

// Nouveau chemin PRO après organisation PowerShell
import { readHistory } from "../utils/history/history.server";

import {
  Page,
  Card,
  ResourceList,
  ResourceItem,
  Text,
  Badge,
} from "@shopify/polaris";

/* LOADER : lire l'historique Cozy Warm */
export async function loader() {
  const history = readHistory();
  return json({ history });
}

/* PAGE : Historique Cozy Warm */
export default function PromotionsHistoryRoute() {
  const { history } = useLoaderData();

  return (
    <VeltoLayout title="Historique des promotions Cozy Warm">
      <Page>
        <Card>
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
                    <Text as="span" variant="bodyMd" fontWeight="bold">
                      {title}
                    </Text>
                  </h3>

                  <div style={{ marginTop: "8px" }}>
                    <Badge status="info">{discount}%</Badge>
                  </div>

                  <div style={{ marginTop: "8px" }}>
                    <Text as="span" variant="bodySm" tone="subdued">
                      Produit : {productId}
                    </Text>
                  </div>

                  <div style={{ marginTop: "8px" }}>
                    <Text as="span" variant="bodyMd" fontWeight="bold">
                      Code :
                    </Text>{" "}
                    {discountCode}
                  </div>

                  <div style={{ marginTop: "8px" }}>
                    <Text as="span" variant="bodySm" tone="subdued">
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
