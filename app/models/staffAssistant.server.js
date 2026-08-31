export function staffAssistant(staff, products) {
  return {
    greeting: greeting(staff),
    suggestion: suggestion(products),
    insight: insight(products),
    action: action(products),
    identity: "IA Staff Assistant — Cozy Warm Or"
  };
}
function greeting(staff) {
  return `Bonjour ${staff.name || "membre du staff"}. Je suis ton assistant IA aujourd’hui.`;
}
function suggestion(products) {
  const lowStock = products.find(p => p.stock < 3);
  if (lowStock)
    return `Tâche prioritaire : vérifier le stock de ${lowStock.title}.`;

  const noDescription = products.find(p => !p.description);
  if (noDescription)
    return `Tâche prioritaire : ajouter une description à ${noDescription.title}.`;

  return "Tâche prioritaire : vérifier les images des produits.";
}
function insight(products) {
  const popular = products.find(p => p.visits > 50);

  if (popular)
    return `Analyse : ${popular.title} reçoit beaucoup de visites. Une optimisation peut augmenter les ventes.`;

  return "Analyse : les produits sont stables aujourd’hui.";
}
function action(products) {
  const popular = products.find(p => p.visits > 50);

  if (popular)
    return `Action : améliorer la description de ${popular.title}.`;

  return "Action : vérifier les images des produits.";
}
