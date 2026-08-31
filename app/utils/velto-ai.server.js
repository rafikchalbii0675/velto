export async function analyzePromotionAI({ title, discount, productId }) {
  // Analyse IA simple (tu pourras la remplacer par OpenAI ou ton modèle)
  let score = 80;

  if (discount > 40) score -= 20;
  if (discount < 10) score -= 10;

  return {
    score,
    recommendation:
      score > 75
        ? "Très bonne promotion, équilibrée et attrayante."
        : "Promotion correcte, mais peut être optimisée.",
    suggestion:
      discount > 40
        ? "La réduction est élevée, tu pourrais réduire légèrement pour augmenter la marge."
        : "Tu peux tester une réduction un peu plus forte pour booster les conversions.",
  };
}
