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

  // Récupération des notifications
  const notifications = await prisma.notification.findMany({
    where: { shop: session.shop },
    orderBy: { createdAt: "desc" },
    take: 20,
  });

  return json({ notifications });
};

export default function VeltoNotifications() {
  const data = useLoaderData();

  return (
    <VeltoLayout title="Notifications">
      <div className="space-y-4">
        {data.notifications.length === 0 && (
          <p>Aucune notification pour le moment.</p>
        )}

        {data.notifications.map((n) => (
          <div
            key={n.id}
            className="p-4 bg-yellow-50 rounded-lg border border-yellow-200"
          >
            <h3 className="font-bold">{n.title}</h3>
            <p>{n.message}</p>
            <p className="text-sm text-gray-500">
              {new Date(n.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </VeltoLayout>
  );
}
