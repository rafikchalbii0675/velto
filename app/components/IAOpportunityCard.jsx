// app/components/IAOpportunityCard.jsx

import React from "react";
import { Card, Text, Badge, Button, InlineStack, BlockStack } from "@shopify/polaris";

export default function IAOpportunityCard({ opportunity, onApply, loading }) {
  if (!opportunity) return null;

  const { title, description, impact, actionLabel, carrier, expiresAt } =
    opportunity;

  return (
    <Card title="Opportunité IA du jour" sectioned>
      <BlockStack gap="4">
        
        <InlineStack align="center" gap="2">
          <Text as="h3" variant="headingMd">
            {title}
          </Text>
          <Badge status="info">IA recommandée</Badge>
        </InlineStack>

        <Text as="p" variant="bodyMd">
          {description}
        </Text>

        <InlineStack gap="2">
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
        </InlineStack>

        <Text as="p" variant="bodySm" tone="subdued">
          Transporteur recommandé : {carrier} · Valide jusqu’au {expiresAt}
        </Text>

        <InlineStack align="end">
          <Button primary onClick={onApply} loading={loading}>
            {actionLabel}
          </Button>
        </InlineStack>

      </BlockStack>
    </Card>
  );
}
