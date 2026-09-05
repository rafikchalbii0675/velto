export default function VeltoSidebar() {
  return (
    <div
      style={{
        width: "260px",
        backgroundColor: "#f7f0e8",
        borderRadius: "16px",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <h3 style={{ margin: 0 }}>Velto Sidebar</h3>
      <p style={{ margin: 0, fontSize: "14px", color: "#6b5f54" }}>
        Espace latéral pour modules IA, crypto, historique, etc.
      </p>

      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "12px",
          padding: "16px",
        }}
      >
        <strong>Module IA</strong>
        <p style={{ margin: "4px 0 0", fontSize: "14px" }}>
          Suggestions, analyses, prédictions.
        </p>
      </div>

      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "12px",
          padding: "16px",
        }}
      >
        <strong>Crypto</strong>
        <p style={{ margin: "4px 0 0", fontSize: "14px" }}>
          Marché, tendances, paiements.
        </p>
      </div>

      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "12px",
          padding: "16px",
        }}
      >
        <strong>Historique</strong>
        <p style={{ margin: "4px 0 0", fontSize: "14px" }}>
          Actions, promotions, transactions.
        </p>
      </div>
    </div>
  );
}