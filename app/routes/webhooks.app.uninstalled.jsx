import { authenticate } from "../shopify.server";
import { prisma } from "../db.server"; // ← FIX : import correct

export const action = async ({ request }) => {
  const { session } = await authenticate.webhook(request);

  // Nettoyer les données du marchand désinstallé
  await prisma.session.deleteMany({
    where: {
      shop: session.shop,
    },
  });

  return new Response("OK");
};