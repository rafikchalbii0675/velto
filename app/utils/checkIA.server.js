import { prisma } from "../db.server";
import { authenticate } from "../shopify.server";
import { redirect } from "@remix-run/node";

/**
 * Bloque l'accès IA pour FREE
 * Autorise PRO et PREMIUM
 */
export async function checkIA(request) {
  const { session } = await authenticate.admin(request);

  const shop = await prisma.shop.findUnique({
    where: { shop: session.shop },
    select: { plan: true }
  });

  const plan = shop?.plan || "FREE";

  // FREE → pas d'IA
  if (plan === "FREE") {
    return redirect("/app/settings/subscription");
  }

  // PRO ou PREMIUM → accès autorisé
  return null;
}
