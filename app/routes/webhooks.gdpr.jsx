// app/routes/webhooks.gdpr.jsx

import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server";   // ← FIX alias "~"
import { prisma } from "../db.server";              // ← FIX alias "~" + default

export async function action({ request }) {
  const { session } = await authenticate.webhook(request);

  if (!session) {
    return json({ ok: true });
  }

  // Exemple : suppression des données client (GDPR)
  const payload = await request.json();

  await prisma.customer.deleteMany({
    where: {
      shop: session.shop,
      email: payload.email,
    },
  });

  return json({ ok: true });
}
