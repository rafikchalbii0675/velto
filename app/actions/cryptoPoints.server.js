import { updatePoints } from "~/actions/updatePoints.server";
import { addLog } from "~/models/logs.server";
import { addNotification } from "~/models/notifications.server";
import { addSecurityLog } from "~/models/securityLogs.server";

export async function processCryptoSale({ shopId, amount, currency, txId }) {
  // 1. Sécurité : transaction très élevée
  if (amount > 10000) {
    await addSecurityLog({
      shopId,
      type: "crypto",
      message: `Transaction crypto EXTRÊMEMENT élevée : ${amount} ${currency}`,
      severity: "high",
    });
  }

  // 2. Type de vente
  const saleType = "crypto";

  // 3. Abonnement (placeholder)
  const subscription = "pro";

  // 4. Points IA
  const points = await updatePoints(shopId, saleType, subscription, currency);

  // 5. Log IA
  await addLog({
    type: "crypto",
    message: `Vente crypto : ${amount} ${currency} (tx: ${txId})`,
  });

  // 6. Notification (optionnel)
  await addNotification({
    shopId,
    title: "Nouvelle vente crypto",
    message: `Une vente crypto de ${amount} ${currency} a été enregistrée.`,
  });

  return { points };
}
