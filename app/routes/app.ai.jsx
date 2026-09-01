// app/routes/app.ai.jsx

import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { requireUserId } from "~/session.server";

// IMPORT SERVEUR → autorisé uniquement dans le loader
import { getAIInsights } from "../models/insights.server";

export async function loader({ request }) {
  const userId = await requireUserId(request);

  const result = await getAIInsights(userId);

  return json(result);
}

export default function AIInsightsRoute() {
  const data = useLoaderData();

  if (!data.shopFound) {
    return <p>Aucun shop trouvé pour cet utilisateur.</p>;
  }

  const ai = data.ai;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Insights IA</h1>

      <p><strong>Score IA :</strong> {ai.score}</p>
      <p><strong>Points :</strong> {ai.points}</p>
      <p><strong>Produits :</strong> {ai.products}</p>
      <p><strong>Promotions :</strong> {ai.promotions}</p>
      <p><strong>Logs :</strong> {ai.logs}</p>

      <h2>Recommandation IA</h2>
      <p>{ai.recommendation}</p>
    </div>
  );
}
