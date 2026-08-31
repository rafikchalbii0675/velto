export function autoPilotMerchant(products) {
  return {
    scan: scan(products),
    opportunity: opportunity(products),
    action: action(products),
    result: result(products),
    identity: "IA Auto‑Pilot Merchant — Cozy Warm Or"
  };
}
function scan(products) {
  return products.map(p => ({
    title: p.title,
    visits: p.visits,
    sales: p.sales,
    stock: p.stock
  }));
}
function opportunity(products) {
  const popular = products.find(p => p.visits > 50 && p.sales === 0);
  if (popular)
    return `Opportunité détectée : ${popular.title} reçoit beaucoup de visites mais aucune vente.`;

  const lowStock = products.find(p => p.stock < 3);
  if (lowStock)
    return `Attention : stock faible pour ${lowStock.title}.`;

  return "Aucune opportunité critique détectée.";
}
function action(products) {
  const popular = products.find(p => p.visits > 50 && p.sales === 0);
  if (popular)
    return `Action IA : activer une promotion de 10% sur ${popular.title}.`;

  const lowStock = products.find(p => p.stock < 3);
  if (lowStock)
    return `Action IA : envoyer une notification de réapprovisionnement pour ${lowStock.title}.`;

  return "Action IA : optimiser la description du produit le plus visité.";
}
function result(products) {
  return "Auto‑Pilot exécuté : optimisation légère appliquée.";
}
