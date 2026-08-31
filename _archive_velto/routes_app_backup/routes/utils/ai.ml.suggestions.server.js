import db from "../db.server";
import { createNotification } from "./notifications.server";

// Calcule un score de "priorité" pour un produit
function computeProductScore(product) {
  const viewsWeight = 0.3;
  const cartWeight = 0.4;
  const salesWeight = 0.5;
  const decay = 0.95; // pour réduire l'impact dans le temps

  const baseScore =
    product.viewsCount * viewsWeight +
    product.addToCartCount * cartWeight +
    product.salesCount * salesWeight;

  return baseScore * decay;
}

// Calcule un score de "risque" pour une page SEO
function computeSeoRisk(page) {
  const score = 100 - page.seoScore;
  const slowPenalty = page.loadTimeMs > 2500 ? 20 : 0;
  return score + slowPenalty;
}

export async function generateVeltoMlSuggestions() {
  // 1) Produits — priorisation intelligente
  const products = await db.product.findMany({
    take: 100,
  });

  const scoredProducts = products
    .map((p) => ({
      ...p,
      aiScore: computeProductScore(p),
    }))
    .sort((a, b) => b.aiScore - a.aiScore);

  const topProducts = scoredProducts.slice(0, 5);

  for (const p of topProducts) {
    await createNotification({
      type: "ai",
      level: "warning",
      title: "Produit à fort potentiel",
      message: `Le produit "${p.title}" montre un fort potentiel (score AI élevé). Pensez à le mettre en avant ou à le promouvoir.`,
    });
  }

  // 2) Pages SEO — risque intelligent
  const pages = await db.page.findMany({
    take: 100,
  });

  const riskyPages = pages
    .map((page) => ({
      ...page,
      riskScore: computeSeoRisk(page),
    }))
    .sort((a, b) => b.riskScore - a.riskScore)
    .slice(0, 5);

  for (const page of riskyPages) {
    await createNotification({
      type: "ai",
      level: "danger",
      title: "Page à risque SEO",
      message: `La page "${page.title}" présente un risque SEO élevé (score AI). Pensez à l'optimiser.`,
    });
  }

  // 3) Historique des promotions — apprentissage simple
  const promos = await db.promotion.findMany({
    include: { products: true },
  });

  for (const promo of promos) {
    const totalSales = promo.products.reduce(
      (sum, p) => sum + p.salesCount,
      0
    );

    if (totalSales > 50) {
      await createNotification({
        type: "ai",
        level: "info",
        title: "Promotion performante",
        message: `La promotion "${promo.title}" a bien fonctionné. Inspirez-vous de sa structure pour vos prochaines campagnes.`,
      });
    }
  }

  return true;
}
