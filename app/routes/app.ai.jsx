import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { requireUserId } from "~/session.server";
import { getAIInsights } from "~/models/insights.server";

export async function loader({ request }) {
  await requireUserId(request);

  const url = new URL(request.url);
  const shopId = url.searchParams.get("shop");

  const data = await getAIInsights(shopId);

  return json(data);
}

export default function AIGlobal() {
  const { insights, stats } = useLoaderData();

  return (
    <div className="dashboard-ia">
      <h1>Vue d’ensemble IA</h1>

      {/* Résumé IA */}
      <section className="ai-summary">
        <h2>Résumé IA</h2>
        <p>
          L’IA a analysé votre boutique et détecté :
          <br />
          <strong>{stats.totalSales}</strong> transactions crypto,
          <br />
          <strong>{stats.totalProducts}</strong> produits,
          <br />
          <strong>{stats.highAlerts}</strong> alertes critiques,
          <br />
          <strong>{stats.mediumAlerts}</strong> alertes moyennes,
          <br />
          <strong>{stats.logs}</strong> logs sécurité.
        </p>
      </section>

      {/* Insights IA */}
      <section className="ai-insights">
        <h2>Insights IA</h2>

        {insights.length === 0 && <p>Aucun insight IA pour le moment.</p>}

        {insights.map((i, index) => (
          <div key={index} className="insight-item">
            {i}
          </div>
        ))}
      </section>
    </div>
  );
}
