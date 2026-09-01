// app/models/system.server.js

// IMPORTANT : alias "~" interdit → chemin relatif obligatoire
import { prisma } from "../db.server";

export async function getSystemStatus(shopId) {
  const shop = await prisma.shop.findUnique({
    where: { id: shopId },
    include: {
      logs: true,
      products: true,
      promotions: true,
    },
  });

  if (!shop) {
    return {
      shopFound: false,
      system: null,
    };
  }

  return {
    shopFound: true,
    system: {
      name: shop.name,
      points: shop.points,
      logsCount: shop.logs.length,
      productsCount: shop.products.length,
      promotionsCount: shop.promotions.length,
      createdAt: shop.createdAt,
    },
  };
}
