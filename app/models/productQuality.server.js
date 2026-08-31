export function productQuality(product) {
  return {
    qualityScore: qualityScore(product),
    issues: issues(product),
    insight: insight(product),
    action: action(product),
    identity: "IA Product Quality — Cozy Warm Or"
  };
}
function qualityScore(product) {
  let score = 100;

  if (!product.description || product.description.length < 50) score -= 30;
  if (!product.images || product.images.length === 0) score -= 30;
  if (product.price < 1) score -= 20;
  if (product.title.length < 5) score -= 20;

  return score;
}
function issues(product) {
  const list = [];

  if (!product.description || product.description.length < 50)
    list.push("Description trop courte");

  if (!product.images || product.images.length === 0)
    list.push("Aucune image disponible");

  if (product.title.length < 5)
    list.push("Titre trop court");

  if (product.price < 1)
    list.push("Prix incohérent");

  return list;
}
function insight(product) {
  if (!product.images || product.images.length === 0)
    return "Ce produit manque d’images. Cela réduit fortement la conversion.";

  if (!product.description || product.description.length < 50)
    return "La description est trop courte. Une meilleure description augmente les ventes.";

  return "Ce produit est globalement correct mais peut être optimisé.";
}
function action(product) {
  if (!product.images || product.images.length === 0)
    return "Action : ajouter au moins 2 images de bonne qualité.";

  if (!product.description || product.description.length < 50)
    return "Action : écrire une description plus détaillée.";

  return "Action : optimiser le titre pour améliorer le SEO.";
}
