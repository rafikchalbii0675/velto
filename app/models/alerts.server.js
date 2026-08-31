import { prisma } from "~/db.server";

export async function addAlert({
  shopId,
  type,
  message,
  severity = "info",
}) {
  if (!shopId) {
    throw new Error("addAlert : shopId est obligatoire");
  }

  if (!message) {
    throw new Error("addAlert : message est obligatoire");
  }

  return prisma.alert.create({
    data: {
      shopId,
      type: type || "system",
      message,
      severity,
    },
  });
}

export async function getAlerts(shopId) {
  if (!shopId) {
    return [];
  }

  return prisma.alert.findMany({
    where: { shopId },
    orderBy: { createdAt: "desc" },
  });
}