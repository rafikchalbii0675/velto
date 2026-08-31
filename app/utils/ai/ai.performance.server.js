import { analyzePromotionAI } from "../velto-ai.server";
import { readHistory } from "../history/history.server";

/**
 * Analyse la performance globale des promotions récentes.
 * Fait le pont vers analyzePromotionAI (logique existante dans velto-ai.server.js),
 * en l'appliquant à la promotion la plus récente de l'historique.
 */
export async function analyzePromotionPerformance() {
  const history = readHistory();

  if (!history || history.length === 0) {
    return {
      score: 0,
      comment: "Aucune promotion enregistrée pour le moment.",
    };
  }

  const latest = history[0];

  const result = await analyzePromotionAI({
    title: latest.title,
    discount: latest.discount,
    productId: latest.productId,
  });

  return {
    score: result.score,
    comment: `${result.recommendation} ${result.suggestion}`,
  };
}