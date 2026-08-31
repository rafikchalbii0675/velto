import { json } from "@remix-run/node";
import { verifyShopifyHmac } from "~/utils/verifyShopify";
import { addNotification } from "~/models/notifications.server";

export async function action({ request }) {
  const valid = await verifyShopifyHmac(request);
  if (!valid) {
    return json({ error: "Invalid HMAC" }, { status: 401 });
  }

  const body = await request.json();

  await addNotification({
    shopId: body.shop_id,
    type: "customer",
    message: `Nouveau client : ${body.email}`,
  });

  return json({ ok: true });
}
