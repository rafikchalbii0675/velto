import { Link } from "@remix-run/react";

export default function AppIndex() {
  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "40px",
        backgroundColor: "#f7f5f2",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <section
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "32px",
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
        }}
      >
        <h1
          style={{
            fontSize: "28px",
            marginBottom: "16px",
            color: "#3a2f28",
          }}
        >
          Velto Cozy Warm Edition
        </h1>

        <p
          style={{
            fontSize: "16px",
            color: "#6b5b4d",
            marginBottom: "24px",
          }}
        >
          Votre assistant Cozy Warm pour gérer vos produits, vos promotions et votre commerce crypto.
        </p>

        <ul style={{ listStyle: "none", padding: 0 }}>
          <li style={{ marginBottom: "12px" }}>
             <Link to="/app/promotions" style={{ fontSize: "18px", color: "#8b5e3c" }}>
               Promotions intelligentes
            </Link>
          </li>

          <li style={{ marginBottom: "12px" }}>
            <Link to="/crypto" style={{ fontSize: "18px", color: "#8b5e3c" }}>
               Crypto-commerce
            </Link>
          </li>

          <li style={{ marginBottom: "12px" }}>
            <Link to="/dashboard" style={{ fontSize: "18px", color: "#8b5e3c" }}>
               Tableau de bord Cozy
            </Link>
          </li>
        </ul>
      </section>
    </main>
  );
}
