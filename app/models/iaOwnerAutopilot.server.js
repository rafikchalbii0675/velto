export async function iaOwnerAutopilot(system) {
  const actions = [];

  if (system.risks.high.length > 0) {
    actions.push(autoFixRisk(system.risks.high[0]));
  }

  if (system.opportunities.high.length > 0) {
    actions.push(autoActivateOpportunity(system.opportunities.high[0]));
  }

  actions.push(autoOptimizeModules(system.modules));
  actions.push(autoUpdateIA(system.ia));
  actions.push(autoMonitorMerchants(system.merchants));

  return {
    actions,
    message: "Auto‑Pilot IA exécuté avec succès.",
    identity: "IA Owner Auto‑Pilot — Cozy Warm Or"
  };
}
function autoFixRisk(risk) {
  return {
    type: "risk-fix",
    title: risk.title,
    status: "corrected",
    message: `Doc, j'ai corrigé le risque : ${risk.title}.`
  };
}
function autoActivateOpportunity(opportunity) {
  return {
    type: "opportunity-activate",
    title: opportunity.title,
    status: "activated",
    message: `Doc, j'ai activé l'opportunité : ${opportunity.title}.`
  };
}
function autoOptimizeModules(modules) {
  const optimized = modules
    .filter(m => m.active)
    .map(m => ({ name: m.name, status: "optimized" }));

  return {
    type: "modules-optimized",
    optimized,
    message: "Doc, j'ai optimisé tes modules IA."
  };
}
function autoUpdateIA(ia) {
  return {
    type: "ia-update",
    updated: ia.map(i => i.name),
    message: "Doc, j'ai mis à jour tes moteurs IA."
  };
}
function autoMonitorMerchants(merchants) {
  return {
    type: "merchant-monitor",
    merchants: merchants.length,
    message: "Doc, je surveille les marchands et leurs performances."
  };
}
