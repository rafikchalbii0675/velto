// app/routes/onboarding.jsx

import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { authenticate } from "../shopify.server";
import VeltoLayout from "../components/velto/VeltoLayout";
import { cozyWarmPremiumButton, cozyWarmPremiumButtonHover } 
from "../components/styles/cozyButtons";

export async function loader({ request }) {
  const { session } = await authenticate.admin(request);

  return json({ shop: session.shop });
}

export default function Onboarding() {
  const { shop } = useLoaderData();

  return (
    <VeltoLayout>
      <main style={{ padding: "20px" }}>
        <h1>Bienvenue dans Velto</h1>
        <p>Configuration initiale pour la boutique : {shop}</p>

        <button
          style={{
            marginTop: "12px",
            padding: "12px 20px",
            backgroundColor: "#3a2f28",
            color: "#fff",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Commencer
        </button>
      </main>
    </VeltoLayout>
  );
}
<Link
  to="/app/alerts"
  style={cozyWarmPremiumButton}
  onMouseEnter={(e) => Object.assign(e.target.style, cozyWarmPremiumButtonHover)}
  onMouseLeave={(e) => Object.assign(e.target.style, cozyWarmPremiumButton)}
>
  Accéder au tableau de bord
</Link>
