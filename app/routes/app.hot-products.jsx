import { useLoaderData } from "@remix-run/react";
import VeltoLayout from "~/components/velto/VeltoLayout";

// Loader connecté à Shopify Admin API
export const loader = async ({ context }) => {
  // Récupération des produits Shopify
  const response = await context.admin.rest.resources.Product.all({
    limit: 50,
  });

  const shopifyProducts = response.data;

  // Analyse simple pour détecter les "Hot Products"
  const hotProducts = shopifyProducts
    .map((p) => ({
      id: p.id,
      title: p.title,
      image: p.images?.[0]?.src || null,
      variants: p.variants,
      inventory: p.variants?.[0]?.inventory_quantity ?? 0,
      score: Math.random() * 100, // IA interne (placeholder)
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5); // Top 5

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
        <h1 className="velto-title-lg" style={{ marginBottom: "var(--velto-space-lg)" }}>
          🔥 Hot Products — Shopify
        </h1>

        <p style={{ color: "var(--velto-text-secondary)", marginBottom: "var(--velto-space-lg)" }}>
          Produits en forte croissance détectés par Velto IA.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "var(--velto-space-lg)" }}>
          {hotProducts.map((p) => (
            <div key={p.id} className="velto-card">
              <h3 className="velto-title-md">{p.title}</h3>

              {/* Image */}
              {p.image && (
                <img
                  src={p.image}
                  alt={p.title}
                  style={{
                    width: "140px",
                    borderRadius: "var(--velto-radius-md)",
                    marginTop: "var(--velto-space-md)",
                  }}
                />
              )}

              {/* Infos */}
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
                  Score IA : {p.score.toFixed(1)}
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
                  Variantes : {p.variants.length}
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
