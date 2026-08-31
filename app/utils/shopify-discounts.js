export async function createShopifyDiscount({ admin, title, percentage }) {
  try {
    if (!admin) {
      return { error: "Admin API non disponible." };
    }

    if (!title || !percentage || percentage <= 0) {
      return { error: "Titre ou pourcentage invalide." };
    }

    // Shopify Price Rule API
    const response = await admin.rest.PriceRule.create({
      price_rule: {
        title,
        target_type: "line_item",
        target_selection: "all",
        allocation_method: "across",
        value_type: "percentage",
        value: `-${percentage}`,
        customer_selection: "all",
        starts_at: new Date().toISOString(),
      },
    });

    if (!response || !response.body || !response.body.price_rule) {
      return { error: "Réponse Shopify invalide." };
    }

    return {
      success: true,
      priceRule: response.body.price_rule,
    };
  } catch (err) {
    console.error("Erreur Shopify Discount:", err);

    if (err?.response?.status === 402) {
      return { error: "Paiement requis (402) — Shopify bloque la création." };
    }

    if (err?.response?.status === 403) {
      return { error: "Accès refusé (403) — Scope manquant." };
    }

    if (err?.response?.status === 422) {
      return { error: "Données invalides (422) — Vérifiez le titre ou le pourcentage." };
    }

    return { error: "Erreur interne Shopify." };
  }
}
