export function customerAssistant(customer, products) {
  return {
    greeting: greeting(customer),
    recommendation: recommendation(products),
    insight: insight(products),
    action: action(products),
    identity: "IA Customer Assistant — Cozy Warm Or"
  };
}
function greeting(customer) {
  return `Bonjour ${customer.name || "cher client"}. Heureux de vous voir ici.`;
}
function recommendation(products) {
  const popular = products.find(p => p.visits > 50);

  if (popular)
    return `Je vous recommande : ${popular.title}. C’est l’un des produits les plus appréciés.`;

  return "Je vous recommande notre produit le plus récent. Il pourrait vous plaire.";
}
function insight(products) {
  const popular = products.find(p => p.visits > 50);

  if (popular)
    return `Ce produit reçoit beaucoup de visites. Il est apprécié pour son rapport qualité-prix.`;

  return "Ce produit est nouveau et attire déjà l’attention.";
}
function action(products) {
  const popular = products.find(p => p.visits > 50);

  if (popular)
    return `Action possible : voir la promotion sur ${popular.title}.`;

  return "Action possible : découvrir nos nouveautés.";
}
