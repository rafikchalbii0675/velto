export function getProductTrend(product) {
  const sales = product.salesCount || 0;
  const views = product.viewsCount || 0;

  if (sales > 20 && views > 200) return "hausse";
  if (sales < 5 && views > 100) return "baisse";
  return "stable";
}

export function getStockStatus(stockLevel) {
  const available = stockLevel?.available || 0;

  if (available < 5) return "rupture";
  if (available < 20) return "faible";
  if (available > 200) return "surstock";
  return "normal";
}

export function getSeoScore(product) {
  let score = 100;
  const body = product.body_html || "";

  if (!body.toLowerCase().includes("<h1")) score -= 20;
  if (body.length < 200) score -= 15;
  if (!product.images || product.images.length === 0) score -= 10;

  return score;
}

export function getAiSuggestion(product, stockLevel) {
  const trend = getProductTrend(product);
  const stockStatus = getStockStatus(stockLevel);
  const seoScore = getSeoScore(product);

  if (trend === "baisse")
    return "Ce produit est en baisse. Lance une promotion IA de 15%.";

  if (stockStatus === "surstock")
    return "Stock élevé. Crée une promotion pour écouler le stock.";

  if (stockStatus === "rupture")
    return "Stock très faible. Augmente le prix de 5% ou réapprovisionne.";

  if (seoScore < 70)
    return "SEO faible. Ajoute un H1, une description plus longue et des images.";

  return "Produit stable. Rien d'urgent à corriger.";
}