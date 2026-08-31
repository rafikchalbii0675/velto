import { prisma } from "~/db.server";

export async function getPoints(shopId) {
  const record = await prisma.points.findUnique({
    where: { shopId },
  });

  if (!record) {
    return {
      total: 0,
      month: 0,
      level: "Bronze Cozy",
    };
  }

  return record;
}
