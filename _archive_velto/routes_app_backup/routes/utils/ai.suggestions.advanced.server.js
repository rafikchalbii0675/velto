import db from "../db.server";
import { createNotification } from "./notifications.server";

// Détection des saisons commerciales
function getSeason() {
  const month = new Date().getMonth() + 1;

  if ([11, 12].includes(month)) return "noel";
  if (month === 1) return "nouvel_an";
  if ([5, 6].includes(month)) return "fete_meres_peres";
  if ([8, 9].includes(month)) return "rentree";
  if ([3, 4].includes(month)) return "printemps";
  if ([6, 7].includes(month)) return "ete";

  return "normal";
}

export async function generateVeltoAdvancedSuggestions() {
  const season = getSeason();

  // 1) Analyse des ventes
  const lowSales = await db.product.findMany({
    where: { salesCount: { lt: 3 } },
    take: 10,
  });

  for (const p of lowSales) {
    await createNotification({
      type: "ai",
      level: "info",
      title: "Produit à faible performance",
      message: `Le produit "${p.title}" a peu de ventes. Une promotion ou un repositionnement pourrait aider.`,
    });
  }

  // 2) Analyse des tendances (vues + ajouts panier)
  const trending = await db.product.findMany({
    where: {
      OR: [
        { viewsCount: { gt: 150 } },
        { addToCartCount: { gt: 20 } },
      ],
    },
    take: 10,
  });

  for (const p of trending) {
    await createNotification({
      type: "ai",
      level: "warning",
      title: "Produit en tendance",
      message: `Le produit "${p.title}" est en tendance. Pensez à une promotion ciblée ou à le mettre en avant.`,
    });
  }

  // 3) Analyse SEO
  const weakSEO = await db.page.findMany({
    where: { seoScore: { lt: 60 } },
    take: 10,
  });

  for (const page of weakSEO) {
    await createNotification({
      type: "ai",
      level: "info",
      title: "Page SEO à optimiser",
      message: `La page "${page.title}" a un score SEO faible. Ajoutez du contenu, des balises meta ou des images optimisées.`,
    });
  }

  // 4) Suggestions saisonnières
  if (season === "noel") {
    await createNotification({
      type: "ai",
      level: "warning",
      title: "Saison de Noël",
      message: "C’est le moment idéal pour créer une collection spéciale Noël ou lancer une promotion festive.",
    });
  }

  if (season === "rentree") {
    await createNotification({
      type: "ai",
      level: "info",
      title: "Rentrée scolaire",
      message: "Les produits bureau, organisation et papeterie sont en tendance. Pensez à les mettre en avant.",
    });
  }

  if (season === "fete_meres_peres") {
    await createNotification({
      type: "ai",
      level: "info",
      title: "Fêtes des Mères / Pères",
      message: "Les produits cadeaux personnalisés performent très bien en ce moment.",
    });
  }

  // 5) Analyse des promotions
  const promos = await db.promotion.findMany({
    where: { active: true },
  });

  for (const promo of promos) {
    if (promo.endDate && new Date(promo.endDate) - Date.now() < 48 * 3600 * 1000) {
      await createNotification({
        type: "ai",
        level: "warning",
        title: "Promotion bientôt terminée",
        message: `Votre promotion "${promo.title}" se termine bientôt. Pensez à la prolonger ou à en lancer une nouvelle.`,
      });
    }
  }

  return true;
}
