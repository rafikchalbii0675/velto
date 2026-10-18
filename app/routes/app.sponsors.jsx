import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import {
  Page,
  Card,
  Text,
  DataTable,
  Badge,
  EmptyState,
} from "@shopify/polaris";

// ✅ LOADER - SEUL ENDROIT AUTORISÉ POUR IMPORTER .server.js
export async function loader({ request }) {
  // On importe DYNAMIQUEMENT pour que Vite ne le mette pas côté client
  const { getSponsors } = await import("../models/sponsors.server.js");
  
  try {
    const sponsors = await getSponsors();
    return json({ sponsors: sponsors || [] });
  } catch (error) {
    console.error("Sponsors loader error:", error);
    return json({ sponsors: [] });
  }
}

// ✅ COMPOSANT - 100% CLIENT, AUCUN .server.js ICI
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
            <p>Les sponsors apparaîtront ici après le BETA.</p>
          </EmptyState>
        </Card>
      </Page>
    );
  }

  const rows = sponsors.map((s) => [
    s.name || s.email || "N/A",
    <Badge key={s.id} tone="success">Actif</Badge>,
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
            Page prête pour BETA - Uniquement les 3 fonctionnalités actives.
            BOSS IA est caché.
          </Text>
        </Card>
      </div>
    </Page>
  );
}