import { json } from "@remix-run/node";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import { requireUserId } from "~/session.server";
import { getLogs } from "~/models/logs.server";

export async function loader({ request }) {
  await requireUserId(request);

  const url = new URL(request.url);
  const shopId = url.searchParams.get("shop");
  const filter = url.searchParams.get("filter") || "all";
  const search = url.searchParams.get("search") || "";

  const logs = await getLogs(shopId);

  return json({ logs, filter, search });
}

export default function LogsIA() {
  const { logs, filter, search } = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();

  const filtered = logs.filter((l) => {
    const matchType = filter === "all" ? true : l.type === filter;
    const matchSearch = search === "" ? true : l.message.toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });

  function setFilter(type) {
    searchParams.set("filter", type);
    setSearchParams(searchParams);
  }

  function setSearch(e) {
    searchParams.set("search", e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <div className="dashboard-ia">
      <h1>Logs IA</h1>

      {/* FILTRES */}
      <div className="filters">
        <button onClick={() => setFilter("all")}>Tout</button>
        <button onClick={() => setFilter("crypto")}>Crypto</button>
        <button onClick={() => setFilter("product")}>Produits</button>
        <button onClick={() => setFilter("sale")}>Ventes</button>
        <button onClick={() => setFilter("system")}>Système</button>
      </div>

      {/* RECHERCHE */}
      <input
        type="text"
        placeholder="Rechercher dans les logs..."
        defaultValue={search}
        onChange={setSearch}
        className="search-input"
      />

      {/* LISTE DES LOGS */}
      <section>
        {filtered.length === 0 && <p>Aucun log IA trouvé.</p>}

        {filtered.map((l) => (
          <div key={l.id} className="log-item">
            <strong>{l.type.toUpperCase()}</strong> — {l.message}
            <div className="date">{new Date(l.createdAt).toLocaleString()}</div>
          </div>
        ))}
      </section>
    </div>
  );
}
