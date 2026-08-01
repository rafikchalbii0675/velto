// app/routes/crypto.jsx

import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { authenticate } from "../shopify.server";
import { signPayload } from "../utils/crypto.server";
import VeltoLayout from "../components/velto/VeltoLayout";
import { cozyWarmPremiumButton, cozyWarmPremiumButtonHover } 
from "../components/styles/cozyButtons";

export async function loader({ request }) {
  const { session } = await authenticate.admin(request);

  const signed = signPayload({ shop: session.shop });

  return json({ signed });
}

export default function Crypto() {
  const { signed } = useLoaderData();

  return (
    <VeltoLayout>
      <main style={{ padding: "20px" }}>
        <h1>Crypto Commerce</h1>

        <p>Signature générée :</p>
        <pre>{JSON.stringify(signed, null, 2)}</pre>
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
