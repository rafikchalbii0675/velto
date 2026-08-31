export function merchantAssistant(merchant) {
  return {
    greeting: greeting(merchant),
    suggestion: suggestion(merchant),
    insight: insight(merchant),
    action: action(merchant),
    motivation: motivation(merchant),
    identity: "IA Merchant Assistant — Cozy Warm Or"
  };
}
function greeting(merchant) {
  return `Bonjour ${merchant.shopName}. Je suis ton assistant IA aujourd’hui.`;
}
function suggestion(merchant) {
  if (merchant.products < 10)
    return "Je te recommande d’ajouter 1 ou 2 nouveaux produits cette semaine.";

  return "Je te recommande d’optimiser la description de ton produit le plus vendu.";
}
function insight(merchant) {
  return "Analyse rapide : tes ventes sont stables. Une petite promotion pourrait augmenter ton trafic.";
}
function action(merchant) {
  return "Action possible : activer une promotion de 10% sur ton produit le plus visité.";
}
function motivation(merchant) {
  return "Tu avances bien. Ta boutique a du potentiel.";
}
