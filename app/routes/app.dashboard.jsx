import VeltoLayout from "../components/velto/VeltoLayout";
import {
  Page,
  Layout,
  Card,
  TextContainer,
  Text,
  Button,
} from "@shopify/polaris";
import { Link, useLoaderData } from "@remix-run/react";
import { authenticate } from "../shopify.server";

import IAChart from "../components/IAChart";
import { predictSales7Days } from "../utils/ai.sales.predict";
import { analyzeProduct } from "../utils/ai/ai.product.analysis.server";
import { generateMarketingText } from "../utils/ai/ai.marketing.server";

// Tout le code qui appelle des modules .server.js doit vivre ici,
// dans loader(). Cette fonction ne tourne QUE côté serveur —
// c'est ce qui évite l'erreur "Server-only module referenced by client".
export async function loader({ request }) {
  const { admin } = await authenticate.admin(request);

  // --- Vraies données Shopify ---

  // Nombre de produits actifs
  const productsCountResponse = await admin.graphql(`#graphql
    query {
      productsCount(query: "status:active") {
        count
      }
    }
  `);
  const productsCountJson = await productsCountResponse.json();
  const productsCount = productsCountJson.data.productsCount.count;

  // Promotions/réductions actives
  const discountsResponse = await admin.graphql(`#graphql
    query {
      codeDiscountNodes(first: 50, query: "status:active") {
        edges {
          node {
            id
          }
        }
      }
    }
  `);
  const discountsJson = await discountsResponse.json();
  const activePromotionsCount = discountsJson.data.codeDiscountNodes.edges.length;

  // Un vrai produit pour l'analyse IA (le premier produit actif trouvé)
  const productResponse = await admin.graphql(`#graphql
    query {
      products(first: 1, query: "status:active") {
        edges {
          node {
            id
            title
            priceRangeV2 {
              minVariantPrice {
                amount
              }
            }
          }
        }
      }
    }
  `);
  const productJson = await productResponse.json();
  const realProduct = productJson.data.products.edges[0]?.node;

  // --- Données encore simulées (à connecter plus tard) ---
  // Shopify ne fournit pas directement le coût, le CTR ou les vues par produit
  // via l'API Admin standard — ça nécessite Shopify Analytics ou une saisie
  // manuelle du marchand. En attendant, on estime le coût à 40% du prix
  // (marge courante e-commerce) et on garde CTR/conversion/vues en exemple.
  const realPrice = realProduct
    ? parseFloat(realProduct.priceRangeV2.minVariantPrice.amount)
    : 40;
  const estimatedCost = realPrice * 0.4;

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

  const productAI = await analyzeProduct({
    productName: realProduct ? realProduct.title : "Produit Cozy Warm",
    price: realPrice,
    cost: estimatedCost,
    conversion: 2.1, // simulé — pas encore connecté à de vraies analytics
    views: 300, // simulé — pas encore connecté à de vraies analytics
  });

  const marketing = generateMarketingText({
    title: "Promotion T-shirt Velto",
    discount: 20,
    productName: realProduct ? realProduct.title : "le T-shirt Velto édition Cozy Warm",
  });

  return {
    ai,
    sales,
    productAI,
    marketing,
    productsCount,
    activePromotionsCount,
  };
}

export default function DashboardRoute() {
  // Le composant ne fait plus AUCUN appel direct aux modules .server.js.
  // Il récupère simplement le résultat déjà calculé par loader().
  const { ai, sales, productAI, marketing, productsCount, activePromotionsCount } =
    useLoaderData();

  return (
    <VeltoLayout title="Dashboard Cozy Warm">
      <Page>
        <Layout>

          {/* Bloc Vue d'ensemble - vraies données Shopify */}
          <Layout.Section>
            <Card title="Vue d'ensemble de la boutique" sectioned>
              <TextContainer>
                <Text variant="bodyMd" fontWeight="bold">
                  {productsCount} produits actifs
                </Text>
                <Text variant="bodyMd" fontWeight="bold">
                  {activePromotionsCount} promotions en cours
                </Text>
              </TextContainer>
            </Card>
          </Layout.Section>

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

          {/* Bloc Analyse produit - vrai produit Shopify */}
          <Layout.Section>
            <Card title={`Analyse produit : ${productAI.productName || "Produit"}`} sectioned>
              <TextContainer>
                <Text variant="bodyMd" fontWeight="bold">
                  IA produit : marge, performance, recommandation.
                </Text>
                <p>
                  Analyse basée sur un vrai produit de ta boutique.
                </p>
              </TextContainer>
              <div style={{ marginTop: "12px" }}>
                <p>Marge : {productAI.margin.toFixed(2)}$</p>
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