// app/routes/app.ai.jsx

import { authenticate } from "../shopify.server";   // ← FIX alias "~"
import { redirect } from "@remix-run/node";
import { prisma } from "../db.server";              // ← FIX alias "~"

// ---------------------------------------------------------------
// Page principale de l’IA Velto
// ---------------------------------------------------------------

export const loader = async ({ request }) => {
  const { session } = await authenticate.admin(request);

  if (!session) {
    return redirect("/auth/login");
  }

  const aiSettings = await prisma.aiSettings.findUnique({
    where: { shop: session.shop },
  });

  return aiSettings || {};
};

export default function VeltoAIPage() {
  return (
    <div>
      <h1>Velto AI</h1>
      {/* Ton UI ici */}
    </div>
  );
}
