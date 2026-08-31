import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getDashboardData } from "~/models/dashboard.server";

export async function loader({ request }) {
  const url = new URL(request.url);
  const shopId = url.searchParams.get("shop");

  const data = await getDashboardData(shopId);

  return json(data);
}

export default function DashboardIA() {
  const { points, logs, crypto } = useLoaderData();

  return (
    <div className="dashboard-ia">
      <h1>Velto Intelligence</h1>

      <section>
        <h2>Points IA</h2>
        <p>Total : {points?.total}</p>
        <p>Mois : {points?.month}</p>
        <p>Niveau : {points?.level}</p>
      </section>

      <section>
        <h2>Historique Crypto</h2>
        {crypto.map((c) => (
          <div key={c.id}>
            {c.amount} {c.currency} — {c.txId}
          </div>
        ))}
      </section>

      <section>
        <h2>Logs IA</h2>
        {logs.map((l) => (
          <div key={l.id}>
            {l.type} — {l.message}
          </div>
        ))}
      </section>
    </div>
  );
}
