import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Link } from "@remix-run/react";
import { authenticate } from "../shopify.server";

import VeltoLayout from "../components/velto/VeltoLayout";

import {
  cozyCardContainer,
  cozyCardHover,
  cozyCardTitle,
  cozyCardText,
} from "../components/styles/cozyCards.jsx";

import {
  cozyWarmPremiumButton,
  cozyWarmPremiumButtonHover,
} from "../components/styles/cozyButtons";

import {
  cozyInput,
  cozyInputLabel,
} from "../components/styles/cozyInputs";

export const loader = async ({ request }) => {
  const { session, admin } = await authenticate.admin(request);

  // Exemple de données fictives pour la page Settings
  const settings = {
    shopName: session.shop,
    theme: "Cozy Warm Premium",
    notifications: true,
  };

  return json({ settings });
};

export default function AppSettings() {
  const { settings } = useLoaderData();

  return (
    <VeltoLayout>
      <main
        style={{
          padding: "32px",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            marginBottom: "24px",
            fontSize: "28px",
            fontWeight: "700",
            color: "#3a2f28",
          }}
        >
          Paramètres de Velto
        </h1>

        {/* Card Cozy Warm Premium */}
        <div
          style={cozyCardContainer}
          onMouseEnter={(e) => Object.assign(e.target.style, cozyCardHover)}
          onMouseLeave={(e) => Object.assign(e.target.style, cozyCardContainer)}
        >
          <h2 style={cozyCardTitle}>Informations de la boutique</h2>

          <p style={cozyCardText}>
            <strong>Boutique :</strong> {settings.shopName}
          </p>

          <p style={cozyCardText}>
            <strong>Thème :</strong> {settings.theme}
          </p>
        </div>

        {/* Card Notifications */}
        <div
          style={cozyCardContainer}
          onMouseEnter={(e) => Object.assign(e.target.style, cozyCardHover)}
          onMouseLeave={(e) => Object.assign(e.target.style, cozyCardContainer)}
        >
          <h2 style={cozyCardTitle}>Notifications</h2>

          <label style={cozyInputLabel}>Activer les notifications</label>
          <input
            type="checkbox"
            defaultChecked={settings.notifications}
            style={cozyInput}
          />
        </div>

        {/* Bouton Retour */}
        <Link
          to="/app_index"
          style={{
            ...cozyWarmPremiumButton,
            marginTop: "24px",
            display: "inline-block",
          }}
          onMouseEnter={(e) =>
            Object.assign(e.target.style, cozyWarmPremiumButtonHover)
          }
          onMouseLeave={(e) =>
            Object.assign(e.target.style, cozyWarmPremiumButton)
          }
        >
          Retour au tableau de bord
        </Link>
      </main>
    </VeltoLayout>
  );
}
