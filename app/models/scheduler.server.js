// app/models/scheduler.server.js

// IMPORTANT : alias "~" casse dans Railway → chemins relatifs 100% fiables
import { prisma } from "../db.server";
import { runAutopilot } from "./aiAutopilot.server";
import { addSecurityLog } from "./securityLogs.server";

// Fonction principale : exécuter l'autopilot IA pour tous les shops
export async function runScheduledAutopilot() {
  const shops = await prisma.shop.findMany({
    select: { id: true },
  });

  for (const shop of shops) {
    try {
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

// Alias interne si tu veux garder l’ancien nom
export const runScheduledTasks = runScheduledAutopilot;
