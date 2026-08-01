export default function HotProducts() {
  const { hotProducts } = useLoaderData();

  return (
    <VeltoLayout>
      <main
        style={{
          padding: "32px",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            marginBottom: "24px",
            fontSize: "28px",
            fontWeight: "700",
            color: "#3a2f28",
          }}
        >
          Produits chauds 🔥
        </h1>

        {/* Cards Cozy Warm Premium 3D */}
        {hotProducts.map((p) => (
          <div
            key={p.id}
            style={cozyCardContainer}
            onMouseEnter={(e) => Object.assign(e.target.style, cozyCardHover)}
            onMouseLeave={(e) => Object.assign(e.target.style, cozyCardContainer)}
          >
            <h2 style={cozyCardTitle}>{p.title}</h2>

            <p style={cozyCardText}>
              <strong>Tendance :</strong> {p.trend}
            </p>

            <p style={cozyCardText}>
              <strong>Vues :</strong> {p.views}
            </p>

            <p style={cozyCardText}>
              <strong>Ventes :</strong> {p.sales}
            </p>

            <p
              style={{
                ...cozyCardText,
                color: p.inventory < 10 ? "#b83232" : "#3a2f28",
                fontWeight: "600",
              }}
            >
              <strong>Stock :</strong> {p.inventory}
            </p>
          </div>
        ))}

        {/* Bouton Cozy Warm Premium 3D */}
        <Link
          to="/app_index"
          style={{
            ...cozyWarmPremiumButton,
            marginTop: "24px",
            display: "inline-block",
          }}
          onMouseEnter={(e) =>
            Object.assign(e.target.style, cozyWarmPremiumButtonHover)
          }
          onMouseLeave={(e) =>
            Object.assign(e.target.style, cozyWarmPremiumButton)
          }
        >
          Retour au tableau de bord
        </Link>
      </main>
    </VeltoLayout>
  );
}
