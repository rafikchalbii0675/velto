import { prisma } from "~/db.server";

export async function getAIInsights(shopId) {
  const totalSales = await prisma.cryptoSale.count({ where: { shopId } });
  const totalProducts = await prisma.product.count({ where: { shopId } });
  const alerts = await prisma.alert.findMany({ where: { shopId } });
  const logs = await prisma.securityLog.findMany({ where: { shopId } });

  const highAlerts = alerts.filter((a) => a.severity === "high").length;
  const mediumAlerts = alerts.filter((a) => a.severity === "medium").length;

  const insights = [];

  // Insight 1 : activité crypto
  if (totalSales > 50) {
    insights.push("Votre activité crypto est élevée. Pensez à optimiser vos frais de transaction.");
  } else if (totalSales === 0) {
    insights.push("Aucune activité crypto détectée. Vous pourriez activer les paiements crypto pour augmenter vos ventes.");
  }

  // Insight 2 : produits
  if (totalProducts === 0) {
    insights.push("Aucun produit détecté. Ajoutez vos produits pour commencer l’analyse IA.");
  } else if (totalProducts > 100) {
    insights.push("Votre catalogue est large. L’IA recommande de mettre en avant vos produits les plus performants.");
  }

  // Insight 3 : alertes IA
  if (highAlerts > 0) {
    insights.push("Des alertes critiques ont été détectées. Vérifiez votre Dashboard Sécurité IA.");
  } else if (mediumAlerts > 5) {
    insights.push("Plusieurs alertes moyennes ont été détectées. Une optimisation est recommandée.");
  }

  // Insight 4 : logs sécurité
  if (logs.length > 200) {
    insights.push("Votre système génère beaucoup de logs. L’IA recommande une vérification de vos intégrations.");
  }

  return {
    insights,
    stats: {
      totalSales,
      totalProducts,
      highAlerts,
      mediumAlerts,
      logs: logs.length,
    },
  };
}
