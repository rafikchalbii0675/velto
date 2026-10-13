import "@shopify/shopify-api/adapters/node";
import { shopifyApi, ApiVersion } from "@shopify/shopify-api";

// Velto - Shopify Server Utilities
// Gestion des appels Admin API (REST)

// Initialisation de l'API Shopify
export const shopify = shopifyApi({
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_API_SECRET,
  apiVersion: ApiVersion.October24,
  scopes: process.env.SCOPES.split(","),
  hostName: process.env.SHOPIFY_APP_URL.replace("https://", ""),
});

// Création d’un produit Shopify via Admin API
export async function createShopifyProduct(session, product) {
  const client = new shopify.clients.Rest({ session });

  const response = await client.post({
    path: "products",
    data: {
      product: {
        title: product.title,
        body_html: product.description,
        vendor: "Velto IA",
        product_type: product.category || "IA Generated",
        tags: product.tags,
        variants: [
          {
            price: product.price || "0.00",
          },
        ],
      },
    },
  });

  return response.body.product;
}

// Mise à jour d’un produit Shopify
export async function updateShopifyProduct(session, productId, updates) {
  const client = new shopify.clients.Rest({ session });

  const response = await client.put({
    path: `products/${productId}`,
    data: {
      product: {
        id: productId,
        ...updates,
      },
    },
  });

  return response.body.product;
}

// Suppression d’un produit Shopify
export async function deleteShopifyProduct(session, productId) {
  const client = new shopify.clients.Rest({ session });

  const response = await client.delete({
    path: `products/${productId}`,
  });

  return response;
}

// Récupération d’un produit Shopify
export async function getShopifyProduct(session, productId) {
  const client = new shopify.clients.Rest({ session });

  const response = await client.get({
    path: `products/${productId}`,
  });

  return response.body.product;
}

// Récupération de tous les produits Shopify
export async function listShopifyProducts(session, limit = 50) {
  const client = new shopify.clients.Rest({ session });

  const response = await client.get({
    path: "products",
    query: { limit },
  });

  return response.body.products;
}
