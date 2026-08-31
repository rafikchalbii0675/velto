import { prisma } from "~/db.server";

export async function addPoints(shopId, amount) {
  const data = await prisma.iAPoints.findUnique({ where: { shopId } });

  const newPoints = data.points + amount;
  const progress = Math.min(Math.floor((newPoints / 10000) * 100), 100);

  let level = "beginner";
  if (progress >= 40 && progress < 80) level = "pro";
  if (progress >= 80) level = "premium";

  await prisma.iAPoints.update({
    where: { shopId },
    data: { points: newPoints, progress, level },
  });

  return { newPoints, progress, level };
}
