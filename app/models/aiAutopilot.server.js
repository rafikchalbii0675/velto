// app/models/aiAutopilot.server.js

// IMPORTANT : alias "~" casse dans Railway → chemins relatifs 100% fiables
import { prisma } from "../db.server";
import { addAlert } from "./alerts.server";
import { addSecurityLog } from "./securityLogs.server";

// Fonction principale : exécution de l'autopilot IA
export async function runAutopilot({ shopId }) {
  // Récupérer les paramètres IA du shop
  const settings = await prisma.autopilotSettings.findUnique({
    where: { shopId },
  });

  if (!settings) {
    await addAlert({
      shopId,
      type: "AUTOPILOT",
      message: "Aucun paramètre IA trouvé pour ce shop.",
    });

    return { success: false, reason: "missing_settings" };
  }

  // Exemple : exécuter une analyse IA
  const analysis = await generateAutopilotAnalysis(shopId);

  // Log de sécurité si anomalie détectée
  if (analysis?.anomalyDetected) {
    await addSecurityLog({
      shopId,
      type: "ANOMALY",
      message: analysis.details,
      severity: "HIGH",
    });
  }

  // Sauvegarder le résultat IA
  await prisma.autopilotResults.create({
    data: {
      shopId,
      result: JSON.stringify(analysis),
      createdAt: new Date(),
    },
  });

  return { success: true, analysis };
}

// Exemple de fonction IA simulée
async function generateAutopilotAnalysis(shopId) {
  // Simu : détection d’anomalie aléatoire
  const anomaly = Math.random() < 0.2;

  return {
    shopId,
    anomalyDetected: anomaly,
    details: anomaly
      ? "Activité inhabituelle détectée dans les commandes."
      : "Aucune anomalie détectée.",
    score: Math.floor(Math.random() * 100),
  };
}
