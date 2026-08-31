import db from "../db.server";

export async function generateSecurityAlerts() {
  const alerts = [];

  const logs = await db.securityLog.findMany({
    orderBy: { id: "desc" },
    take: 20,
  });

  // Alerte : trop de webhooks invalides
  const invalidWebhooks = logs.filter(l => l.event.includes("rejeté")).length;
  if (invalidWebhooks >= 5) {
    alerts.push({
      type: "danger",
      message: "Plusieurs webhooks invalides détectés. Possible attaque.",
    });
  }

  // Alerte : clés manquantes
  const missingKeys = logs.some(l => l.event.includes("Clé API Shopify manquante"));
  if (missingKeys) {
    alerts.push({
      type: "warning",
      message: "Certaines clés Shopify sont manquantes.",
    });
  }

  // Alerte : replay attack
  const replay = logs.some(l => l.event.includes("replay"));
  if (replay) {
    alerts.push({
      type: "danger",
      message: "Tentative d’attaque replay détectée.",
    });
  }

  return alerts;
}
