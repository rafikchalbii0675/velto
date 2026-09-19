// app/utils/notifications.server.js

import { prisma } from "../db.server";   // ← FIX : import correct

export async function createNotification({
  shop,
  title,
  message,
  level = "info",
}) {
  return prisma.notification.create({
    data: {
      shop,
      title,
      message,
      level,
    },
  });
}

export async function getNotifications(shop) {
  return prisma.notification.findMany({
    where: { shop },
    orderBy: { createdAt: "desc" },
    take: 50,
  });
}

export async function deleteNotification(id) {
  return prisma.notification.delete({
    where: { id },
  });
}

// ← FIX : ajouter la fonction manquante
export async function markNotificationRead(id) {
  return prisma.notification.update({
    where: { id },
    data: { read: true },
  });
}
