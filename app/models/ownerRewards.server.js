import { prisma } from "~/db.server";

export async function addOwnerPoints(ownerId, amount) {
  const data = await prisma.ownerPoints.update({
    where: { ownerId },
    data: { points: { increment: amount } },
  });

  return data;
}

export async function unlockOwnerReward(ownerId, title, type) {
  return prisma.ownerReward.create({
    data: { ownerId, title, type },
  });
}
