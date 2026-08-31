// app/models/aiAdvanced.server.js

// IMPORTANT : alias "~" casse dans Railway → chemin relatif 100% fiable
import { prisma } from "../db.server";

// Fonction IA avancée principale
export async function runAdvancedAI({ shopId }) {
  const shop = await prisma.shop.findUnique({
    where: { id: shopId },
  });

  if (!shop) {
    return { success: false, reason: "shop_not_found" };
  }

  const metrics = await prisma.metric.findMany({
    where: { shopId },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  const score = calculateAdvancedScore(metrics);

  await prisma.aiAdvancedResults.create({
    data: {
      shopId,
      score,
      createdAt: new Date(),
    },
  });

  return { success: true, score };
}

// Alias demandé par le route
export async function getAdvancedAI(shopId) {
  return runAdvancedAI({ shopId });
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
