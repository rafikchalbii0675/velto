import VeltoLayout from "../components/velto/VeltoLayout";
import { useLoaderData } from "@remix-run/react";
import { getPoints } from "~/models/points.server";

export async function loader({ request }) {
  const shopId = "demo-shop"; // Remplace par ton shopId réel
  const points = await getPoints(shopId);
  return { points };
}

export default function Dashboard() {
  const { points } = useLoaderData();

  return (
    <VeltoLayout title="Dashboard Velto">
      <div style={pageContainer}>

        {/* SECTION POINTS IA */}
        <div style={cardPremium}>
          <h3 style={sectionTitle}>Points IA</h3>
          <p style={sectionText}>
            Votre progression IA est calculée en fonction de vos ventes, de vos actions IA et de votre abonnement.
          </p>

          <div style={pointsGrid}>
            <div style={pointsCard}>
              <h4 style={pointsTitle}>Points totaux</h4>
              <p style={pointsValue}>{points.total}</p>
            </div>

            <div style={pointsCard}>
              <h4 style={pointsTitle}>Points ce mois-ci</h4>
              <p style={pointsValue}>{points.month}</p>
            </div>

            <div style={pointsCard}>
              <h4 style={pointsTitle}>Niveau actuel</h4>
              <p style={pointsValue}>{points.level}</p>
            </div>
          </div>
        </div>

      </div>
    </VeltoLayout>
  );
}

/* Styles Premium */
const pageContainer = {
  maxWidth: "900px",
  margin: "0 auto",
  display: "flex",
  flexDirection: "column",
  gap: "35px",
};

const cardPremium = {
  backgroundColor: "#f7f2ec",
  borderRadius: "14px",
  padding: "25px",
  border: "1px solid #c7a45a",
  boxShadow: "0 4px 10px rgba(0,0,0,0.12)",
};

const sectionTitle = {
  fontSize: "24px",
  color: "#3a2f28",
  marginBottom: "15px",
  fontWeight: "700",
};

const sectionText = {
  fontSize: "17px",
  color: "#3a2f28",
  lineHeight: "1.6",
};

const pointsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "20px",
  marginTop: "20px",
};

const pointsCard = {
  backgroundColor: "#faf6f0",
  borderRadius: "12px",
  padding: "20px",
  border: "1px solid #c7a45a",
};

const pointsTitle = {
  fontSize: "18px",
  color: "#3a2f28",
  marginBottom: "10px",
};

const pointsValue = {
  fontSize: "28px",
  fontWeight: "700",
  color: "#3a2f28",
};
