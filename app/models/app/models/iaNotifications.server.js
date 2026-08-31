import { prisma } from "~/db.server";

export async function sendNotification(shopId, type, title, message) {
  return prisma.iANotification.create({
    data: { shopId, type, title, message },
  });
}
