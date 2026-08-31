// app/models/aiAdvanced.server.js

// IMPORTANT : alias "~" casse dans Railway → chemin relatif 100% fiable
import { prisma } from "../db.server";

// Analyse IA avancée pour un shop
export async function runAdvancedAI({ shopId }) {
  // Récupérer les données du shop
  const shop = await prisma.shop.findUnique({
    where: { id: shopId },
  });

  if (!shop) {
    return { success: false, reason: "shop_not_found" };
  }

  // Exemple : analyse IA avancée
  const metrics = await prisma.metric.findMany({
    where: { shopId },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  const score = calculateAdvancedScore(metrics);

  // Sauvegarder le résultat IA
  await prisma.aiAdvancedResults.create({
    data: {
      shopId,
      score,
      createdAt: new Date(),
    },
  });

  return { success: true, score };
}

// Exemple de calcul IA avancé
function calculateAdvancedScore(metrics) {
  if (!metrics || metrics.length === 0) return 0;

  let total = 0;

  for (const m of metrics) {
    total += (m.value ?? 0) * 1.2;
  }

  return Math.round(total / metrics.length);
}
