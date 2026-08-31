import { analyzeShopifyStore } from "./shopify-analysis";

export async function generateAdvancedPromotion() {
  const analysis = await analyzeShopifyStore();

  const top = analysis.topSeller;
  const low = analysis.lowSeller;

  // IA Cozy Warm : logique simple mais intelligente
  if (low.sales === 0) {
    return {
      title: `Boost Cozy Warm -20% sur ${low.title}`,
      percentage: 20,
      reason: "Produit avec ventes très faibles",
    };
  }

  if (top.sales > 50) {
    return {
      title: `Cozy Bundle : ${top.title} + ${low.title}`,
      percentage: 15,
      reason: "Produit populaire combiné avec un produit lent",
    };
  }

  return {
    title: "Cozy Warm -10% sur les produits populaires",
    percentage: 10,
    reason: "Promotion générale basée sur les ventes",
  };
}
