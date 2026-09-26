import { useLoaderData } from "@remix-run/react";
import { authenticate } from "~/shopify.server";
import VeltoLayout from "~/components/velto/VeltoLayout";

export const loader = async ({ request }) => {
  // Connexion officielle Shopify Admin API
  const { admin } = await authenticate.admin(request);

  // Récupération des produits via l’API REST
  const products = await admin.rest.resources.Product.all();

  return { products };
};

export default function ProductsPage() {
  const { products } = useLoaderData();

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
          🛒 Produits Shopify
        </h1>

        <p
          style={{
            color: "var(--velto-text-secondary)",
            marginBottom: "var(--velto-space-lg)",
          }}
        >
          Produits réels récupérés depuis votre boutique Shopify.
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--velto-space-lg)",
          }}
        >
          {products.map((p) => (
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
                    background: "var(--velto-bg)",
                    border: "1px solid var(--velto-border)",
                    padding: "6px 10px",
                    borderRadius: "var(--velto-radius-sm)",
                    fontSize: "var(--velto-title-sm)",
                    fontWeight: 600,
                  }}
                >
                  ID : {p.id}
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
                    background: "var(--velto-bg)",
                    border: "1px solid var(--velto-border)",
                    padding: "6px 10px",
                    borderRadius: "var(--velto-radius-sm)",
                    fontSize: "var(--velto-title-sm)",
                    fontWeight: 600,
                  }}
                >
                  Statut : {p.status}
                </span>
              </div>

              {p.images?.length > 0 && (
                <img
                  src={p.images[0].src}
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
