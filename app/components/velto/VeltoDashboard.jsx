export default function VeltoDashboard() {
  const cardStyle = {
    padding: "24px",
    backgroundColor: "#fff",
    borderRadius: "16px",
    boxShadow: "0px 4px 12px rgba(0,0,0,0.06)",
    marginBottom: "24px",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div style={cardStyle}>
        <h2 style={{ marginBottom: "12px" }}>Produits</h2>
        <p style={{ color: "#4a4a4a" }}>128 produits actifs</p>
      </div>

      <div style={cardStyle}>
        <h2 style={{ marginBottom: "12px" }}>Promotions</h2>
        <p style={{ color: "#4a4a4a" }}>12 promotions en cours</p>
      </div>

      <div style={cardStyle}>
        <h2 style={{ marginBottom: "12px" }}>Alertes</h2>
        <p style={{ color: "#4a4a4a" }}>3 alertes actives</p>
      </div>

      <div style={cardStyle}>
        <h2 style={{ marginBottom: "12px" }}>Crypto</h2>
        <p style={{ color: "#4a4a4a" }}>54 transactions IA</p>
      </div>
    </div>
  );
}
