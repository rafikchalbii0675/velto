import { json } from "@remix-run/node";
import { authenticate } from "~/shopify.server";
import prisma from "~/db.server";

export async function action({ request }) {
  const { topic, shop, payload } = await authenticate.webhook(request);

  switch (topic) {
    case "CUSTOMERS_DATA_REQUEST": {
      const { customer } = payload;

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
      const { customer } = payload;

      await prisma.gdprRequest.create({
        data: {
          type: "CUSTOMER_REDACT",
          shopDomain: shop,
          customerId: String(customer.id),
          customerEmail: customer.email,
          payload: JSON.stringify(payload),
          status: "COMPLETED",
        },
      });
      break;
    }

    case "SHOP_REDACT": {
      const shopRecord = await prisma.shop.findUnique({
        where: { shopId: shop },
      });

      if (shopRecord) {
        await prisma.shop.delete({ where: { id: shopRecord.id } });
      }

      await prisma.gdprRequest.create({
        data: {
          type: "SHOP_REDACT",
          shopDomain: shop,
          payload: JSON.stringify(payload),
          status: "COMPLETED",
        },
      });
      break;
    }

    default:
      console.warn(`Topic GDPR non gere: ${topic}`);
  }

  return json({ ok: true });
}