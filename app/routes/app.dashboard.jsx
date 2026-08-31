import VeltoLayout from "../components/velto/VeltoLayout";
import {

  Page,
  Layout,
  Card,
  TextContainer,
  Text,
  Button,
} from "@shopify/polaris";
import { Link } from "@remix-run/react";

import IAChart from "../components/IAChart";
import { predictSales7Days } from "../utils/ai.sales.predict.server";
import { analyzeProduct } from "../utils/ai.product.analysis.server";
import { generateMarketingText } from "../utils/ai.marketing.server";

export default function DashboardRoute() {
  // Données IA de base (tu pourras les remplacer par des vraies valeurs)
  const ai = {
    marginRate: 40,
    newMarginRate: 25,
    ctr: 3.2,
    conversion: 2.8,
  };

  const sales = predictSales7Days({
    ctr: ai.ctr,
    conversion: ai.conversion,
    discount: 20,
    marginRate: ai.marginRate,
  });

  const productAI = analyzeProduct({
    price: 40,
    cost: 12,
    conversion: 2.1,
    views: 300,
  });

  const marketing = generateMarketingText({
    title: "Promotion T-shirt Velto",
    discount: 20,
    productName: "le T-shirt Velto édition Cozy Warm",
  });

  return (
    <VeltoLayout title="Dashboard Cozy Warm">
      <Page>
        <Layout>

          {/* Bloc Promotions + IA */}
          <Layout.Section>
            <Card title="Promotions intelligentes" sectioned>
              <TextContainer>
                <Text variant="bodyMd" fontWeight="bold">
                  Crée des promotions avec IA Velto.
                </Text>
                <p>
                  Génère des réductions, codes promo, analyse de marge,
                  CTR et conversion.
                </p>
              </TextContainer>
              <Link to="/promotions">
                <Button primary>Ouvrir la page Promotions</Button>
              </Link>
            </Card>
          </Layout.Section>

          {/* Bloc Historique Cozy Warm */}
          <Layout.Section>
            <Card title="Historique Cozy Warm" sectioned>
              <TextContainer>
                <Text variant="bodyMd" fontWeight="bold">
                  Toutes les promotions créées.
                </Text>
                <p>
                  Historique persistant, stocké dans Velto, avec dates,
                  produits et codes.
                </p>
              </TextContainer>
              <Link to="/promotions.history">
                <Button>Voir l’historique</Button>
              </Link>
            </Card>
          </Layout.Section>

          {/* Bloc Performance des promotions */}
          <Layout.Section>
            <Card title="Performance des promotions" sectioned>
              <TextContainer>
                <Text variant="bodyMd" fontWeight="bold">
                  Lecture réelle des PriceRules Shopify.
                </Text>
                <p>
                  Visualise les promotions actives, leurs codes, leurs
                  produits et leurs dates.
                </p>
              </TextContainer>
              <Link to="/promotions.performance">
                <Button>Voir la performance</Button>
              </Link>
            </Card>
          </Layout.Section>

          {/* Bloc Graphique IA */}
          <Layout.Section>
            <Card title="Graphique IA Cozy Warm" sectioned>
              <TextContainer>
                <Text variant="bodyMd" fontWeight="bold">
                  Visualisation de la marge, du CTR et de la conversion.
                </Text>
                <p>
                  Basé sur la dernière promotion analysée par l’IA Velto.
                </p>
              </TextContainer>
              <div style={{ marginTop: "20px" }}>
                <IAChart ai={ai} />
              </div>
            </Card>
          </Layout.Section>

          {/* Bloc Prévision des ventes 7 jours */}
          <Layout.Section>
            <Card title="Prévision des ventes (7 jours)" sectioned>
              <TextContainer>
                <Text variant="bodyMd" fontWeight="bold">
                  Estimation IA des ventes et revenus.
                </Text>
                <p>
                  Basée sur le discount, la marge, le CTR et la conversion.
                </p>
              </TextContainer>
              <div style={{ marginTop: "12px" }}>
                {sales.days.map((d) => (
                  <p key={d.day}>
                    {d.day} — {d.orders} ventes — {d.revenue}$ revenus
                  </p>
                ))}
              </div>
            </Card>
          </Layout.Section>

          {/* Bloc Analyse produit Cozy Warm */}
          <Layout.Section>
            <Card title="Analyse produit Cozy Warm" sectioned>
              <TextContainer>
                <Text variant="bodyMd" fontWeight="bold">
                  IA produit : marge, performance, recommandation.
                </Text>
                <p>
                  Analyse un produit Cozy Warm pour optimiser prix et conversion.
                </p>
              </TextContainer>
              <div style={{ marginTop: "12px" }}>
                <p>Marge : {productAI.margin}$</p>
                <p>Marge % : {productAI.marginRate}%</p>
                <p>Performance : {productAI.performance}</p>
                <p>Recommandation : {productAI.recommendation}</p>
              </div>
            </Card>
          </Layout.Section>

          {/* Bloc IA Marketing */}
          <Layout.Section>
            <Card title="IA Marketing Cozy Warm" sectioned>
              <TextContainer>
                <Text variant="bodyMd" fontWeight="bold">
                  Texte de promotion généré automatiquement.
                </Text>
                <p>
                  Utilise l’IA Cozy Warm pour créer un texte marketing prêt à publier.
                </p>
              </TextContainer>
              <div style={{ marginTop: "12px", whiteSpace: "pre-line" }}>
                {marketing}
              </div>
            </Card>
          </Layout.Section>

          {/* Bloc Crypto & Bonus */}
          <Layout.Section>
            <Card title="Crypto & Bonus Velto" sectioned>
              <TextContainer>
                <Text variant="bodyMd" fontWeight="bold">
                  Espace réservé pour les modules crypto Velto.
                </Text>
                <p>
                  Bonus crypto, cashback, IA financière Cozy Warm.
                </p>
              </TextContainer>
              <Link to="/crypto">
                <Button>Ouvrir la page Crypto</Button>
              </Link>
            </Card>
          </Layout.Section>

        </Layout>
      </Page>
    </VeltoLayout>
  );
}