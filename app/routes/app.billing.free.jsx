import { redirect } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import { prisma } from "../db.server";
import { isBetaFree } from "../utils/beta.server";

export async function loader({ request }) {
  const { session } = await authenticate.admin(request);
  
  const shopDomain = session.shop;
  const shopEmail = session.email || "";

  // CHECK BETA FREE FOR LIFE - martz869
  const isBeta = isBetaFree(shopDomain) || isBetaFree(shopEmail);

  const shopDomain = session.shop;
  // On récupère l'email si dispo dans la session
  const shopEmail = session.email || "";

  // CHECK BETA FREE FOR LIFE - martz869
  const isBeta = isBetaFree(shopDomain) || isBetaFree(shopEmail);

  await prisma.shop.update({
    where: { shop: session.shop },
    data: {
      plan: isBeta ? "BETA_FREE" : "FREE",
      subscriptionId: null,
      status: "ACTIVE",
      // On ajoute un flag BETA si tu as la colonne, sinon le plan suffit
    }
  });

  console.log(`✅ ${shopDomain} activé en ${isBeta ? "BETA_FREE FOR LIFE $0" : "FREE"} - email: ${shopEmail}`);

  return redirect("/app/settings/subscription");
}

export default function FreePage() {
  return null;
}