export function promotionsAssistant(product) {
  return {
    priceAnalysis: priceAnalysis(product),
    recommendation: recommendation(product),
    insight: insight(product),
    action: action(product),
    identity: "IA Promotions — Cozy Warm Or"
  };
}
function priceAnalysis(product) {
  const message =
    product.sales === 0 && product.visits > 50
      ? "Ton prix semble trop élevé par rapport aux visites."
      : product.sales > 10
      ? "Ton prix fonctionne bien pour ce produit."
      : "Ton prix est correct mais pourrait être optimisé.";

  return {
    price: product.price,
    message
  };
}
function recommendation(product) {
  if (product.sales === 0 && product.visits > 50)
    return `Je recommande de tester un prix à ${product.price * 0.95} (baisse de 5%).`;

  if (product.sales > 20)
    return `Tu peux tester une légère hausse à ${product.price * 1.03} (hausse de 3%).`;

  return "Je recommande une promotion légère de 10% pour augmenter la conversion.";
}
function insight(product) {
  if (product.sales > 10)
    return "Ce produit a une bonne traction. Une petite optimisation peut augmenter les ventes.";

  return "Ce produit a du potentiel mais nécessite un ajustement de prix.";
}
function action(product) {
  return "Action possible : activer une promotion de 10% pendant 48h pour tester la conversion.";
}
