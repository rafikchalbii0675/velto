export function customerLoyalty(customer) {
  return {
    loyaltyLevel: loyaltyLevel(customer),
    reward: reward(customer),
    insight: insight(customer),
    action: action(customer),
    identity: "IA Customer Loyalty — Cozy Warm Or"
  };
}
function loyaltyLevel(customer) {
  if (customer.orders > 5)
    return "VIP Cozy Warm Or";

  if (customer.orders > 2)
    return "Client Loyal";

  if (customer.visits > 3)
    return "Client Régulier";

  return "Nouveau Client";
}
function reward(customer) {
  if (customer.orders > 5)
    return "Récompense : 15% de réduction + accès VIP Cozy Warm Or.";

  if (customer.orders > 2)
    return "Récompense : 10% de réduction sur votre prochain achat.";

  if (customer.visits > 3)
    return "Récompense : 5% de réduction pour vous remercier de votre visite.";

  return "Récompense : livraison gratuite sur votre premier achat.";
}
function insight(customer) {
  if (customer.orders > 5)
    return "Ce client est très fidèle. Une attention spéciale peut augmenter sa valeur à long terme.";

  if (customer.orders > 2)
    return "Ce client revient souvent. Une petite récompense peut renforcer la relation.";

  return "Ce client découvre la boutique. Une première impression Cozy Warm Or est importante.";
}
function action(customer) {
  if (customer.orders > 5)
    return "Action possible : proposer un produit premium avec une réduction VIP.";

  if (customer.orders > 2)
    return "Action possible : recommander un produit similaire à ses achats.";

  return "Action possible : proposer une promotion de bienvenue.";
}
