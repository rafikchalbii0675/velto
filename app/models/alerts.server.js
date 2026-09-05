// app/models/alerts.server.js

// IMPORTANT : alias "~" casse dans Railway  chemin relatif 100% fiable
import { prisma } from "../db.server";

// Ajouter une alerte
export async function addAlert({ shopId, type, message }) {
  return prisma.alert.create({
    data: {
      shopId,
      type,
      message,
      createdAt: new Date(),
    },
  });
}

// Récupérer les alertes d’un shop
export async function getAlerts(shopId) {
  return prisma.alert.findMany({
    where: { shopId },
    orderBy: { createdAt: "desc" },
    take: 50,
  });
}

// Marquer une alerte comme lue
export async function markAlertRead(id) {
  return prisma.alert.update({
    where: { id },
    data: { read: true },
  });
}
