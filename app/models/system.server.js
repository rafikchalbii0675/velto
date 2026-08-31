import { prisma } from "~/db.server";

export async function getSystemStats(shopId) {
  const totalPoints = await prisma.points.findMany({
    where: { shopId },
  });

  const totalCrypto = await prisma.cryptoSale.count({
    where: { shopId },
  });

  const totalAlerts = await prisma.alert.count({
    where: { shopId },
  });

  const totalSecurityLogs = await prisma.securityLog.count({
    where: { shopId },
  });

  const totalProducts = await prisma.product.count({
    where: { shopId },
  });

  const healthScore =
    (totalProducts * 2 +
      totalCrypto * 3 +
      totalPoints.length +
      totalSecurityLogs * -1 +
      totalAlerts * -2) /
    10;

  return {
    totalPoints: totalPoints.length,
    totalCrypto,
    totalAlerts,
    totalSecurityLogs,
    totalProducts,
    healthScore: Math.max(0, Math.min(100, Math.round(healthScore))),
  };
}
