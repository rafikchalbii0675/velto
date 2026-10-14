import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Page, Card, Text } from "@shopify/polaris";
import { authenticate } from "../shopify.server";

export async function loader({ request }) {
  const { admin } = await authenticate.admin(request);

  const query = `
    {
      productsCount
      ordersCount
    }
  `;

  const response = await admin.graphql(query);
  const data = await response.json();

  return json({
    productsCount: data.data.productsCount,
    ordersCount: data.data.ordersCount,
  });
}

export default function Dashboard() {
  const { productsCount, ordersCount } = useLoaderData();

  return (
    <Page title="Dashboard Velto">
      <Card>
        <Text variant="headingLg">Statistiques Velto</Text>
        <Text variant="bodyLg">Produits : {productsCount}</Text>
        <Text variant="bodyLg">Commandes : {ordersCount}</Text>
      </Card>
    </Page>
  );
}
