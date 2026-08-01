export default function AppAlerts() {
  const { alerts } = useLoaderData();

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
          Alertes de la boutique
        </h1>

        {/* Cards Cozy Warm Premium 3D */}
        {alerts.map((a) => (
          <div
            key={a.id}
            style={cozyCardContainer}
            onMouseEnter={(e) => Object.assign(e.target.style, cozyCardHover)}
            onMouseLeave={(e) => Object.assign(e.target.style, cozyCardContainer)}
          >
            <h2 style={cozyCardTitle}>{a.type}</h2>
            <p style={cozyCardText}>{a.message}</p>
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
