import {
  Page,
  Card,
  BlockStack,
  Text,
  Button,
  InlineStack,
} from "@shopify/polaris";
import { authenticate } from "~/shopify.server";

export async function loader({ request }) {
  await authenticate.admin(request);
  return null;
}

export default function VeltoOnboarding() {
  return (
    <Page title="Bienvenue sur Velto">
      <BlockStack gap="400">

        <Card>
          <BlockStack gap="200">
            <Text as="h1" variant="headingLg">
              Bienvenue dans Velto
            </Text>

            <Text as="p">
              Velto est votre assistant IA pour analyser vos ventes, optimiser vos produits,
              améliorer vos promotions et préparer des fonctionnalités avancées comme la crypto.
            </Text>

            <Text as="p">
              Avant de commencer, voici les étapes pour configurer votre expérience.
            </Text>
          </BlockStack>
        </Card>

        <Card>
          <BlockStack gap="200">
            <Text as="h2" variant="headingMd">
              Étapes de démarrage
            </Text>

            <BlockStack gap="100">
              <Text>1. Explorer le tableau de bord</Text>
              <Text>2. Activer les recommandations IA</Text>
              <Text>3. Vérifier vos produits</Text>
              <Text>4. Configurer vos promotions</Text>
              <Text>5. Personnaliser vos paramètres</Text>
            </BlockStack>

            <InlineStack>
              <Button variant="primary" url="/apps/velto/dashboard">
                Commencer
              </Button>
            </InlineStack>
          </BlockStack>
        </Card>

      </BlockStack>
    </Page>
  );
}
