import { Link } from "@remix-run/react";
import Checkmark from "./Checkmark";

const summaryMap = {
  products:
    "Vous avez choisi de commencer par vos produits. Velto va vous aider à les mettre en valeur.",
  promotions:
    "Vous avez choisi de vous concentrer sur les promotions. Velto va optimiser vos campagnes.",
  crypto:
    "Vous avez choisi le crypto‑commerce. Velto va moderniser votre boutique avec des options avancées.",
};

export default function Step3Finish({ priority }) {
  return (
    <div style={{ textAlign: "center" }}>
      <Checkmark />

      <h2 style={{ color: "#3a2f28", marginBottom: "16px" }}>
        Onboarding terminé 
      </h2>

      <p style={{ color: "#6b5a4a", marginBottom: "16px" }}>
        Vous êtes prêt à utiliser Velto Cozy Warm Edition.
      </p>

      {priority && (
        <p
          style={{
            color: "#3a2f28",
            marginBottom: "24px",
            fontWeight: "500",
          }}
        >
          {summaryMap[priority]}
        </p>
      )}

      <Link
        to="/app.dashboard"
        style={{
          padding: "14px 24px",
          backgroundColor: "#d4b89f",
          borderRadius: "10px",
          color: "#3a2f28",
          fontWeight: "700",
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
        Commencer
      </Link>
    </div>
  );
}
