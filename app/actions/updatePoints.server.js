// app/actions/updatePoints.server.js

// IMPORTANT : alias "~" casse dans Railway → chemin relatif obligatoire
import { prisma } from "../db.server";

// Calcul des points gagnés selon le type de vente
function calculateEarnedPoints(saleType, subscription, currency) {
  let basePoints = 0;

  if (saleType === "subscription") {
    basePoints = subscription === "premium" ? 50 : 20;
  } else if (saleType === "one_time") {
    basePoints = 10;
  }

  // Bonus selon la devise
  if (currency === "USD") basePoints += 5;
  if (currency === "EUR") basePoints += 3;

  return basePoints;
}

// Mise à jour des points du shop
export async function updatePoints(shopId, saleType, subscription, currency) {
  const shop = await prisma.shop.findUnique({
    where: { id: shopId },
  });

  if (!shop) {
    return { success: false, reason: "shop_not_found" };
  }

  const earnedPoints = calculateEarnedPoints(
    saleType,
    subscription,
    currency
  );

  await prisma.shop.update({
    where: { id: shopId },
    data: {
      points: shop.points + earnedPoints,
    },
  });

  return {
    success: true,
    earnedPoints,
    totalPoints: shop.points + earnedPoints,
  };
}
