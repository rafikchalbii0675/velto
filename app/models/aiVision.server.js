import { prisma } from "~/db.server";

export async function analyzeProductImage(product) {
  const insights = [];

  // -----------------------------
  // IA Vision : Détection flou
  // -----------------------------
  if (product.imageBlurScore && product.imageBlurScore > 0.7) {
    insights.push(`L’image du produit "${product.title}" semble floue.`);
  }

  // -----------------------------
  // IA Vision : Détection luminosité
  // -----------------------------
  if (product.imageBrightness && product.imageBrightness < 0.3) {
    insights.push(`L’image du produit "${product.title}" est trop sombre.`);
  }

  // -----------------------------
  // IA Vision : Détection cadrage
  // -----------------------------
  if (product.imageCropScore && product.imageCropScore < 0.4) {
    insights.push(`L’image du produit "${product.title}" semble mal cadrée.`);
  }

  // -----------------------------
  // IA Vision : Détection incohérence
  // -----------------------------
  if (product.imageLabel && !product.title.toLowerCase().includes(product.imageLabel.toLowerCase())) {
    insights.push(
      `L’image du produit "${product.title}" ne correspond pas à l’objet détecté : ${product.imageLabel}.`
    );
  }

  return insights;
}

export async function getVisionInsights(shopId) {
  const products = await prisma.product.findMany({
    where: { shopId },
  });

  const results = [];

  for (const p of products) {
    const insights = await analyzeProductImage(p);

    if (insights.length > 0) {
      results.push({
        productId: p.id,
        title: p.title,
        insights,
      });
    }
  }

  return results;
}
