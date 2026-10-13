import {
  Page,
  Card,
  BlockStack,
  Text,
  Checkbox,
  Button,
  InlineStack,
} from "@shopify/polaris";
import { useState } from "react";
import { authenticate } from "~/shopify.server";

import {
  veltoGoldTheme,
  cozyWarmTheme,
  veltoNightTheme,
} from "~/components/velto/VeltoTheme";

export async function loader({ request }) {
  await authenticate.admin(request);
  return null;
}

export default function VeltoSettings() {
  const [theme, setTheme] = useState("gold");

  const activeTheme =
    theme === "gold"
      ? veltoGoldTheme
      : theme === "cozy"
      ? cozyWarmTheme
      : veltoNightTheme;

  return (
    <Page title="Paramètres – Velto">
      <BlockStack gap="400">

        {/* Choix du thème */}
        <Card
          padding="300"
          style={{
            backgroundColor: activeTheme.surface,
            borderRadius: activeTheme.radius,
            boxShadow: activeTheme.shadow,
          }}
        >
          <BlockStack gap="200">
            <Text variant="headingMd">Thème Velto</Text>

            <InlineStack gap="200">
              <Button onClick={() => setTheme("gold")}>Velto Gold</Button>
              <Button onClick={() => setTheme("cozy")}>Cozy Warm</Button>
              <Button onClick={() => setTheme("night")}>Velto Night</Button>
            </InlineStack>
          </BlockStack>
        </Card>

        {/* Paramètres IA */}
        <Card
          padding="300"
          style={{
            backgroundColor: activeTheme.surface,
            borderRadius: activeTheme.radius,
            boxShadow: activeTheme.shadow,
          }}
        >
          <BlockStack gap="200">
            <Text variant="headingMd">Paramètres IA</Text>

            <Checkbox label="Activer les recommandations IA" checked />
            <Checkbox label="Optimisation automatique des descriptions" />
            <Checkbox label="Analyse IA des ventes" checked />

            <Button variant="primary">Enregistrer</Button>
          </BlockStack>
        </Card>

      </BlockStack>
    </Page>
  );
}
