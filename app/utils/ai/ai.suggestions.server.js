import db from "../../db.server";
import { createNotification } from "../notifications.server";

export async function generateVeltoSuggestions() {
  // 1) Produits peu performants
  const lowProducts = await db.product.findMany({
    where: { salesCount: { lt: 1 } },
    take: 5,
  });

  for (const p of lowProducts) {
    await createNotification({
      type: "ai",
      level: "info",
      title: "Produit à optimiser",
      message: `Le produit "${p.title}" n'a pas eu de ventes récemment. Pensez à une promotion ou à le revoir.`,
    });
  }

  // 2) Produits chauds
  const hotProducts = await db.product.findMany({
    where: { viewsCount: { gt: 100 } },
    take: 5,
  });

  for (const p of hotProducts) {
    await createNotification({
      type: "ai",
      level: "warning",
      title: "Produit en tendance",
      message: `Le produit "${p.title}" est en tendance. Une promotion ciblée pourrait augmenter vos ventes.`,
    });
  }

  // 3) Pages SEO à améliorer
  const weakPages = await db.page.findMany({
    where: { seoScore: { lt: 50 } },
    take: 5,
  });

  for (const page of weakPages) {
    await createNotification({
      type: "ai",
      level: "info",
      title: "Page SEO à améliorer",
      message: `La page "${page.title}" a un score SEO faible. Pensez à améliorer le contenu et les balises.`,
    });
  }

  return true;
}
