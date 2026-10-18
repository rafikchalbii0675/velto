import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Page, Card, DataTable, Badge, EmptyState, Text } from "@shopify/polaris";
import { getSponsors } from "../models/sponsors.js";

export async function loader() {
  const sponsors = await getSponsors();
  return json({ sponsors: sponsors || [] });
}

export default function SponsorsPage() {
  const { sponsors } = useLoaderData();
  if (!sponsors || sponsors.length === 0) {
    return (
      <Page title="Sponsors"><Card><EmptyState heading="Aucun sponsor"><p>Prêt pour BETA</p></EmptyState></Card></Page>
    );
  }
  const rows = sponsors.map((s) => [ s.name || s.email, <Badge tone="success">Actif</Badge>, new Date(s.createdAt).toLocaleDateString() ]);
  return (
    <Page title="Sponsors BETA" subtitle={`${sponsors.length} testeurs à $4`}>
      <Card><DataTable columnContentTypes={["text","text","text"]} headings={["Nom","Statut","Date"]} rows={rows} /></Card>
    </Page>
  );
}