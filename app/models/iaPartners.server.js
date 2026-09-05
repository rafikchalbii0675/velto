// app/models/iaPartners.server.js

// IMPORTANT : alias "~" casse dans Railway  chemin relatif 100% fiable
import { prisma } from "../db.server";

// Récupérer les offres partenaires selon le niveau IA
export async function getPartnerOffersForLevel(level) {
  return prisma.partnerOffer.findMany({
    where: { level },
    orderBy: { createdAt: "desc" },
    take: 50,
  });
}

// Récupérer toutes les offres partenaires
export async function getAllPartnerOffers() {
  return prisma.partnerOffer.findMany({
    orderBy: { createdAt: "desc" },
  });
}

// Ajouter une offre partenaire
export async function addPartnerOffer({ level, title, description, link }) {
  return prisma.partnerOffer.create({
    data: {
      level,
      title,
      description,
      link,
      createdAt: new Date(),
    },
  });
}
