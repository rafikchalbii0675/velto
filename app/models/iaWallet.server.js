import { prisma } from "~/db.server";

export async function addTransaction(shopId, type, title, amount) {
  await prisma.iATransaction.create({
    data: { shopId, type, title, amount },
  });

  if (type === "points") {
    await prisma.iAWallet.update({
      where: { shopId },
      data: { points: { increment: amount } },
    });
  }

  if (type === "reward") {
    await prisma.iAWallet.update({
      where: { shopId },
      data: { rewards: { increment: amount } },
    });
  }
}
