export function visionAssistant(product) {
  return {
    overview: overview(product),
    suggestion: suggestion(product),
    insight: insight(product),
    action: action(product),
    identity: "IA Vision — Cozy Warm Or"
  };
}
function overview(product) {
  return {
    title: product.title,
    price: product.price,
    stock: product.stock,
    visits: product.visits,
    sales: product.sales,
    message: `Analyse du produit : ${product.title}`
  };
}
function suggestion(product) {
  if (product.visits > 100 && product.sales === 0)
    return "Ton produit reçoit des visites mais aucune vente. Je te recommande d’améliorer la description.";

  if (product.stock < 5)
    return "Stock faible. Je te recommande de prévoir un réapprovisionnement.";

  return "Je te recommande d’améliorer les images pour augmenter la conversion.";
}
function insight(product) {
  if (product.sales > 10)
    return "Ce produit performe bien. Une petite promotion pourrait augmenter les ventes.";

  return "Ce produit a du potentiel mais nécessite une optimisation.";
}
function action(product) {
  return "Action possible : ajouter une promotion de 5% pour tester la conversion.";
}
