import { prisma } from "~/db.server";

export async function addLog({ type, message }) {
  return prisma.log.create({
    data: { type, message },
  });
}

export async function getLogs(shopId) {
  return prisma.log.findMany({
    where: { shopId },
    orderBy: { createdAt: "desc" },
    take: 200,
  });
}
