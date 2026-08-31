import db from "../../../db.server";
import { createNotification } from "../notifications.server";

// Calcule un score de "priorité" pour un produit
function computeProductScore(product) {
    const viewsWeight = 0.3;
    const cartWeight = 0.4;
    const salesWeight = 0.3;
    const decay = 0.95;

    const baseScore =
        product.viewsCount * viewsWeight +
        product.addToCartCount * cartWeight +
        product.salesCount * salesWeight;

    return baseScore * decay;
}

// Calcule un score de "risque" pour une page SEO
function computeSeoRisk(page) {
    const score = 100 - page.seoScore;
    const slowPenalty = page.loadTimeMs > 2500 ? 20 : 0;
    return score - slowPenalty;
}
