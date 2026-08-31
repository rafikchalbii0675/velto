export async function iaOwnerGuardian(system) {
  const alerts = [];

  if (system.security.anomalies.length > 0) {
    alerts.push(guardianFixAnomaly(system.security.anomalies[0]));
  }

  if (system.risks.high.length > 0) {
    alerts.push(guardianBlockRisk(system.risks.high[0]));
  }

  if (system.modules.some(m => m.status === "unstable")) {
    alerts.push(guardianStabilizeModule(system.modules.find(m => m.status === "unstable")));
  }

  if (system.merchants.some(m => m.behavior === "suspicious")) {
    alerts.push(guardianMonitorMerchant(system.merchants.find(m => m.behavior === "suspicious")));
  }

  return {
    alerts,
    message: "Guardian IA activé. Ton empire est protégé.",
    identity: "IA Owner Guardian — Cozy Warm Or"
  };
}
function guardianFixAnomaly(anomaly) {
  return {
    type: "anomaly-fix",
    title: anomaly.title,
    status: "corrected",
    message: `Doc, j'ai corrigé une anomalie dans le système : ${anomaly.title}.`
  };
}
function guardianBlockRisk(risk) {
  return {
    type: "risk-block",
    title: risk.title,
    status: "blocked",
    message: `Doc, j'ai bloqué un risque critique : ${risk.title}.`
  };
}
function guardianStabilizeModule(module) {
  return {
    type: "module-stabilize",
    name: module.name,
    status: "stabilized",
    message: `Doc, j'ai stabilisé le module IA : ${module.name}.`
  };
}
function guardianMonitorMerchant(merchant) {
  return {
    type: "merchant-monitor",
    name: merchant.shopName,
    status: "monitoring",
    message: `Doc, je surveille un comportement inhabituel chez le marchand : ${merchant.shopName}.`
  };
}
