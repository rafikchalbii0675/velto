export function analyzePromotionAdvanced({
  title,
  discount,
  productPrice,
  productCost,
  productId,
}) {
  // 1. Calcul marge
  const margin = productPrice - productCost;
  const marginRate = (margin / productPrice) * 100;

  // 2. Impact de la réduction sur la marge
  const discountImpact = productPrice * (discount / 100);
  const newMargin = margin - discountImpact;
  const newMarginRate = (newMargin / productPrice) * 100;

  // 3. Prévision CTR (taux de clic)
  let ctr = 2.1; // CTR moyen Shopify
  if (discount >= 20) ctr += 1.2;
  if (discount >= 30) ctr += 2.4;
  if (discount >= 40) ctr += 3.1;

  // 4. Prévision conversion
  let conversion = 1.8; // taux moyen Shopify
  if (discount >= 20) conversion += 1.1;
  if (discount >= 30) conversion += 2.0;
  if (discount >= 40) conversion += 3.5;

  // 5. Score global
  let score = 70;

  if (discount >= 20) score += 10;
  if (discount >= 30) score += 15;
  if (discount >= 40) score -= 10; // trop agressif

  if (newMarginRate < 20) score -= 15;
  if (newMarginRate < 10) score -= 25;

  // 6. Recommandations IA
  let recommendation = "";
  let suggestion = "";

  if (score >= 85) {
    recommendation = "Promotion très performante, excellent équilibre.";
    suggestion = "Tu peux la laisser telle quelle, elle va performer.";
  } else if (score >= 70) {
    recommendation = "Promotion solide, bonne attractivité.";
    suggestion = "Tu peux tester une légère variation du discount.";
  } else if (score >= 50) {
    recommendation = "Promotion correcte mais améliorable.";
    suggestion = "Réduis un peu le discount pour améliorer la marge.";
  } else {
    recommendation = "Promotion trop agressive, marge trop faible.";
    suggestion = "Diminue la réduction ou augmente le prix du produit.";
  }

  return {
    score,
    margin,
    marginRate: Number(marginRate.toFixed(2)),
    newMargin,
    newMarginRate: Number(newMarginRate.toFixed(2)),
    ctr: Number(ctr.toFixed(2)),
    conversion: Number(conversion.toFixed(2)),
    recommendation,
    suggestion,
  };
}
