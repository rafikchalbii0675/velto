import VeltoLayout from "../components/velto/VeltoLayout";
import CozyCard from "../components/CozyCard";

export default function AppDashboard() {
  return (
    <VeltoLayout>
      <main style={{ padding: "20px" }}>
        <h1>Dashboard Velto</h1>

        <CozyCard title="Produits">
          <p>Voir les produits populaires</p>
        </CozyCard>

        <CozyCard title="Promotions">
          <p>Gérer les promotions actives</p>
        </CozyCard>

        <CozyCard title="Alertes">
          <p>Voir les alertes de la boutique</p>
        </CozyCard>
      </main>
    </VeltoLayout>
  );
}
