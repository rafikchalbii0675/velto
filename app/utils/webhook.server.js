import crypto from "crypto";

const seenNonces = new Set();

export function validateWebhookWithAntiReplay(request) {
  const hmacHeader = request.headers.get("X-Shopify-Hmac-Sha256");
  const secret = process.env.SHOPIFY_API_SECRET;

  const nonce = request.headers.get("X-Velto-Nonce");
  const timestampHeader = request.headers.get("X-Velto-Timestamp");

  if (!secret) {
    return {
      valid: false,
      message: "Clé API Shopify manquante.",
    };
  }

  const now = Date.now();
  const timestamp = timestampHeader ? Number(timestampHeader) : 0;

  // Fenêtre de 5 minutes
  if (!timestamp || Math.abs(now - timestamp) > 5 * 60 * 1000) {
    return {
      valid: false,
      message: "Timestamp invalide ou expiré.",
    };
  }

  // Anti‑replay
  if (!nonce || seenNonces.has(nonce)) {
    return {
      valid: false,
      message: "Nonce manquant ou déjà utilisé (attaque replay).",
    };
  }

  return request.text().then((body) => {
    const digest = crypto
      .createHmac("sha256", secret)
      .update(body)
      .digest("base64");

    const valid = digest === hmacHeader;

    if (!valid) {
      return {
        valid: false,
        message: "Signature HMAC invalide.",
      };
    }

    seenNonces.add(nonce);

    return {
      valid: true,
      message: "Webhook Shopify valide (anti‑replay activé).",
      rawBody: body,
    };
  });
}
export function validateWebhook(payload) {
  // Exemple simple
  return true;
}
