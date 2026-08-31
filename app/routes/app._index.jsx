import { Link } from "@remix-run/react";
import {
  cozyWarmPremiumButton,
  cozyWarmPremiumButtonHover
} from "../components/styles/cozyButtons";

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
          Bienvenue dans Velto
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

        <Link
          to="/app/alerts"
          style={cozyWarmPremiumButton}
          onMouseEnter={(e) =>
            Object.assign(e.target.style, cozyWarmPremiumButtonHover)
          }
          onMouseLeave={(e) =>
            Object.assign(e.target.style, cozyWarmPremiumButton)
          }
        >
          Accéder au tableau de bord
        </Link>
      </section>
    </main>
  );
}
