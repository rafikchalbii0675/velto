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

  // Exemple : paramètres simples
  const settings = await prisma.settings.findUnique({
    where: { shop: session.shop },
  });

  return json({ settings });
};

export default function VeltoSettings() {
  const data = useLoaderData();

  return (
    <VeltoLayout title="Paramètres Velto">
      <div className="space-y-4">
        <section className="p-4 bg-white rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Paramètres généraux</h2>

          <p>Thème : {data.settings?.theme || "clair"}</p>
          <p>Notifications : {data.settings?.notifications ? "activées" : "désactivées"}</p>
          <p>Mode AI : {data.settings?.aiMode || "standard"}</p>
        </section>
      </div>
    </VeltoLayout>
  );
}
