// app/routes/Step1Priorities.jsx

import {
  cozyWarmPremiumButton,
  cozyWarmPremiumButtonHover,
} from "../components/styles/cozyButtons";

export default function Step1Priorities({ onSelect }) {
  return (
    <main style={{ padding: "32px" }}>
      <h1 style={{ marginBottom: "24px" }}>Choisis ta priorité</h1>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <button
          style={cozyWarmPremiumButton}
          onMouseEnter={(e) =>
            Object.assign(e.target.style, cozyWarmPremiumButtonHover)
          }
          onMouseLeave={(e) =>
            Object.assign(e.target.style, cozyWarmPremiumButton)
          }
          onClick={() => onSelect("products")}
        >
          Produits
        </button>

        <button
          style={cozyWarmPremiumButton}
          onMouseEnter={(e) =>
            Object.assign(e.target.style, cozyWarmPremiumButtonHover)
          }
          onMouseLeave={(e) =>
            Object.assign(e.target.style, cozyWarmPremiumButton)
          }
          onClick={() => onSelect("promotions")}
        >
          Promotions
        </button>

        <button
          style={cozyWarmPremiumButton}
          onMouseEnter={(e) =>
            Object.assign(e.target.style, cozyWarmPremiumButtonHover)
          }
          onMouseLeave={(e) =>
            Object.assign(e.target.style, cozyWarmPremiumButton)
          }
          onClick={() => onSelect("alerts")}
        >
          Alertes
        </button>

        <button
          style={cozyWarmPremiumButton}
          onMouseEnter={(e) =>
            Object.assign(e.target.style, cozyWarmPremiumButtonHover)
          }
          onMouseLeave={(e) =>
            Object.assign(e.target.style, cozyWarmPremiumButton)
          }
          onClick={() => onSelect("crypto")}
        >
          Crypto
        </button>
      </div>
    </main>
  );
}
