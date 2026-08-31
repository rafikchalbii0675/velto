import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { requireUserId } from "~/session.server";
import { getSystemStats } from "~/models/system.server";

export async function loader({ request }) {
  await requireUserId(request);

  const url = new URL(request.url);
  const shopId = url.searchParams.get("shop");

  const stats = await getSystemStats(shopId);

  return json({ stats });
}

export default function SystemIA() {
  const { stats } = useLoaderData();

  return (
    <div className="dashboard-ia">
      <h1>Système IA — Monitoring interne</h1>

      <section className="system-grid">
        <div className="system-card">
          <h3>Points IA</h3>
          <p>{stats.totalPoints}</p>
        </div>

        <div className="system-card">
          <h3>Transactions Crypto</h3>
          <p>{stats.totalCrypto}</p>
        </div>

        <div className="system-card">
          <h3>Alertes IA</h3>
          <p>{stats.totalAlerts}</p>
        </div>

        <div className="system-card">
          <h3>Logs Sécurité</h3>
          <p>{stats.totalSecurityLogs}</p>
        </div>

        <div className="system-card">
          <h3>Produits</h3>
          <p>{stats.totalProducts}</p>
        </div>

        <div className="system-card health">
          <h3>Santé IA</h3>
          <p>{stats.healthScore} / 100</p>
        </div>
      </section>
    </div>
  );
}
