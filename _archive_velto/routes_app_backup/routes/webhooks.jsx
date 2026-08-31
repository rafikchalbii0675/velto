import { validateWebhook } from "../utils/webhook.server";
import { logSecurityEvent } from "../utils/audit.server";

export async function action({ request }) {
  // 1. Validation PRO du webhook
  const validation = await validateWebhook(request);

  // 2. Audit log premium
  logSecurityEvent("Webhook reçu", {
    valid: validation.valid,
    message: validation.message,
  });

  // 3. Rejet si signature invalide
  if (!validation.valid) {
    logSecurityEvent("Webhook rejeté", {
      reason: "Signature invalide",
    });

    return new Response("Invalid webhook", { status: 401 });
  }

  // 4. Acceptation si signature valide
  logSecurityEvent("Webhook accepté", {
    rawBody: validation.rawBody,
  });

  return new Response("Webhook processed", { status: 200 });
}
