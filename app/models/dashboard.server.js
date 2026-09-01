// app/models/dashboard.server.js

// IMPORTANT : alias "~" interdit → chemin relatif obligatoire
import { prisma } from "../db.server";

export async function getDashboardData(shopId) {
  const shop = await prisma.shop.findUnique({
    where: { id: shopId },
    include: {
      products: true,
      promotions: true,
      logs: true,
    },
  });

  if (!shop) {
    return {
      shopFound: false,
      data: null,
    };
  }

  return {
    shopFound: true,
    data: {
      name: shop.name,
      points: shop.points,
      productsCount: shop.products.length,
      promotionsCount: shop.promotions.length,
      logsCount: shop.logs.length,
      createdAt: shop.createdAt,
    },
  };
}
