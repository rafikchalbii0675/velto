import {
  Page,
  Card,
  BlockStack,
  InlineStack,
  Text,
  Button,
} from "@shopify/polaris";
import { authenticate } from "~/shopify.server";

export async function loader({ request }) {
  await authenticate.admin(request);
  return null;
}

export default function VeltoCrypto() {
  return (
    <Page title="Crypto – Velto">
      <BlockStack gap="400">

        {/* Header */}
        <Card>
          <BlockStack gap="200">
            <Text as="h2" variant="headingMd">
              Module Crypto (en attente d’autorisation)
            </Text>

            <Text as="p">
              Velto prépare une extension sécurisée permettant la connexion de
              portefeuilles crypto (ETH, USDC, USDT, BTC) pour des fonctions
              avancées comme l’achat, la vente ou la gestion d’actifs numériques.
            </Text>

            <Text as="p">
              Pour garantir la sécurité maximale des marchands et de leurs
              boutiques, cette fonctionnalité est actuellement en attente
              d’autorisations uniques et de validations techniques.
            </Text>
          </BlockStack>
        </Card>

        {/* Statut */}
        <Card>
          <BlockStack gap="200">
            <Text as="h2" variant="headingMd">
              Statut actuel
            </Text>

            <BlockStack gap="100">
              <InlineStack align="space-between">
                <Text>Connexion wallet</Text>
                <Text>En attente</Text>
              </InlineStack>

              <InlineStack align="space-between">
                <Text>Transactions crypto</Text>
                <Text>En attente</Text>
              </InlineStack>

              <InlineStack align="space-between">
                <Text>Support ETH / USDC / USDT</Text>
                <Text>Prêt (désactivé)</Text>
              </InlineStack>

              <InlineStack align="space-between">
                <Text>Support BTC</Text>
                <Text>En développement</Text>
              </InlineStack>
            </BlockStack>
          </BlockStack>
        </Card>

        {/* Message de sécurité */}
        <Card>
          <BlockStack gap="200">
            <Text as="h2" variant="headingMd">
              Sécurité avant tout
            </Text>

            <Text as="p">
              Le module Crypto sera activé uniquement lorsque toutes les
              validations de sécurité, conformité et autorisations seront
              confirmées. Velto ne déploie aucune fonctionnalité crypto sans
              garantie totale pour les marchands.
            </Text>

            <InlineStack>
              <Button variant="secondary" disabled>
                Activation verrouillée
              </Button>
            </InlineStack>
          </BlockStack>
        </Card>

      </BlockStack>
    </Page>
  );
}
