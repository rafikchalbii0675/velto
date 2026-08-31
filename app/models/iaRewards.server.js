// app/models/iaRewards.server.js

// IMPORTANT : alias "~" casse dans Railway → chemin relatif 100% fiable
import { prisma } from "../db.server";

// Récupérer les récompenses IA selon le niveau
export async function getRewardsForLevel(level) {
  return prisma.iaReward.findMany({
    where: { level },
    orderBy: { createdAt: "desc" },
    take: 50,
  });
}

// Récupérer toutes les récompenses IA
export async function getAllRewards() {
  return prisma.iaReward.findMany({
    orderBy: { createdAt: "desc" },
  });
}

// Ajouter une récompense IA
export async function addReward({ level, title, description, bonus }) {
  return prisma.iaReward.create({
    data: {
      level,
      title,
      description,
      bonus,
      createdAt: new Date(),
    },
  });
}
