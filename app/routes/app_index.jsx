export default function AppAlerts() {
  const { alerts } = useLoaderData();

  return (
    <VeltoLayout>
      <main style={{ padding: "24px" }}>
        <h1 style={{ marginBottom: "16px" }}>Alertes de la boutique</h1>

        {alerts.map((a) => (
          <div
            key={a.id}
            style={{
              padding: "12px",
              marginBottom: "12px",
              backgroundColor: "#fff",
              borderRadius: "8px",
              border: "1px solid #ddd",
            }}
          >
            <strong>{a.type}</strong>
            <p>{a.message}</p>
          </div>
        ))}

        <Link
          to="/app/alerts"
          style={cozyWarmPremiumButton}
          onMouseEnter={(e) => Object.assign(e.target.style, cozyWarmPremiumButtonHover)}
          onMouseLeave={(e) => Object.assign(e.target.style, cozyWarmPremiumButton)}
        >
          Accéder au tableau de bord
        </Link>
      </main>
    </VeltoLayout>
  );
}
