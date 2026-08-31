import { prisma } from "~/db.server";

export async function getPartnerOffersForLevel(level) {
  return prisma.partnerOffer.findMany({
    where: { minLevel: level },
    include: { partner: true },
  });
}

export async function negotiatePartnerOffer(level, points) {
  // IA négocie automatiquement selon le niveau + points
  if (level === "premium" && points > 8000) {
    return {
      title: "Billet d’avion offert",
      description: "Votre niveau Premium vous donne accès à un billet d’avion offert par notre partenaire.",
      type: "travel",
      value: 1,
    };
  }

  if (level === "premium" && points > 5000) {
    return {
      title: "Nuit d’hôtel 5★",
      description: "Profitez d’une nuit d’hôtel pour deux dans un établissement partenaire.",
      type: "hotel",
      value: 1,
    };
  }

  if (level === "pro" && points > 2500) {
    return {
      title: "SPA complet",
      description: "Un SPA complet pour deux offert par notre partenaire bien-être.",
      type: "spa",
      value: 1,
    };
  }

  if (level === "beginner" && points > 500) {
    return {
      title: "Carte cadeau 25$",
      description: "Une carte cadeau offerte pour vous encourager dans votre progression.",
      type: "gift",
      value: 25,
    };
  }

  return null;
}
