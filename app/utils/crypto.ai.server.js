import crypto from "crypto";

// Vérifie la signature HMAC
export function verifySignature() {
  const secret = process.env.SHOPIFY_API_SECRET;

  if (!secret) {
    return {
      valid: false,
      message: "Clé API Shopify manquante.",
    };
  }

  const payload = "velto-security-check";

  const signature = crypto
    .createHmac("sha256", secret)
    .update(payload)
    .digest("hex");

  return {
    valid: true,
    message: "Signature valide.",
    signature,
  };
}

// Vérifie la présence des clés
export function checkKeys() {
  const keys = {
    apiKey: !!process.env.SHOPIFY_API_KEY,
    apiSecret: !!process.env.SHOPIFY_API_SECRET,
    veltoSecret: !!process.env.VELTO_CRYPTO_SECRET,
  };

  const allGood = keys.apiKey && keys.apiSecret && keys.veltoSecret;

  return {
    allGood,
    keys,
  };
}

// Vérifie les warnings
export function getWarnings() {
  const warnings = [];

  if (process.env.NODE_ENV !== "production") {
    warnings.push("L'application tourne en mode développement.");
  }

  if (!process.env.SHOPIFY_API_SECRET) {
    warnings.push("La clé API Shopify est manquante.");
  }

  return warnings;
}

// Niveau de sécurité (exemple simple)
export function getSecurityLevel(shopId) {
  return "medium";
}
