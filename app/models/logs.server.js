// app/models/logs.server.js

// IMPORTANT : alias "~" interdit → chemin relatif obligatoire
import { prisma } from "../db.server";

// Ajouter un log dans la base
export async function addLog({ type, message }) {
  return prisma.log.create({
    data: {
      type,
      message,
      createdAt: new Date(),
    },
  });
}

// Récupérer les logs
export async function getLogs(limit = 50) {
  return prisma.log.findMany({
    orderBy: { createdAt: "desc" },
    take: limit,
  });
}
