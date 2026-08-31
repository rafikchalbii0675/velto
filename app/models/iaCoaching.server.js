export function getCoachingAdvice(level) {
  if (level === "beginner") {
    return [
      "Améliorez vos descriptions produits avec des mots simples et clairs.",
      "Ajoutez une image plus lumineuse pour attirer l’attention.",
      "Activez une promotion IA pour booster vos premières ventes.",
      "Corrigez une alerte IA pour gagner des points.",
    ];
  }

  if (level === "pro") {
    return [
      "Utilisez IA Vision pour améliorer la qualité de vos images.",
      "Activez Auto‑Pilot IA pour optimiser vos produits automatiquement.",
      "Testez une promotion ciblée sur vos produits performants.",
      "Optimisez vos prix avec IA pour augmenter votre marge.",
    ];
  }

  if (level === "premium") {
    return [
      "Profitez de vos récompenses premium pour booster votre motivation.",
      "Utilisez IA Vision avancée pour perfectionner vos images.",
      "Activez Auto‑Pilot IA complet pour automatiser votre boutique.",
      "Débloquez vos avantages Cozy Warm Or pour maximiser vos résultats.",
    ];
  }

  return [];
}
export function getActionPlan(level) {
  if (level === "beginner") {
    return [
      "Jour 1 : Optimisez un produit.",
      "Jour 2 : Ajoutez une nouvelle image.",
      "Jour 3 : Activez une promotion IA.",
      "Jour 4 : Corrigez une alerte IA.",
      "Jour 5 : Analysez vos ventes.",
      "Jour 6 : Ajoutez un nouveau produit.",
      "Jour 7 : Reposez-vous et laissez l’IA travailler.",
    ];
  }

  if (level === "pro") {
    return [
      "Jour 1 : IA Vision sur vos produits.",
      "Jour 2 : Auto‑Pilot IA sur 3 produits.",
      "Jour 3 : Optimisation des prix IA.",
      "Jour 4 : Analyse des ventes IA.",
      "Jour 5 : Promotion ciblée IA.",
      "Jour 6 : Mise en avant des produits performants.",
      "Jour 7 : Revue IA complète.",
    ];
  }

  if (level === "premium") {
    return [
      "Jour 1 : IA Vision avancée.",
      "Jour 2 : Auto‑Pilot IA complet.",
      "Jour 3 : Optimisation automatique.",
      "Jour 4 : Analyse IA avancée.",
      "Jour 5 : Activation Cozy Warm Or.",
      "Jour 6 : Mise en avant premium.",
      "Jour 7 : Coaching IA personnalisé.",
    ];
  }

  return [];
}
