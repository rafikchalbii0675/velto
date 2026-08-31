// Ici tu pourras plus tard brancher une vraie IA (OpenAI, Azure, etc.)
// Pour l’instant, on simule une recommandation intelligente.

export async function getDailyOpportunity({ merchant, stats }) {
  const opportunity = {
    id: "poste-canada-bonus-20",
    title: "Postes Canada — +20 points bonus cette semaine",
    description:
      "Postes Canada vient de lancer une promotion nationale avec +20 points bonus par commande. " +
      "Vos clients choisissent ce transporteur dans 62% des commandes récentes.",
    impact: {
      conversion: "+8%",
      loyaltyPoints: "+35%",
      retention: "+12%",
    },
    actionLabel: "Activer la promotion recommandée",
    carrier: "Postes Canada",
    type: "LOYALTY_PROMO",
    expiresAt: "2024-12-31",
  };

  return opportunity;
}

export async function applyDailyOpportunity({ opportunity, merchant }) {
  return {
    success: true,
    message: `La promotion IA "${opportunity.title}" a été activée pour ${merchant.name}.`,
  };
}
