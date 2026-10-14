import { useLoaderData } from "@remix-run/react";
import { authenticate } from "~/shopify.server";
import VeltoLayout from "~/components/velto/VeltoLayout";

export const loader = async ({ request }) => {
  // Connexion officielle Shopify Admin API
  const { admin } = await authenticate.admin(request);

  // Exemple : récupérer les produits pour détecter les tendances
  const products = await admin.rest.resources.Product.all();

  // Simulation d’analyse (tu remplaceras plus tard par IA Premium)
  const hotProducts = products.slice(0, 5).map((p) => ({
    id: p.id,
    title: p.title,
    trend: "+42%",
    views: Math.floor(Math.random() * 1500),
    sales: Math.floor(Math.random() * 80),
    inventory: p.variants?.[0]?.inventory_quantity ?? 0,
    image: p.images?.[0]?.src ?? null,
  }));

  return { hotProducts };
};

export default function HotProductsPage() {
  const { hotProducts } = useLoaderData();

  return (
    <VeltoLayout>
      <div
        className="velto-page-bg"
        style={{
          padding: "var(--velto-space-xl)",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <h1
          className="velto-title-lg"
          style={{ marginBottom: "var(--velto-space-lg)" }}
        >
          🔥 Hot Products
        </h1>

        <p
          style={{
            color: "var(--velto-text-secondary)",
            marginBottom: "var(--velto-space-lg)",
          }}
        >
          Produits en forte croissance selon les données internes de votre
          boutique.
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--velto-space-lg)",
          }}
        >
          {hotProducts.map((p) => (
            <div key={p.id} className="velto-card">
              <h3 className="velto-title-md">{p.title}</h3>

              <div
                style={{
                  marginTop: "var(--velto-space-md)",
                  display: "flex",
                  gap: "var(--velto-space-md)",
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{
                    background: "var(--velto-forest-tint)",
                    color: "var(--velto-forest-dark)",
                    padding: "6px 10px",
                    borderRadius: "var(--velto-radius-sm)",
                    fontSize: "var(--velto-title-sm)",
                    fontWeight: 600,
                  }}
                >
                  Tendance : {p.trend}
                </span>

                <span
                  style={{
                    background: "var(--velto-bg)",
                    border: "1px solid var(--velto-border)",
                    padding: "6px 10px",
                    borderRadius: "var(--velto-radius-sm)",
                    fontSize: "var(--velto-title-sm)",
                    fontWeight: 600,
                  }}
                >
                  Vues : {p.views}
                </span>

                <span
                  style={{
                    background: "var(--velto-bg)",
                    border: "1px solid var(--velto-border)",
                    padding: "6px 10px",
                    borderRadius: "var(--velto-radius-sm)",
                    fontSize: "var(--velto-title-sm)",
                    fontWeight: 600,
                  }}
                >
                  Ventes : {p.sales}
                </span>

                <span
                  style={{
                    background:
                      p.inventory < 10
                        ? "var(--velto-yellow)"
                        : "var(--velto-forest-tint)",
                    color:
                      p.inventory < 10
                        ? "var(--velto-yellow-text)"
                        : "var(--velto-forest-dark)",
                    padding: "6px 10px",
                    borderRadius: "var(--velto-radius-sm)",
                    fontSize: "var(--velto-title-sm)",
                    fontWeight: 600,
                  }}
                >
                  Stock : {p.inventory}
                </span>
              </div>

              {p.image && (
                <img
                  src={p.image}
                  alt={p.title}
                  style={{
                    width: "120px",
                    borderRadius: "var(--velto-radius-md)",
                    marginTop: "var(--velto-space-md)",
                  }}
                />
              )}

              <div style={{ marginTop: "var(--velto-space-lg)" }}>
                <button className="velto-btn-primary">Voir le produit →</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </VeltoLayout>
  );
}
