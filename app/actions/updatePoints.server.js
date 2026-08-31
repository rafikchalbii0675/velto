import { prisma } from "~/db.server";

function calculateEarnedPoints(saleType, subscription, currency) {
  const salePoints = {
    crypto: 100,
    product: 50,
    service: 75,
  };

  const subscriptionMultiplier = {
    free: 1,
    fidelity: 1.25,
    pro: 1.5,
    premium: 2,
  };

  const basePoints = salePoints[saleType] ?? 50;
  const multiplier = subscriptionMultiplier[subscription] ?? 1;
  const cryptoBonus = currency ? 25 : 0;

  return Math.round(basePoints * multiplier + cryptoBonus);
}

function calculateLevel(totalPoints) {
  if (totalPoints >= 30000) {
    return {
      level: "premium",
      progress: 100,
    };
  }

  if (totalPoints >= 5000) {
    return {
      level: "pro",
      progress: Math.min(
        100,
        Math.round(((totalPoints - 5000) / 25000) * 100),
      ),
    };
  }

  return {
    level: "beginner",
    progress: Math.min(100, Math.round((totalPoints / 5000) * 100)),
  };
}

export async function updatePoints(
  shopId,
  saleType,
  subscription,
  currency,
) {
  if (!shopId) {
    throw new Error("updatePoints : shopId est obligatoire");
  }

  const earnedPoints = calculateEarnedPoints(
    saleType,
    subscription,
    currency,
  );

  const existing = await prisma.iAPoints.findFirst({
    where: { shopId },
  });

  const totalPoints = (existing?.points ?? 0) + earnedPoints;
  const { level, progress } = calculateLevel(totalPoints);

  if (existing) {
    return prisma.iAPoints.update({
      where: { id: existing.id },
      data: {
        points: totalPoints,
        level,
        progress,
      },
    });
  }

  return prisma.iAPoints.create({
    data: {
      shopId,
      points: totalPoints,
      level,
      progress,
    },
  });
}