import "../styles/dashboard.css";

import { json } from "@remix-run/node";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import { getNotifications } from "~/models/notifications.server";

export async function loader({ request }) {
  const url = new URL(request.url);
  const shopId = url.searchParams.get("shop");
  const filter = url.searchParams.get("filter") || "all";

  const notifications = await getNotifications(shopId);

  return json({ notifications, filter });
}
export default function DashboardNotifications() {
  const { notifications, filter } = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();

  const filtered = notifications.filter((n) =>
    filter === "all" ? true : n.type === filter
  );

  function setFilter(type) {
    searchParams.set("filter", type);
    setSearchParams(searchParams);
  }

  return (
    <div className="dashboard-ia">
      <h1>Notifications IA</h1>

      {/* FILTRES */}
      <div className="filters">
        <button onClick={() => setFilter("all")}>Tout</button>
        <button onClick={() => setFilter("crypto")}>Crypto</button>
        <button onClick={() => setFilter("sale")}>Ventes</button>
        <button onClick={() => setFilter("product")}>Produits</button>
        <button onClick={() => setFilter("customer")}>Clients</button>
      </div>

      {/* LISTE DES NOTIFICATIONS */}
      <section>
        {filtered.length === 0 && <p>Aucune notification.</p>}

        {filtered.map((n) => (
          <div key={n.id} className="notification-item">
            <strong>{n.type.toUpperCase()}</strong> — {n.message}
            <div className="date">{new Date(n.createdAt).toLocaleString()}</div>
          </div>
        ))}
      </section>
    </div>
  );
}
