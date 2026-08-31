import { Link } from "@remix-run/react";

export default function VeltoNav() {
  const linkStyle = {
    display: "block",
    padding: "12px 16px",
    marginBottom: "8px",
    borderRadius: "10px",
    backgroundColor: "#f3e8dc",
    color: "#3a2f28",
    fontWeight: "600",
    textDecoration: "none",
    boxShadow: "0px 2px 6px rgba(0,0,0,0.05)",
  };

  return (
    <nav
      style={{
        width: "220px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Link to="/app/dashboard" style={linkStyle}>
        Dashboard
      </Link>

      <Link to="/app/products" style={linkStyle}>
        Produits
      </Link>

      <Link to="/app/promotions" style={linkStyle}>
        Promotions
      </Link>

      <Link to="/app/alerts" style={linkStyle}>
        Alertes
      </Link>

      <Link to="/app/hot-products" style={linkStyle}>
        Hot Products 🔥
      </Link>

      <Link to="/app/crypto" style={linkStyle}>
        Crypto 🪙
      </Link>

      <Link to="/app/wallet" style={linkStyle}>
        Wallet 💳
      </Link>
    </nav>
  );
}
