export default function VeltoHeader() {
  return (
    <header
      style={{
        padding: "16px",
        backgroundColor: "#3a2f28",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <h2 style={{ margin: 0 }}>Velto</h2>

      <nav style={{ display: "flex", gap: "16px" }}>
        <a href="/app/products" style={{ color: "#fff", textDecoration: "none" }}>
          Produits
        </a>
        <a href="/app/promotions" style={{ color: "#fff", textDecoration: "none" }}>
          Promotions
        </a>
        <a href="/app/alerts" style={{ color: "#fff", textDecoration: "none" }}>
          Alertes
        </a>
      </nav>
    </header>
  );
}
