import VeltoLayout from "../components/velto/VeltoLayout";
import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <VeltoLayout title="Velto Cozy Warm Edition">
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        
        <Link to="/app/promotions" style={{ fontSize: "20px" }}>
          ðŸ‘‰ Promotions intelligentes
        </Link>

        <Link to="/crypto-commerce" style={{ fontSize: "20px" }}>
          ðŸ‘‰ Crypto-commerce
        </Link>

        <Link to="/dashboard" style={{ fontSize: "20px" }}>
          ðŸ‘‰ Tableau de bord Cozy
        </Link>

        <Link to="/home" style={{ fontSize: "20px" }}>
          ðŸ‘‰ Accueil Velto (Home)
        </Link>

      </div>
    </VeltoLayout>
  );
}

