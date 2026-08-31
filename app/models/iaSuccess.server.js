import { prisma } from "~/db.server";

export async function unlockSuccess(shopId, type, title, description) {
  return prisma.iASuccess.create({
    data: { shopId, type, title, description },
  });
}
