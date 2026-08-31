import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { requireUserId } from "~/session.server";
import { getAdvancedAI } from "~/models/aiAdvanced.server";

export async function loader({ request }) {
  await requireUserId(request);

  const url = new URL(request.url);
  const shopId = url.searchParams.get("shop");

  const data = await getAdvancedAI(shopId);

  return json(data);
}

export default function AIAdvanced() {
  const { recommendations, actions, optimizations } = useLoaderData();

  return (
    <div className="dashboard-ia">
      <h1>IA Avancée — Optimisations & Actions</h1>

      {/* Recommandations IA */}
      <section className="ai-section">
        <h2>Recommandations IA</h2>
        {recommendations.length === 0 && <p>Aucune recommandation IA pour le moment.</p>}
        {recommendations.map((r, i) => (
          <div key={i} className="ai-item">{r}</div>
        ))}
      </section>

      {/* Actions IA */}
      <section className="ai-section">
        <h2>Actions IA</h2>
        {actions.length === 0 && <p>Aucune action IA nécessaire.</p>}
        {actions.map((a, i) => (
          <div key={i} className="ai-item action">{a}</div>
        ))}
      </section>

      {/* Optimisations IA */}
      <section className="ai-section">
        <h2>Optimisations IA</h2>
        {optimizations.length === 0 && <p>Aucune optimisation IA détectée.</p>}
        {optimizations.map((o, i) => (
          <div key={i} className="ai-item optimization">{o}</div>
        ))}
      </section>
    </div>
  );
}
