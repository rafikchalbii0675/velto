import { prisma } from "~/db.server";

export async function addSecurityLog({ shopId, type, message, severity }) {
  return prisma.securityLog.create({
    data: { shopId, type, message, severity },
  });
}

export async function getSecurityLogs(shopId) {
  return prisma.securityLog.findMany({
    where: { shopId },
    orderBy: { createdAt: "desc" },
    take: 100,
  });
}
