// app/models/scheduler.server.js

// IMPORTANT : alias "~" casse dans Railway → chemins relatifs 100% fiables
import { prisma } from "../db.server";
import { runAutopilot } from "./aiAutopilot.server";
import { addSecurityLog } from "./securityLogs.server";

// Exécuter les tâches planifiées
export async function runScheduledTasks() {
  const shops = await prisma.shop.findMany({
    select: { id: true },
  });

  for (const shop of shops) {
    try {
      // Exécution de l'autopilot IA pour chaque shop
      await runAutopilot({ shopId: shop.id });
    } catch (error) {
      await addSecurityLog({
        shopId: shop.id,
        type: "SCHEDULER_ERROR",
        message: error?.message ?? "Erreur inconnue dans le scheduler",
        severity: "HIGH",
      });
    }
  }

  return { success: true };
}
