// app/models/securityLogs.server.js

// IMPORTANT : alias "~" casse dans Railway  chemin relatif 100% fiable
import { prisma } from "../db.server";

// Ajouter un log de sécurité
export async function addSecurityLog({ shopId, type, message, severity }) {
  return prisma.securityLog.create({
    data: {
      shopId,
      type,
      message,
      severity,
      createdAt: new Date(),
    },
  });
}

// Récupérer les logs de sécurité d’un shop
export async function getSecurityLogs(shopId) {
  return prisma.securityLog.findMany({
    where: { shopId },
    orderBy: { createdAt: "desc" },
    take: 100,
  });
}

// Marquer un log comme résolu
export async function resolveSecurityLog(id) {
  return prisma.securityLog.update({
    where: { id },
    data: { resolved: true },
  });
}
