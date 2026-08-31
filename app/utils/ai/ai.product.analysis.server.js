export function analyzeProduct({
  price,
  cost,
  conversion,
  views,
}) {
  const margin = price - cost;
  const marginRate = (margin / price) * 100;

  const performance =
    conversion >= 3 ? "Excellent" :
    conversion >= 2 ? "Bon" :
    conversion >= 1 ? "Faible" : "Très faible";

  const recommendation =
    marginRate < 20
      ? "Augmenter légèrement le prix ou réduire les coûts."
      : conversion < 2
      ? "Optimiser la page produit ou ajouter une promotion."
      : "Produit performant, rien à changer.";

  return {
    margin,
    marginRate: Number(marginRate.toFixed(2)),
    performance,
    recommendation,
  };
}
