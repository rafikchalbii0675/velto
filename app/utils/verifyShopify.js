import crypto from "crypto";

export function verifyShopifyHmac(request) {
  const secret = process.env.SHOPIFY_WEBHOOK_SECRET;

  const hmacHeader = request.headers.get("X-Shopify-Hmac-Sha256");
  if (!hmacHeader) return false;

  return request.clone().arrayBuffer().then((buffer) => {
    const digest = crypto
      .createHmac("sha256", secret)
      .update(Buffer.from(buffer))
      .digest("base64");

    return digest === hmacHeader;
  });
}
