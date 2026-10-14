import VeltoLayout from "../components/velto/VeltoLayout";

export default function AppAlerts() {
  const alerts = [
    { type: "Information", message: "Velto est connecté correctement à votre boutique." },
    { type: "Sécurité", message: "Aucune alerte critique détectée." },
  ];

  return (
    <VeltoLayout>
      <main style={{ padding: "24px" }}>
        <h1 style={{ marginBottom: "24px" }}>Alertes de la boutique</h1>

        {alerts.map((alert, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "#ffffff",
              padding: "20px",
              borderRadius: "14px",
              boxShadow: "0 3px 12px rgba(0,0,0,0.06)",
              marginBottom: "16px",
              transition: "transform 0.25s ease, box-shadow 0.25s ease",
            }}
          >
            <strong>{alert.type}</strong>
            <p>{alert.message}</p>
          </div>
        ))}
      </main>
    </VeltoLayout>
  );
}
