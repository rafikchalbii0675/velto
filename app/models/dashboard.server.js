import { prisma } from "~/db.server";

export async function getDashboardData(shopId) {
  const points = await prisma.points.findUnique({
    where: { shopId },
  });

  const logs = await prisma.logs.findMany({
    orderBy: { date: "desc" },
    take: 20,
  });

  const crypto = await prisma.cryptoSale.findMany({
    where: { shopId },
    orderBy: { createdAt: "desc" },
    take: 20,
  });

  return { points, logs, crypto };
}
