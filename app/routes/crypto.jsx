import { Page, Card, Text } from "@shopify/polaris";
import VeltoLayout from "../components/velto/VeltoLayout";

export default function Crypto() {
  return (
    <VeltoLayout title="Crypto-commerce">
      <Page>
        <Card sectioned>
          <Text variant="headingLg">Crypto-commerce</Text>
          <div style={{ marginTop: "12px" }}>
            <Text variant="bodyMd">
              Paiements crypto, wallets et cashback Web3 — cette
              fonctionnalité arrive dans la version 2 de Velto.
            </Text>
          </div>
        </Card>
      </Page>
    </VeltoLayout>
  );
}