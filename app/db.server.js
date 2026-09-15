import { PrismaClient } from "@prisma/client";

let prisma;

if (!global.__db__) {
  global.__db__ = new PrismaClient();
}

prisma = global.__db__;

// -----------------------------
// PRODUITS & STOCK
// -----------------------------

export async function getProducts(shop) {
  return prisma.product.findMany({
    where: { shop },
    orderBy: { createdAt: "desc" },
  });
}

export async function updateStock(productId, quantity) {
  return prisma.product.update({
    where: { id: productId },
    data: { stock: quantity },
  });
}

// -----------------------------
// IA : TENDANCES & SEO
// -----------------------------

export async function saveProductAIInsights(productId, insights) {
  return prisma.product.update({
    where: { id: productId },
    data: {
      ai_trends: insights.trends || null,
      ai_seo: insights.seo || null,
      ai_score: insights.score || null,
    },
  });
}

// -----------------------------
// NOTIFICATIONS IA
// -----------------------------

export async function createNotification(shop, type, message) {
  return prisma.notification.create({
    data: {
      shop,
      type,
      message,
      read: false,
    },
  });
}

export async function getNotifications(shop) {
  return prisma.notification.findMany({
    where: { shop },
    orderBy: { createdAt: "desc" },
  });
}

export async function markNotificationRead(id) {
  return prisma.notification.update({
    where: { id },
    data: { read: true },
  });
}

// -----------------------------
// EXPORTS
// -----------------------------

export { prisma };
export default prisma;
