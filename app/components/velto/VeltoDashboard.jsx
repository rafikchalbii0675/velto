export default function VeltoDashboard({ stats, shop }) {
  const cardStyle = {
    padding: "24px",
    backgroundColor: "#fff",
    borderRadius: "16px",
    boxShadow: "0px 4px 12px rgba(0,0,0,0.06)",
    marginBottom: "24px",
  };

  const {
    products = 0,
    promotions = 0,
    alerts = 0,
    hotProducts = 0,
    cryptoTransactions = 0,
  } = stats || {};

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {shop && (
        <p style={{ color: "#9a9a9a", fontSize: "12px" }}>
          Boutique connectée : {shop}
        </p>
      )}

      <div style={cardStyle}>
        <h2 style={{ marginBottom: "12px" }}>Produits</h2>
        <p style={{ color: "#4a4a4a" }}>{products} produits actifs</p>
      </div>

      <div style={cardStyle}>
        <h2 style={{ marginBottom: "12px" }}>Promotions</h2>
        <p style={{ color: "#4a4a4a" }}>{promotions} promotions en cours</p>
      </div>

      <div style={cardStyle}>
        <h2 style={{ marginBottom: "12px" }}>Alertes</h2>
        <p style={{ color: "#4a4a4a" }}>{alerts} alertes actives</p>
      </div>

      <div style={cardStyle}>
        <h2 style={{ marginBottom: "12px" }}>Crypto</h2>
        <p style={{ color: "#4a4a4a" }}>{cryptoTransactions} transactions IA</p>
      </div>
    </div>
  );
}