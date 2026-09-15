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
      const email = customer.email;

      // On anonymise toute trace de l'email du client dans les notifications
      // (aucune table Customer dédiée n'existe actuellement dans le schéma)
      if (email) {
        await prisma.notification.updateMany({
          where: { shopId: shop, message: { contains: email } },
          data: { message: "[Donnée client supprimée - RGPD]" },
        });

        await prisma.iANotification.updateMany({
          where: { shopId: shop, message: { contains: email } },
          data: { message: "[Donnée client supprimée - RGPD]" },
        });
      }

      await prisma.gdprRequest.create({
        data: {
          type: "CUSTOMER_REDACT",
          shopDomain: shop,
          customerId: String(customer.id),
          customerEmail: email,
          payload: JSON.stringify(payload),
          status: "COMPLETED",
        },
      });
      break;
    }

    case "SHOP_REDACT": {
      // Suppression manuelle dans toutes les tables liées à cette boutique,
      // car il n'existe pas de relation Prisma/cascade entre Shop et les autres modèles.
      await prisma.$transaction([
        prisma.points.deleteMany({ where: { shopId: shop } }),
        prisma.cryptoSale.deleteMany({ where: { shopId: shop } }),
        prisma.notification.deleteMany({ where: { shopId: shop } }),
        prisma.product.deleteMany({ where: { shopId: shop } }),
        prisma.alert.deleteMany({ where: { shopId: shop } }),
        prisma.securityLog.deleteMany({ where: { shopId: shop } }),
        prisma.iAPoints.deleteMany({ where: { shopId: shop } }),
        prisma.iAWallet.deleteMany({ where: { shopId: shop } }),
        prisma.iATransaction.deleteMany({ where: { shopId: shop } }),
        prisma.iANotification.deleteMany({ where: { shopId: shop } }),
        prisma.iACoaching.deleteMany({ where: { shopId: shop } }),
        prisma.iASuccess.deleteMany({ where: { shopId: shop } }),
        prisma.user.deleteMany({ where: { shopId: shop } }),
        prisma.shop.deleteMany({ where: { shopId: shop } }),
      ]);

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