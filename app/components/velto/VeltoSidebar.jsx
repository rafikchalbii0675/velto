import { Link } from "@remix-run/react";

export default function VeltoSidebar() {
  return (
    <div
      style={{
        width: "260px",
        background: "#f7f3ef",
        height: "100vh",
        padding: "20px",
        borderRight: "1px solid #e0d8d1",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <h2 style={{ marginBottom: "30px" }}>Velto</h2>

      {/* Dashboard */}
      <Link to="/dashboard" style={linkStyle}>
        Dashboard
      </Link>

      {/* Produits */}
      <Link to="/products" style={linkStyle}>
        Produits
      </Link>

      {/* Promotions */}
      <Link to="/promotions" style={linkStyle}>
        Promotions
      </Link>

      {/* Notifications intelligentes */}
      <Link to="/notifications" style={linkStyle}>
        Notifications intelligentes
      </Link>

      {/* Hot Products */}
      <Link to="/hot-products" style={linkStyle}>
        Hot Products
      </Link>

      {/* Crypto */}
      <Link to="/crypto" style={linkStyle}>
        Crypto
      </Link>

      {/* Wallet / Rewards */}
      <Link to="/rewards" style={linkStyle}>
        Points de récompenses
      </Link>

      {/* Historique */}
      <Link to="/history" style={linkStyle}>
        Historique
      </Link>

      {/* Ligne séparatrice */}
      <div
        style={{
          margin: "30px 0",
          height: "1px",
          background: "#d6ccc4"
        }}
      />

      {/* Bouton Premium */}
      <Link
        to="/premium"
        style={{
          padding: "12px 16px",
          background: "#ff9900",
          color: "#fff",
          borderRadius: "8px",
          textDecoration: "none",
          textAlign: "center",
          fontWeight: "bold"
        }}
      >
        Passer à Velto Premium
      </Link>
    </div>
  );
}

const linkStyle = {
  marginBottom: "16px",
  textDecoration: "none",
  color: "#4a3f35",
  fontSize: "16px",
  padding: "8px 0",
  display: "block"
};
