import VeltoLayout from "../components/velto/VeltoLayout";
import VeltoDashboard from "../components/velto/VeltoDashboard";
import { json } from "@remix-run/node";

/* Loader PRO — si tu veux ajouter des stats dynamiques plus tard */
export async function loader() {
  return json({
    stats: {
      products: 128,
      promotions: 12,
      alerts: 3,
      hotProducts: 7,
      cryptoTransactions: 54,
    },
  });
}

/* Page Dashboard PRO */
export default function DashboardRoute() {
  return (
    <VeltoLayout title="Dashboard Velto PRO">
      <div
        style={{
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        <VeltoDashboard />
      </div>
    </VeltoLayout>
  );
}
