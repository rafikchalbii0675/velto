import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { authenticate } from "../shopify.server";
import { prisma } from "../db.server";
import VeltoLayout from "../components/velto/VeltoLayout";
import IAChart from "../components/IAChart";
import TopProductsChart from "../components/TopProductsChart";

export const loader = async ({ request }) => {
  const { session } = await authenticate.admin(request);

  if (!session) {
    return json({ error: "No session found" });
  }

  const subscription = await prisma.subscription.findUnique({
    where: { shop: session.shop },
  });

  if (!subscription || !subscription.active) {
    return redirect("/app.billing.page");
  }

  // --- 1. Ventes des 7 derniers jours ---
  const salesLast7Days = await prisma.order.aggregate({
    where: {
      shop: session.shop,
      createdAt: {
        gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      },
    },
    _sum: { totalPrice: true },
  });

  // --- 2. Ventes par jour ---
  const salesByDay = await prisma.order.groupBy({
    by: ["createdAt"],
    where: {
      shop: session.shop,
      createdAt: {
        gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      },
    },
    _sum: { totalPrice: true },
  });

  // --- 3. Top 5 produits ---
  const topProducts = await prisma.orderItem.groupBy({
    by: ["productName"],
    where: { shop: session.shop },
    _sum: { quantity: true, totalPrice: true },
    orderBy: { _sum: { totalPrice: "desc" } },
    take: 5,
  });

  // --- 4. Résumé AI ---
  const aiSummary = `Votre boutique montre une activité stable. Le produit le plus performant est : ${
    topProducts[0]?.productName || "aucun produit détecté"
  }.`;

  return json({
    salesLast7Days: salesLast7Days._sum.totalPrice || 0,
    salesByDay,
    topProducts,
    aiSummary,
  });
};

export default function Dashboard() {
  const data = useLoaderData();

  return (
    <VeltoLayout title="Dashboard Velto">
      <div className="velto-page-bg" style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "24px" }}>

        {/* Bloc 1 : Ventes des 7 derniers jours */}
        <section className="velto-card" style={{ padding: "24px" }}>
          <h2 style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.14em", color: "var(--velto-text-secondary)", marginBottom: "8px", fontWeight: 600 }}>
            Ventes des 7 derniers jours
          </h2>
          <p style={{ fontSize: "34px", fontWeight: 700, color: "var(--velto-yellow)" }}>
            {data.salesLast7Days}$
          </p>
        </section>

        {/* Bloc 2 : Graphique des ventes */}
        <section className="velto-card" style={{ padding: "24px" }}>
          <h2 style={{ fontSize: "15px", fontWeight: 700, color: "var(--velto-yellow)", marginBottom: "16px" }}>
            Graphique des ventes
          </h2>
          <IAChart salesByDay={data.salesByDay} />
        </section>

        {/* Bloc 3 : Graphique Top produits */}
        <section className="velto-card" style={{ padding: "24px" }}>
          <h2 style={{ fontSize: "15px", fontWeight: 700, color: "var(--velto-yellow)", marginBottom: "16px" }}>
            Top produits (Graphique)
          </h2>
          <TopProductsChart topProducts={data.topProducts} />
        </section>

        {/* Bloc 4 : Résumé AI */}
        <section className="velto-card" style={{ padding: "24px" }}>
          <h2 style={{ fontSize: "15px", fontWeight: 700, color: "var(--velto-yellow)", marginBottom: "8px" }}>
            Résumé AI
          </h2>
          <p style={{ fontSize: "13px", lineHeight: 1.5 }}>{data.aiSummary}</p>
        </section>

      </div>
    </VeltoLayout>
  );
}