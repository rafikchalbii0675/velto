export function walletAssistant(merchant) {
  return {
    points: points(merchant),
    level: level(merchant),
    reward: reward(merchant),
    action: action(merchant),
    identity: "IA Wallet — Cozy Warm Or"
  };
}
function points(merchant) {
  return (
    merchant.sales * 5 +
    merchant.products * 2 +
    merchant.promotions * 3 +
    merchant.optimizations * 4
  );
}
function level(merchant) {
  const p = points(merchant);

  if (p > 200) return "Cozy Warm Or";
  if (p > 100) return "Or";
  if (p > 50) return "Argent";
  return "Bronze";
}
function reward(merchant) {
  const p = points(merchant);

  if (p > 200) return "Récompense : 20% de réduction + badge Cozy Warm Or.";
  if (p > 100) return "Récompense : 10% de réduction + badge Or.";
  if (p > 50) return "Récompense : 5% de réduction + badge Argent.";
  return "Récompense : badge Bronze.";
}
function action(merchant) {
  return "Action : optimiser un produit pour gagner +4 points.";
}
