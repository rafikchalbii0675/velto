import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { authenticate } from "../shopify.server";
import { prisma } from "../db.server";
import VeltoLayout from "../components/velto/VeltoLayout";

export const loader = async ({ request }) => {
  const { session } = await authenticate.admin(request);

  if (!session) {
    return json({ error: "No session found" });
  }

  // --- 1. Statistiques de base ---
  const salesLast7Days = await prisma.order.aggregate({
    where: {
      shop: session.shop,
      createdAt: {
        gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      },
    },
    _sum: { totalPrice: true },
  });

  const topProducts = await prisma.product.findMany({
    where: { shop: session.shop },
    orderBy: { sales: "desc" },
    take: 5,
  });

  // --- 2. Notifications ---
  const notifications = await prisma.notification.findMany({
    where: { shop: session.shop, read: false },
    orderBy: { createdAt: "desc" },
    take: 10,
  });

  // --- 3. Résumé AI ---
  const aiSummary = `Cette semaine, votre boutique a généré ${
    salesLast7Days._sum.totalPrice || 0
  }$. Les produits les plus performants montrent une tendance positive.`;

  return json({
    salesLast7Days: salesLast7Days._sum.totalPrice || 0,
    topProducts,
    notifications,
    aiSummary,
  });
};

export default function Dashboard() {
  const data = useLoaderData();

  return (
    <VeltoLayout title="Dashboard Velto">
      <div className="space-y-6">

        {/* Résumé AI */}
        <section className="p-4 bg-blue-50 rounded-lg">
          <h2 className="text-xl font-bold">Résumé AI</h2>
          <p>{data.aiSummary}</p>
        </section>

        {/* Statistiques */}
        <section className="p-4 bg-white rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Statistiques</h2>
          <p>Ventes des 7 derniers jours : {data.salesLast7Days}$</p>

          <h3 className="font-semibold mt-4">Top produits</h3>
          <ul>
            {data.topProducts.map((p) => (
              <li key={p.id}>{p.title} — {p.sales} ventes</li>
            ))}
          </ul>
        </section>

        {/* Notifications */}
        <section className="p-4 bg-yellow-50 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Notifications</h2>
          {data.notifications.length === 0 && <p>Aucune notification.</p>}
          <ul>
            {data.notifications.map((n) => (
              <li key={n.id}>{n.title} — {n.message}</li>
            ))}
          </ul>
        </section>

      </div>
    </VeltoLayout>
  );
}
