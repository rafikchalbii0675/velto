import { json } from "@remix-run/node";
import { verifyShopifyHmac } from "~/utils/verifyShopify";
import { processCryptoSale } from "~/actions/cryptoPoints.server";
import { addNotification } from "~/models/notifications.server";

export async function action({ request }) {
  const valid = await verifyShopifyHmac(request);
  if (!valid) {
    return json({ error: "Invalid HMAC" }, { status: 401 });
  }

  const body = await request.json();

  const shopId = body.shop_id;
  const amount = body.total_price;
  const currency = body.currency;
  const txId = body.id;

  // Protection : si amount ou currency manquent → ne pas planter
  if (!amount || !currency) {
    return json({ ok: true });
  }

  await addNotification({
    shopId,
    type: "sale",
    message: `Nouvelle vente Shopify : ${amount} ${currency}`,
  });

  if (["BTC", "ETH", "USDT", "SOL"].includes(currency)) {
    await processCryptoSale({ shopId, amount, currency, txId });
  }

  return json({ ok: true });
}
