import { prisma } from "~/db.server";

export async function getRewardsForLevel(level) {
  return prisma.iAReward.findMany({
    where: { level },
  });
}

export async function getPartnerOffers(level) {
  return prisma.iAPartnerOffer.findMany({
    where: { minLevel: level },
  });
}
