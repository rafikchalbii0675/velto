// app/routes/Step3Finish.jsx

import { Link } from "@remix-run/react";
import {
  cozyWarmPremiumButton,
  cozyWarmPremiumButtonHover,
} from "../components/styles/cozyButtons";

export default function Step3Finish() {
  return (
    <main style={{ padding: "32px" }}>
      <h1 style={{ marginBottom: "16px" }}>Onboarding terminé 🎉</h1>

      <p style={{ marginBottom: "24px", fontSize: "18px" }}>
        Votre configuration initiale est prête.  
        Vous pouvez maintenant accéder au tableau de bord Velto.
      </p>

      <Link
        to="/app/dashboard"
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
    </main>
  );
}
