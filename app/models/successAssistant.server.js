export function successAssistant(merchant) {
  return {
    level: level(merchant),
    achievements: achievements(merchant),
    reward: reward(merchant),
    action: action(merchant),
    identity: "IA Success — Cozy Warm Or"
  };
}
function level(merchant) {
  if (merchant.sales > 50)
    return "Cozy Warm Or Master";

  if (merchant.sales > 20)
    return "Expert";

  if (merchant.sales > 5)
    return "Avancé";

  if (merchant.sales > 0)
    return "Actif";

  return "Débutant";
}
function achievements(merchant) {
  const list = [];

  if (merchant.products > 0) list.push("Premier produit ajouté");
  if (merchant.sales > 0) list.push("Première vente");
  if (merchant.sales > 10) list.push("10 ventes");
  if (merchant.visits > 100) list.push("100 visites");
  if (merchant.promotions > 0) list.push("Promotion activée");

  return list;
}
function reward(merchant) {
  if (merchant.sales > 50)
    return "Badge : Cozy Warm Or Master";

  if (merchant.sales > 20)
    return "Badge : Expert IA";

  if (merchant.sales > 5)
    return "Badge : Marchand Avancé";

  if (merchant.sales > 0)
    return "Badge : Première Vente";

  return "Badge : Bienvenue dans Velto";
}
function action(merchant) {
  if (merchant.sales > 20)
    return "Action : optimiser ton produit le plus vendu.";

  if (merchant.sales > 5)
    return "Action : activer une promotion légère.";

  if (merchant.sales > 0)
    return "Action : améliorer la description d’un produit.";

  return "Action : ajouter un premier produit.";
}
