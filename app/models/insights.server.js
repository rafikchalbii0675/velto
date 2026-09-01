// app/models/insights.server.js

// IMPORTANT : alias "~" interdit → chemin relatif obligatoire
import { prisma } from "../db.server";

/**
 * Insights généraux du shop
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

/**
 * Insights IA pour la page app.ai.jsx
 */
export async function getAIInsights(shopId) {
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
      ai: null,
    };
  }

  // Analyse IA simple
  const score =
    shop.products.length * 2 +
    shop.promotions.length * 3 +
    shop.logs.length * 1 +
    shop.points / 10;

  let recommendation = "Continue comme ça !";

  if (score < 20) {
    recommendation = "Ajoute plus de produits pour augmenter ton impact.";
  } else if (score < 50) {
    recommendation =
      "Active plus de promotions pour booster ton engagement.";
  } else if (score > 100) {
    recommendation =
      "Ton shop est très actif ! Pense à automatiser certaines tâches.";
  }

  return {
    shopFound: true,
    ai: {
      score,
      recommendation,
      products: shop.products.length,
      promotions: shop.promotions.length,
      logs: shop.logs.length,
      points: shop.points,
    },
  };
}
