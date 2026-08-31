// app/utils/ai/ai.suggestions.server.js

// IMPORTANT : aucune dépendance "~" → chemins relatifs uniquement
import { prisma } from "../../db.server";

// Génération d’une promotion simple (Cozy)
export async function generateCozyPromotion(shopId) {
  // Récupérer quelques données du shop
  const shop = await prisma.shop.findUnique({
    where: { id: shopId },
  });

  if (!shop) {
    return {
      success: false,
      reason: "shop_not_found",
    };
  }

  // Exemple : récupérer les produits les plus vendus
  const topProducts = await prisma.product.findMany({
    where: { shopId },
    orderBy: { salesCount: "desc" },
    take: 3,
  });

  // Générer une promotion simple
  const promo = {
    title: "Cozy Deal",
    description: `Promotion spéciale pour ${shop.name}`,
    products: topProducts.map((p) => p.title),
    discount: 10, // 10% par défaut
  };

  return {
    success: true,
    promotion: promo,
  };
}
