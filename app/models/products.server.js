import { prisma } from "~/db.server";

export async function getProducts(shopId) {
  return prisma.product.findMany({
    where: { shopId },
    orderBy: { createdAt: "desc" },
  });
}

export async function updateProductScore(productId) {
  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  // Score IA simple : ventes + prix / 10
  const score = product.sales + product.price / 10;

  return prisma.product.update({
    where: { id: productId },
    data: { score },
  });
}

export async function getHotProducts(shopId) {
  return prisma.product.findMany({
    where: { shopId },
    orderBy: { score: "desc" },
    take: 10,
  });
}
