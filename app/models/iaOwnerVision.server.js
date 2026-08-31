export function iaOwnerVisionEngine(system) {
  const { modules, merchants, partners, rewards, risks, opportunities } = system;

  return {
    overview: visionOverview(modules, merchants, partners),
    opportunities: visionOpportunities(opportunities),
    risks: visionRisks(risks),
    strategy: visionStrategy(modules, merchants, partners),
    forecast: visionForecast(modules, merchants),
    identity: "IA Owner Vision — Cozy Warm Or",
  };
}
function visionOverview(modules, merchants, partners) {
  return {
    modulesActive: modules.filter(m => m.active).length,
    merchantsActive: merchants.length,
    partnersCount: partners.length,
    message: "Doc, ton empire IA est stable et en expansion."
  };
}
function visionOpportunities(opportunities) {
  if (opportunities.high.length > 0)
    return `Doc, opportunité majeure détectée : ${opportunities.high[0].title}.`;

  if (opportunities.medium.length > 0)
    return `Doc, opportunité intéressante : ${opportunities.medium[0].title}.`;

  return "Doc, aucune opportunité critique aujourd’hui.";
}
function visionRisks(risks) {
  if (risks.high.length > 0)
    return `Doc, risque élevé détecté : ${risks.high[0].title}. Je te recommande une action immédiate.`;

  if (risks.medium.length > 0)
    return `Doc, risque moyen détecté : ${risks.medium[0].title}.`;

  return "Doc, aucun risque majeur pour le moment.";
}
function visionStrategy(modules, merchants, partners) {
  return {
    step1: "Optimisation IA des modules les plus utilisés.",
    step2: "Analyse des marchands premium pour booster leur croissance.",
    step3: "Négociation IA avec les partenaires pour améliorer les offres.",
    step4: "Mise en avant Cozy Warm Or pour renforcer l’identité Studio Cozy."
  };
}
function visionForecast(modules, merchants) {
  return {
    next7days: "Croissance stable prévue. Opportunité dans IA Vision.",
    next30days: "Augmentation des marchands premium. Prévoir une mise à jour IA.",
    next90days: "Expansion globale de Velto. Préparer un nouveau module IA."
  };
}
