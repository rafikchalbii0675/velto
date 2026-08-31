import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { requireUserId } from "~/session.server";
import { getVisionInsights } from "~/models/aiVision.server";

export async function loader({ request }) {
  await requireUserId(request);

  const url = new URL(request.url);
  const shopId = url.searchParams.get("shop");

  const insights = await getVisionInsights(shopId);

  return json({ insights });
}

export default function AIVision() {
  const { insights } = useLoaderData();

  return (
    <div className="dashboard-ia">
      <h1>IA Vision — Analyse des images produits</h1>

      {insights.length === 0 && <p>Aucune anomalie visuelle détectée.</p>}

      {insights.map((item) => (
        <div key={item.productId} className="vision-item">
          <h3>{item.title}</h3>
          {item.insights.map((i, index) => (
            <p key={index}>{i}</p>
          ))}
        </div>
      ))}
    </div>
  );
}
