import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import {
  Page,
  Card,
  DataTable,
  Badge,
  EmptyState,
  Text,
} from "@shopify/polaris";
import { getSponsors } from "../models/sponsors.js";

export async function loader() {
  const sponsors = await getSponsors();
  return json({ sponsors: sponsors || [] });
}

export default function SponsorsPage() {
  const { sponsors } = useLoaderData();

  if (!sponsors || sponsors.length === 0) {
    return (
      <Page title="Sponsors">
        <Card>
          <EmptyState
            heading="Aucun sponsor pour le moment"
            image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-missing-data.png"
          >
            <p>Prêt pour le BETA à $4.</p>
          </EmptyState>
        </Card>
      </Page>
    );
  }

  const rows = sponsors.map((s) => [
    s.name || s.email || "N/A",
    <Badge tone="success">Actif</Badge>,
    s.createdAt ? new Date(s.createdAt).toLocaleDateString() : "-",
  ]);

  return (
    <Page title="Sponsors BETA" subtitle={`${sponsors.length} testeurs Early Bird à $4`}>
      <Card>
        <DataTable
          columnContentTypes={["text", "text", "text"]}
          headings={["Nom / Email", "Statut", "Date"]}
          rows={rows}
        />
      </Card>
      <div style={{ marginTop: "16px" }}>
        <Card>
          <Text as="p" variant="bodyMd">
            Page prête pour BETA - Fausses données pour valider le build. Vraie data après.
          </Text>
        </Card>
      </div>
    </Page>
  );
}