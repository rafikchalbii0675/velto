// app/components/IAOpportunityCard.jsx

import React from "react";
import { Card, Text, Badge, Button, Stack } from "@shopify/polaris";

export default function IAOpportunityCard({ opportunity, onApply, loading }) {
  if (!opportunity) return null;

  const { title, description, impact, actionLabel, carrier, expiresAt } =
    opportunity;

  return (
    <Card title="Opportunité IA du jour" sectioned>
      <Stack vertical spacing="tight">
        <Stack alignment="center">
          <Text as="h3" variant="headingMd">
            {title}
          </Text>
          <Badge status="info">IA recommandée</Badge>
        </Stack>

        <Text as="p" variant="bodyMd">
          {description}
        </Text>

        <Stack spacing="tight">
          {impact?.conversion && (
            <Badge status="success">
              Conversion {impact.conversion}
            </Badge>
          )}
          {impact?.loyaltyPoints && (
            <Badge status="attention">
              Points fidélité {impact.loyaltyPoints}
            </Badge>
          )}
          {impact?.retention && (
            <Badge status="info">
              Rétention {impact.retention}
            </Badge>
          )}
        </Stack>

        <Text as="p" variant="bodySm" tone="subdued">
          Transporteur recommandé : {carrier} · Valide jusqu’au {expiresAt}
        </Text>

        <Stack distribution="trailing">
          <Button primary onClick={onApply} loading={loading}>
            {actionLabel}
          </Button>
        </Stack>
      </Stack>
    </Card>
  );
}
