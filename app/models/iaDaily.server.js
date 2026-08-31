export function getDailyGreeting(name = "Studio Cozy") {
  const greetings = [
    `Bonjour ${name}, prêt à commencer une belle journée Cozy Warm Or.`,
    `Salut ${name}, aujourd’hui on avance ensemble.`,
    `${name}, l’IA est prête pour toi. On y va.`,
    `Bonjour ${name}, je t’ai préparé tes priorités du jour.`,
  ];

  return greetings[Math.floor(Math.random() * greetings.length)];
}
export function getDailyPriorities(level) {
  if (level === "beginner") {
    return [
      "Optimiser un produit.",
      "Ajouter une image plus claire.",
      "Activer une promotion IA.",
    ];
  }

  if (level === "pro") {
    return [
      "IA Vision sur 3 produits.",
      "Auto‑Pilot IA sur les produits performants.",
      "Optimisation des prix IA.",
    ];
  }

  if (level === "premium") {
    return [
      "IA Vision avancée.",
      "Auto‑Pilot IA complet.",
      "Activation Cozy Warm Or.",
    ];
  }

  return [];
}
export function getDailyMotivation(level = "beginner") {
  const motivations = {
    beginner:
      "Chaque petite amélioration rapproche votre boutique de sa première grande réussite.",

    pro:
      "Votre expérience devient un avantage : analysez, optimisez et avancez avec confiance.",

    premium:
      "Vous avez atteint un niveau avancé. Aujourd’hui, transformez votre vision en croissance durable.",
  };

  return motivations[level] ?? motivations.beginner;
}