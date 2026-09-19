// app/routes/webhooks.app.scopes_update.jsx

import { authenticate } from "../shopify.server";
import { prisma } from "../db.server";   // ← FIX : import correct

export const action = async ({ request }) => {
  const { session } = await authenticate.webhook(request);

  if (!session) {
    return new Response("No session found", { status: 200 });
  }

  // Exemple : mettre à jour les scopes dans ta DB si tu enregistres ça
  await prisma.session.updateMany({
    where: {
      shop: session.shop,
    },
    data: {
      scopes: session.scope,
    },
  });

  return new Response("OK");
};
