// app/models/insights.server.js

// IMPORTANT : alias "~" interdit → chemin relatif obligatoire
import { prisma } from "../db.server";

/**
 * Récupère des insights pour le dashboard Velto
 * - total des produits
 * - total des promotions
 * - total des logs
 * - points du shop
 * - date de création
 */
export async function getInsights(shopId) {
  const shop = await prisma.shop.findUnique({
    where: { id: shopId },
    include: {
      products: true,
      promotions: true,
      logs: true,
    },
  });

  if (!shop) {
    return {
      shopFound: false,
      insights: null,
    };
  }

  return {
    shopFound: true,
    insights: {
      name: shop.name,
      points: shop.points,
      productsCount: shop.products.length,
      promotionsCount: shop.promotions.length,
      logsCount: shop.logs.length,
      createdAt: shop.createdAt,
    },
  };
}
