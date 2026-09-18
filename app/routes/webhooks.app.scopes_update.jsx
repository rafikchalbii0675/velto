// app/routes/webhooks.app.uninstalled.jsx

import { authenticate } from "../shopify.server";
import { prisma } from "../db.server";   // ← FIX : import correct

export const action = async ({ request }) => {
  const { session } = await authenticate.webhook(request);

  // Exemple : supprimer la session du marchand désinstallé
  await prisma.session.deleteMany({
    where: {
      shop: session.shop,
    },
  });

  return new Response("OK");
};
