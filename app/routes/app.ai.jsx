import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { authenticate } from "../shopify.server";
import { prisma } from "../db.server";
import VeltoLayout from "../components/velto/VeltoLayout";

export const loader = async ({ request }) => {
  const { session } = await authenticate.admin(request);

  if (!session) {
    return json({ error: "No session found" });
  }

  // Vérification abonnement
  const subscription = await prisma.subscription.findUnique({
    where: { shop: session.shop },
  });

  if (!subscription || !subscription.active) {
    return redirect("/app.billing.page");
  }

  // Exemple : résumé AI simple
  const aiSummary = `Analyse AI : votre boutique montre une activité stable cette semaine.`;

  return json({ aiSummary });
};

export default function VeltoAI() {
  const data = useLoaderData();

  return (
    <VeltoLayout title="Analyse AI">
      <div className="space-y-4">
        <section className="p-4 bg-blue-50 rounded-lg">
          <h2 className="text-xl font-bold">Résumé AI</h2>
          <p>{data.aiSummary}</p>
        </section>
      </div>
    </VeltoLayout>
  );
}
