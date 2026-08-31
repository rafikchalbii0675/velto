export function getSuggestions(level) {
  if (level === "beginner") {
    return [
      "Optimisez vos descriptions produits.",
      "Ajoutez une image plus claire.",
      "Activez une promotion IA.",
      "Corrigez une alerte IA.",
    ];
  }

  if (level === "pro") {
    return [
      "Utilisez IA Vision pour améliorer vos images.",
      "Activez Auto‑Pilot IA.",
      "Optimisez vos prix avec IA.",
      "Mettez en avant vos produits performants.",
    ];
  }

  if (level === "premium") {
    return [
      "Profitez de vos récompenses premium.",
      "Activez IA Auto‑Pilot complet.",
      "Utilisez IA Vision avancée.",
      "Débloquez vos avantages Cozy Warm Or.",
    ];
  }

  return [];
}
