import { authenticate } from "~/shopify.server";
import { redirect } from "@remix-run/node";
import { prisma } from "~/db.server";

// ---------------------------------------------------------
// AUTO-LOGIN SHOPIFY (obligatoire pour apps embarquées)
// ---------------------------------------------------------

export async function loader({ request }) {
  // Authentification automatique via OAuth Shopify
  const { session, shop, user } = await authenticate.admin(request);

  // ---------------------------------------------------------
  // AUTO-CRÉATION DU USER VELTO (si inexistant)
  // ---------------------------------------------------------
  await prisma.veltoUser.upsert({
    where: { shop },
    update: {},
    create: { shop },
  });

  // ---------------------------------------------------------
  // REDIRECTION AUTOMATIQUE VERS LE DASHBOARD VELTO PRO
  // ---------------------------------------------------------
  return redirect("/app.dashboard");
}

// ---------------------------------------------------------
// Pas d'interface, pas de formulaire, pas d'email.
// Shopify gère déjà l'identité du marchand.
// ---------------------------------------------------------

export default function AppEntry() {
  return null;
}
