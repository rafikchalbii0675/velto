import prisma from "~/db.server";

export async function getSidebarData(shopId) {
  const [latestNotification, latestAction] = await Promise.all([
    prisma.iANotification.findFirst({
      where: { shopId },
      orderBy: { createdAt: "desc" },
    }),
    prisma.iATransaction.findFirst({
      where: { shopId },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return { latestNotification, latestAction };
}