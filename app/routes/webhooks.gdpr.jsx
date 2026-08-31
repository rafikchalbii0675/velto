import { json } from "@remix-run/node";
import { authenticate } from "~/shopify.server";
import prisma from "~/db.server";

export async function action({ request }) {
  // authenticate.webhook() vérifie le HMAC ET identifie le topic automatiquement
  const { topic, shop, payload } = await authenticate.webhook(request);

  switch (topic) {
    case "CUSTOMERS_DATA_REQUEST": {
      const { customer, orders_requested } = payload;

      await prisma.gdprRequest.create({
        data: {
          type: "DATA_REQUEST",
          shopDomain: shop,
          customerId: String(customer.id),
          customerEmail: customer.email,
          payload: JSON.stringify(payload),
          status: "PENDING", // à traiter manuellement sous 30 jours
        },
      });
      break;
    }

    case "CUSTOMERS_REDACT": {
      const { customer, orders_to_redact } = payload;

      await prisma.cryptoPayment.updateMany({
        where: { externalOrderId: { in: (orders_to_redact || []).map(String) } },
        data: { customerEmail: null, customerName: null },
      });

      await prisma.gdprRequest.create({
        data: {
          type: "CUSTOMER_REDACT",
          shopDomain: shop,
          customerId: String(customer.id),
          payload: JSON.stringify(payload),
          status: "COMPLETED",
        },
      });
      break;
    }

    case "SHOP_REDACT": {
      const shopRecord = await prisma.shop.findUnique({ where: { domain: shop } });

      if (shopRecord) {
        await prisma.cryptoPayment.deleteMany({ where: { shopId: shopRecord.id } });
        await prisma.wallet.deleteMany({ where: { shopId: shopRecord.id } });
        await prisma.shop.delete({ where: { id: shopRecord.id } });
      }
      break;
    }

    default:
      console.warn(`Topic GDPR non géré: ${topic}`);
  }

  return json({ ok: true });
}
