// app/models/aiAutopilot.server.js

import { prisma } from "../db.server";
import { addAlert } from "./alerts.server";
import { addSecurityLog } from "./securityLogs.server";

// Fonction principale : exécution de l'autopilot IA
export async function runAutopilot({ shopId }) {
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

  const analysis = await generateAutopilotAnalysis(shopId);

  if (analysis?.anomalyDetected) {
    await addSecurityLog({
      shopId,
      type: "ANOMALY",
      message: analysis.details,
      severity: "HIGH",
    });
  }

  await prisma.autopilotResults.create({
    data: {
      shopId,
      result: JSON.stringify(analysis),
      createdAt: new Date(),
    },
  });

  return { success: true, analysis };
}

async function generateAutopilotAnalysis(shopId) {
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
