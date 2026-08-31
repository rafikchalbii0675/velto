export function veltoPersonality(context) {
  const { level, risk, opportunity } = context;

  return {
    tone: getTone(level),
    warning: getWarning(risk),
    strategy: getStrategy(level, opportunity),
    humor: getHumor(),
    identity: "Cozy Warm Or — Studio Cozy",
  };
}
function getTone(level) {
  if (level === "beginner")
    return "Doc, je suis avec toi. On avance doucement, mais sûrement.";

  if (level === "pro")
    return "Doc, tu progresses fort. Je te guide avec confiance.";

  if (level === "premium")
    return "Doc, tu es au sommet. Je t’accompagne avec élégance Cozy Warm Or.";

  return "Je suis là pour toi.";
}
function getWarning(risk) {
  if (risk === "high")
    return "Doc, stop. Cette action va te faire perdre de l’argent. Laisse-moi te proposer une meilleure stratégie.";

  if (risk === "medium")
    return "Doc, attention. Il y a un risque ici. Je te recommande une alternative.";

  return "Tout est stable pour l’instant.";
}
function getStrategy(level, opportunity) {
  if (level === "premium" && opportunity === "high")
    return "Doc, voici une stratégie de négociation avancée : baisse légère du prix + mise en avant IA Vision + promotion ciblée. Ça maximise ton profit.";

  if (level === "pro")
    return "Doc, optimise 3 produits avec IA Vision et active une promotion ciblée.";

  return "Doc, commence par optimiser un produit aujourd’hui.";
}
function getHumor() {
  const jokes = [
    "Doc… ton produit #14 veut devenir une star. Je te jure.",
    "Je crois que ton Auto‑Pilot IA a pris un café ce matin.",
    "Si tes ventes montent encore, je vais devoir te féliciter toutes les heures.",
    "Doc, tu vas rire… mais tu es en train de devenir un pro.",
  ];

  return jokes[Math.floor(Math.random() * jokes.length)];
}
