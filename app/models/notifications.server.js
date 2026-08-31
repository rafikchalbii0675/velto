// app/models/notifications.server.js

// IMPORTANT : alias "~" casse dans Railway → chemin relatif 100% fiable
import { prisma } from "../db.server";

// Ajouter une notification
export async function addNotification({ shopId, type, message }) {
  return prisma.notification.create({
    data: {
      shopId,
      type,
      message,
      createdAt: new Date(),
    },
  });
}

// Récupérer les notifications d’un shop
export async function getNotifications(shopId) {
  return prisma.notification.findMany({
    where: { shopId },
    orderBy: { createdAt: "desc" },
    take: 50,
  });
}

// Marquer une notification comme lue
export async function markNotificationRead(id) {
  return prisma.notification.update({
    where: { id },
    data: { read: true },
  });
}
