// app/routes/app.opportunity.jsx

import React, { useState } from "react";
import { json } from "@remix-run/node";
import { useLoaderData, useFetcher } from "@remix-run/react";
import { Page, Layout, Text } from "@shopify/polaris";

import IAOpportunityCard from "~/components/IAOpportunityCard";

// IMPORT CORRIGÉ (FINALEMENT LE BON)
import {
  getDailyOpportunity,
  applyDailyOpportunity,
} from "../utils/ai/opportunity.server";

// ◆ Loader : récupère l’opportunité IA du jour
export async function loader({ request }) {
  // TODO: récupérer le marchand depuis la session Shopify
  const merchant = {
    id: "merchant-123",
    name: "Boutique Demo Velto",
  };

  const stats = {}; // TODO: brancher tes stats réelles

  // Appel IA (corrigé)
  const opportunity = await getDailyOpportunity({ merchant, stats });

  return json({ opportunity, merchant });
}

// ◆ Action : applique l’opportunité IA
export async function action({ request }) {
  const formData = await request.formData();

  const opportunity = JSON.parse(formData.get("opportunity"));
  const merchant = JSON.parse(formData.get("merchant"));

  const result = await applyDailyOpportunity({ opportunity, merchant });

  return json(result);
}

// ◆ Page React
export default function OpportunityRoute() {
  const { opportunity, merchant } = useLoaderData();
  const fetcher = useFetcher();

  const [activated, setActivated] = useState(false);

  const handleActivate = () => {
    fetcher.submit(
      {
        opportunity: JSON.stringify(opportunity),
        merchant: JSON.stringify(merchant),
      },
      { method: "post" }
    );

    setActivated(true);
  };

  return (
    <Page title="Opportunité IA du jour">
      <Layout>
        <Layout.Section>
          <IAOpportunityCard
            opportunity={opportunity}
            activated={activated}
            onActivate={handleActivate}
          />

          {fetcher.data?.success && (
            <Text variant="bodyMd" tone="success">
              {fetcher.data.message}
            </Text>
          )}
        </Layout.Section>
      </Layout>
    </Page>
  );
}
