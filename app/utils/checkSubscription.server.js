import { redirect } from "@remix-run/node";
import { prisma } from "../db.server";
import { authenticate } from "../shopify.server";

/**
 * Vérifie l'abonnement du marchand
 * @param {Request} request - Requête Remix
 * @param {Array} allowedPlans - Plans autorisés pour cette page ["PRO", "PREMIUM"]
 */
export async function checkSubscription(request, allowedPlans = []) {
  const { session } = await authenticate.admin(request);

  // Lecture du plan dans la DB
  const shop = await prisma.shop.findUnique({
    where: { shop: session.shop },
    select: { plan: true }
  });

  const plan = shop?.plan || "FREE";

  // Si le plan n'est pas autorisé → redirection vers la page des abonnements
  if (!allowedPlans.includes(plan)) {
    return redirect("/app/settings/subscription");
  }

  // Sinon → accès autorisé
  return null;
}
