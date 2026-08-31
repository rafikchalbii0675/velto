export function iaFutureEngine(context) {
  const { level, points, progress, language, history } = context;

  return {
    greeting: getGreeting(language),
    prediction: getPrediction(level, history),
    motivation: getMotivation(level),
    suggestion: getSuggestion(level, progress),
    action: getAction(level),
  };
}
function getGreeting(lang) {
  const greetings = {
    fr: "Bonjour Studio Cozy, prêt pour une nouvelle journée ?",
    en: "Good morning Studio Cozy, ready for a new day?",
    ar: "صباح الخير ستوديو كوزي، هل أنت جاهز ليوم جديد؟",
    es: "Buenos días Studio Cozy, listo para un nuevo día?",
  };

  return greetings[lang] || greetings["fr"];
}
function getPrediction(level, history) {
  if (level === "beginner") return "Je prévois que tu peux optimiser un produit aujourd’hui.";
  if (level === "pro") return "Tu peux améliorer 3 produits avec IA Vision.";
  if (level === "premium") return "Auto‑Pilot IA peut optimiser toute ta boutique aujourd’hui.";

  return "Je suis prêt à t’aider.";
}
function getMotivation(level) {
  if (level === "beginner") return "Chaque pas compte. Tu construis quelque chose de beau.";
  if (level === "pro") return "Tu deviens un entrepreneur solide. Continue.";
  if (level === "premium") return "Tu es au sommet. Avance avec confiance.";

  return "Tu progresses, et je suis avec toi.";
}
function getSuggestion(level, progress) {
  if (progress < 50) return "Encore un petit effort pour avancer vers ton prochain niveau.";
  if (progress < 80) return "Tu es proche du prochain niveau, continue comme ça.";
  return "Tu es presque Premium, Doc.";
}
function getAction(level) {
  if (level === "beginner") return "Je peux optimiser un produit pour toi.";
  if (level === "pro") return "Je peux analyser tes ventes IA.";
  if (level === "premium") return "Je peux activer Auto‑Pilot IA complet.";

  return "Je suis prêt.";
}
