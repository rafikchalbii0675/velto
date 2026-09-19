// app/routes/app.ai.autopilot.settings.jsx

// IMPORTANT : alias "~" casse dans Railway → chemin relatif obligatoire
import { prisma } from "../db.server";   // ← FIX : import correct
import { authenticate } from "../shopify.server";

// ◆ Loader : récupère les paramètres Autopilot IA du marchand
export const loader = async ({ request }) => {
  const { session } = await authenticate.admin(request);

  if (!session) {
    return new Response("No session found", { status: 200 });
  }

  const settings = await prisma.autopilotSettings.findUnique({
    where: {
      shop: session.shop,
    },
  });

  return Response.json(settings || {});
};

// ◆ Action : met à jour les paramètres Autopilot IA
export const action = async ({ request }) => {
  const { session } = await authenticate.admin(request);

  if (!session) {
    return new Response("No session found", { status: 200 });
  }

  const formData = await request.formData();

  await prisma.autopilotSettings.upsert({
    where: {
      shop: session.shop,
    },
    update: {
      enabled: formData.get("enabled") === "on",
      mode: formData.get("mode"),
      frequency: formData.get("frequency"),
    },
    create: {
      shop: session.shop,
      enabled: formData.get("enabled") === "on",
      mode: formData.get("mode"),
      frequency: formData.get("frequency"),
    },
  });

  return new Response("OK");
};
