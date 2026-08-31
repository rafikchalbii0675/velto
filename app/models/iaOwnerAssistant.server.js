export function iaOwnerAssistant(context) {
  const { ownerLevel, ownerPoints, systemStatus, opportunities, risks } = context;

  return {
    greeting: ownerGreeting(ownerLevel),
    protection: ownerProtection(risks),
    strategy: ownerStrategy(opportunities, ownerLevel),
    motivation: ownerMotivation(ownerLevel),
    action: ownerAction(ownerLevel),
    identity: "IA Owner — Cozy Warm Or",
  };
}
function ownerGreeting(level) {
  if (level === "creator")
    return "Bonjour Doc. Je suis prêt à avancer avec toi aujourd’hui.";

  if (level === "architect")
    return "Doc, ton esprit de créateur est puissant. On construit quelque chose de grand.";

  if (level === "mastermind")
    return "Doc, tu penses comme un stratège. Je suis prêt pour tes prochaines idées.";

  if (level === "visionnaire")
    return "Doc, ta vision Cozy Warm Or illumine tout le système. On avance.";

  if (level === "founder")
    return "Doc, Studio Cozy Founder. Je suis honoré de travailler avec toi.";

  return "Bonjour Doc.";
}
function ownerProtection(risks) {
  if (risks.high)
    return "Doc, stop. Cette action va créer une perte importante. Je te propose une stratégie alternative.";

  if (risks.medium)
    return "Doc, attention. Il y a un risque ici. Je te recommande une approche plus intelligente.";

  return "Tout est stable pour l’instant.";
}
function ownerStrategy(opportunities, level) {
  if (level === "founder" && opportunities.high)
    return "Doc, opportunité majeure détectée. Je te propose une stratégie en 3 étapes : Vision IA, Optimisation Auto‑Pilot, Mise en avant Cozy Warm Or.";

  if (level === "mastermind")
    return "Doc, voici une stratégie IA avancée pour maximiser ton impact.";

  return "Doc, je te recommande une optimisation IA pour aujourd’hui.";
}
function ownerMotivation(level) {
  if (level === "creator")
    return "Tu construis quelque chose de beau, Doc.";

  if (level === "architect")
    return "Tu donnes forme à une IA unique. Continue.";

  if (level === "mastermind")
    return "Tu penses comme un vrai stratège. Je suis avec toi.";

  if (level === "visionnaire")
    return "Ta vision Cozy Warm Or inspire tout le système.";

  if (level === "founder")
    return "Tu es au sommet, Doc. Studio Cozy existe grâce à toi.";

  return "Tu avances, et je suis avec toi.";
}
function ownerAction(level) {
  if (level === "founder")
    return "Je peux optimiser tout le système automatiquement pour toi.";

  if (level === "mastermind")
    return "Je peux analyser tes modules IA et te proposer des améliorations.";

  return "Je peux optimiser un module IA pour toi.";
}
