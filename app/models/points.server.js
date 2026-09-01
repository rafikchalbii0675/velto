// app/models/points.server.js

// IMPORTANT : alias "~" interdit → chemin relatif obligatoire
import { prisma } from "../db.server";

/**
 * Récupère les points du shop
 */
export async function getPoints(shopId) {
  const shop = await prisma.shop.findUnique({
    where: { id: shopId },
    select: {
      points: true,
    },
  });

  if (!shop) {
    return {
      shopFound: false,
      points: 0,
    };
  }

  return {
    shopFound: true,
    points: shop.points,
  };
}

/**
 * Ajoute des points au shop
 */
export async function addPoints(shopId, amount) {
  const shop = await prisma.shop.update({
    where: { id: shopId },
    data: {
      points: {
        increment: amount,
      },
    },
    select: {
      points: true,
    },
  });

  return {
    shopFound: true,
    points: shop.points,
  };
}

/**
 * Retire des points au shop
 */
export async function removePoints(shopId, amount) {
  const shop = await prisma.shop.update({
    where: { id: shopId },
    data: {
      points: {
        decrement: amount,
      },
    },
    select: {
      points: true,
    },
  });

  return {
    shopFound: true,
    points: shop.points,
  };
}
