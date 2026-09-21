// app/routes/app.billing.callback.jsx

import { json, redirect } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import { prisma } from "../db.server";

export const loader = async ({ request }) => {
  const { admin, session } = await authenticate.admin(request);

  const subscriptions = await admin.billing.check();

  const active = subscriptions.some((sub) => sub.status === "ACTIVE");

  if (!active) {
    return json({ error: "Subscription not active" });
  }

  // Enregistrer l'abonnement dans ta DB
  await prisma.subscription.upsert({
    where: { shop: session.shop },
    update: { active: true, plan: "Velto Basic" },
    create: { shop: session.shop, active: true, plan: "Velto Basic" },
  });

  return redirect("/app.dashboard");
};
