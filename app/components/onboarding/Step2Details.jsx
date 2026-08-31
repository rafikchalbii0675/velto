import { Link } from "@remix-run/react";

export default function Step2Details({ priority }) {
  const textMap = {
    products: "Configurez vos produits pour commencer à vendre.",
    promotions: "Créez vos premières promotions intelligentes.",
    crypto: "Activez les options crypto‑commerce.",
  };

  const routeMap = {
    products: "/app.products",
    promotions: "/app.promotions",
    crypto: "/app.crypto",
  };

  return (
    <div>
      <h2 style={{ marginBottom: "16px", color: "#3a2f28" }}>
        {textMap[priority]}
      </h2>

      <Link
        to={routeMap[priority]}
        style={{
          marginTop: "24px",
          padding: "12px 20px",
          borderRadius: "8px",
          background: "#d4b89f",
          border: "none",
          cursor: "pointer",
          fontWeight: "bold",
          color: "#3a2f28",
          textDecoration: "none",
          boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
          transition: "all 0.25s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-3px)";
          e.currentTarget.style.boxShadow =
            "0 6px 18px rgba(0,0,0,0.18)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0px)";
          e.currentTarget.style.boxShadow =
            "0 4px 12px rgba(0,0,0,0.12)";
        }}
      >
        Continuer
      </Link>
    </div>
  );
}
