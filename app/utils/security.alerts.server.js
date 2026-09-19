// app/utils/security.alerts.server.js

import { prisma } from "../db.server";   // ← FIX : import correct

export async function generateSecurityAlerts() {
  // Exemple : récupérer les dernières activités suspectes
  const alerts = await prisma.securityAlert.findMany({
    orderBy: { createdAt: "desc" },
    take: 20,
  });

  return alerts;
}
