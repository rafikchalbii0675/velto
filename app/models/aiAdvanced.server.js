import { prisma } from "~/db.server";

export async function getAdvancedAI(shopId) {
  const products = await prisma.product.findMany({ where: { shopId } });
  const alerts = await prisma.alert.findMany({ where: { shopId } });
  const crypto = await prisma.cryptoSale.findMany({ where: { shopId } });

  const recommendations = [];
  const actions = [];
  const optimizations = [];

  // -----------------------------
  // IA : Recommandations produits
  // -----------------------------
  const lowSales = products.filter((p) => p.sales < 5);
  const highSales = products.filter((p) => p.sales > 500);

  if (lowSales.length > 0) {
    recommendations.push(
      `Vous avez ${lowSales.length} produits avec très peu de ventes. L’IA recommande une optimisation des descriptions ou une promotion ciblée.`
    );
  }

  if (highSales.length > 0) {
    recommendations.push(
      `${highSales.length} produits sont très performants. L’IA recommande de les mettre en avant dans votre boutique.`
    );
  }

  // -----------------------------
  // IA : Recommandations crypto
  // -----------------------------
  if (crypto.length === 0) {
    recommendations.push(
      "Aucune transaction crypto détectée. Activer les paiements crypto pourrait augmenter vos ventes."
    );
  } else if (crypto.length > 50) {
    recommendations.push(
      "Votre activité crypto est élevée. L’IA recommande de surveiller les frais de transaction."
    );
  }

  // -----------------------------
  // IA : Actions IA
  // -----------------------------
  if (alerts.some((a) => a.severity === "high")) {
    actions.push("Vérifier immédiatement les alertes critiques dans le Dashboard Sécurité IA.");
  }

  if (products.length > 100) {
    actions.push("Réduire le catalogue ou regrouper les produits pour améliorer la conversion.");
  }

  if (crypto.some((c) => c.amount > 5000)) {
    actions.push("Configurer une limite de transaction crypto pour éviter les fraudes.");
  }

  // -----------------------------
  // IA : Optimisations automatiques
  // -----------------------------
  if (products.some((p) => p.sales === 0 && p.price > 200)) {
    optimizations.push("L’IA recommande de baisser le prix des produits chers sans ventes.");
  }

  if (products.some((p) => p.sales > 1000)) {
    optimizations.push("L’IA recommande d’augmenter légèrement le prix des produits très performants.");
  }

  return {
    recommendations,
    actions,
    optimizations,
  };
}
