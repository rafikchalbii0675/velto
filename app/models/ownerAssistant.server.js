export function ownerAssistant(owner) {
  return {
    greeting: greeting(owner),
    suggestion: suggestion(owner),
    insight: insight(owner),
    action: action(owner),
    motivation: motivation(owner),
    identity: "IA Owner Assistant — Cozy Warm Or"
  };
}
function greeting(owner) {
  return `Bonjour Doc. Niveau : ${owner.level}. Je suis prêt à avancer avec toi aujourd’hui.`;
}
function suggestion(owner) {
  if (owner.points < 100)
    return "Je te recommande d’ajouter un petit module IA aujourd’hui pour avancer ton progression.";

  return "Tu progresses bien. Je te recommande d’optimiser un module existant.";
}
function insight(owner) {
  return "Analyse rapide : ton système est stable. Aucun risque détecté.";
}
function action(owner) {
  return "Action possible : améliorer la description d’un module IA pour le rendre plus clair.";
}
function motivation(owner) {
  return "Tu avances bien Doc. Studio Cozy prend forme avec élégance.";
}
