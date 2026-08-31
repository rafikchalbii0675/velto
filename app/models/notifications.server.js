import { prisma } from "~/db.server";

export async function addNotification({ shopId, type, message }) {
  return prisma.notification.create({
    data: {
      shopId,
      type,
      message,
    },
  });
}

export async function getNotifications(shopId) {
  return prisma.notification.findMany({
    where: { shopId },
    orderBy: { createdAt: "desc" },
    take: 50,
  });
}
