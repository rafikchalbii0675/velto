import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Les calculs restent 100% déterministes — rapides, gratuits, fiables.
// Pas besoin d'IA pour de l'arithmétique.
function computeMetrics({ price, cost, conversion, views }) {
  const margin = price - cost;
  const marginRate = (margin / price) * 100;

  const performance =
    conversion >= 3 ? "Excellent" :
    conversion >= 2 ? "Bon" :
    conversion >= 1 ? "Faible" : "Très faible";

  return {
    margin,
    marginRate: Number(marginRate.toFixed(2)),
    performance,
  };
}

// L'IA n'intervient QUE pour la partie qui bénéficie du langage naturel :
// expliquer le "pourquoi" et proposer une action précise et contextuelle.
async function generateAIRecommendation({ productName, price, cost, conversion, views, margin, marginRate, performance }) {
  const prompt = `Tu es un conseiller e-commerce pour Shopify. Voici les données d'un produit :
- Nom : ${productName}
- Prix : ${price}$
- Coût : ${cost}$
- Marge : ${margin.toFixed(2)}$ (${marginRate}%)
- Taux de conversion : ${conversion}%
- Vues : ${views}
- Performance : ${performance}

En 2 phrases maximum, en français, donne UNE recommandation concrète et actionnable pour améliorer les ventes ou la rentabilité de ce produit. Sois direct, pas de généralités.`;

  const message = await anthropic.messages.create({
    model: "claude-sonnet-5",
    max_tokens: 200,
    messages: [{ role: "user", content: prompt }],
  });

  return message.content[0].text;
}

export async function analyzeProduct({ productName, price, cost, conversion, views }) {
  const metrics = computeMetrics({ price, cost, conversion, views });

  let recommendation;
  try {
    recommendation = await generateAIRecommendation({
      productName,
      price,
      cost,
      conversion,
      views,
      ...metrics,
    });
  } catch (error) {
    // Si l'API IA échoue (quota, réseau...), on retombe sur une règle simple
    // plutôt que de casser le dashboard.
    console.error("Erreur IA product analysis:", error);
    recommendation =
      metrics.marginRate < 20
        ? "Augmenter légèrement le prix ou réduire les coûts."
        : conversion < 2
        ? "Optimiser la page produit ou ajouter une promotion."
        : "Produit performant, rien à changer.";
  }

  return {
    productName,
    ...metrics,
    recommendation,
  };
}