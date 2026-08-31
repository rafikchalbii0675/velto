// app/routes/app.opportunity.jsx

import React, { useState } from "react";
import { json } from "@remix-run/node";
import { useLoaderData, useFetcher } from "@remix-run/react";
import { Page, Layout, Text } from "@shopify/polaris";

import IAOpportunityCard from "~/components/IAOpportunityCard";
import {
  getDailyOpportunity,
  applyDailyOpportunity,
} from "~/utils/ia/opportunity.server";

// 🔹 Loader : récupère l’opportunité IA du jour
export async function loader({ request }) {
  // TODO: récupérer le marchand depuis la session Shopify
  const merchant = {
    id: "merchant-123",
    name: "Boutique Demo Velto",
  };

  const stats = {}; // TODO: brancher tes stats réelles

  const opportunity = await getDailyOpportunity({ merchant, stats });

  return json({ opportunity, merchant });
}

// 🔹 Action : applique l’opportunité (création promo, etc.)
export async function action({ request }) {
  const formData = await request.formData();
  const opportunityId = formData.get("opportunityId");

  // TODO: récupérer le marchand depuis la session Shopify
  const merchant = {
    id: "merchant-123",
    name: "Boutique Demo Velto",
  };

  // Dans un vrai cas, tu retrouverais l’opportunité par ID
  const opportunity = await getDailyOpportunity({ merchant, stats: {} });

  if (!opportunity || opportunity.id !== opportunityId) {
    return json(
      { success: false, message: "Opportunité IA introuvable." },
      { status: 400 }
    );
  }

  const result = await applyDailyOpportunity({ opportunity, merchant });

  return json(result);
}

export default function IAOpportunityPage() {
  const { opportunity, merchant } = useLoaderData();
  const fetcher = useFetcher();
  const [localMessage, setLocalMessage] = useState(null);

  const loading = fetcher.state !== "idle";

  const handleApply = () => {
    setLocalMessage(null);
    fetcher.submit(
      { opportunityId: opportunity.id },
      { method: "post" }
    );
  };

  React.useEffect(() => {
    if (fetcher.data?.message) {
      setLocalMessage(fetcher.data.message);
    }
  }, [fetcher.data]);

  return (
    <Page title="Opportunité IA du jour">
      <Layout>
        <Layout.Section>
          <Text as="p" variant="bodyMd" tone="subdued">
            Marchand : {merchant.name}
          </Text>
        </Layout.Section>

        <Layout.Section>
          <IAOpportunityCard
            opportunity={opportunity}
            onApply={handleApply}
            loading={loading}
          />
        </Layout.Section>

        {localMessage && (
          <Layout.Section>
            <Text as="p" variant="bodyMd" tone="success">
              {localMessage}
            </Text>
          </Layout.Section>
        )}
      </Layout>
    </Page>
  );
}
