export default function VeltoSidebar() {
  return (
    <aside
      style={{
        width: "260px",
        backgroundColor: "#f3e8dc",
        padding: "24px",
        borderRadius: "16px",
        boxShadow: "0px 4px 12px rgba(0,0,0,0.06)",
        height: "fit-content",
      }}
    >
      <h2
        style={{
          marginBottom: "16px",
          fontSize: "20px",
          fontWeight: "700",
          color: "#3a2f28",
        }}
      >
        Velto Sidebar
      </h2>

      <p style={{ color: "#4a4a4a", marginBottom: "16px" }}>
        Espace latéral pour modules IA, crypto, historique, etc.
      </p>

      <div
        style={{
          padding: "12px",
          backgroundColor: "#fff",
          borderRadius: "12px",
          border: "1px solid #e1e3e5",
          marginBottom: "12px",
        }}
      >
        <strong>Module IA</strong>
        <p style={{ fontSize: "14px", color: "#4a4a4a" }}>
          Suggestions, analyses, prédictions.
        </p>
      </div>

      <div
        style={{
          padding: "12px",
          backgroundColor: "#fff",
          borderRadius: "12px",
          border: "1px solid #e1e3e5",
          marginBottom: "12px",
        }}
      >
        <strong>Crypto</strong>
        <p style={{ fontSize: "14px", color: "#4a4a4a" }}>
          Marché, tendances, paiements.
        </p>
      </div>

      <div
        style={{
          padding: "12px",
          backgroundColor: "#fff",
          borderRadius: "12px",
          border: "1px solid #e1e3e5",
        }}
      >
        <strong>Historique</strong>
        <p style={{ fontSize: "14px", color: "#4a4a4a" }}>
          Actions, promotions, transactions.
        </p>
      </div>
    </aside>
  );
}
