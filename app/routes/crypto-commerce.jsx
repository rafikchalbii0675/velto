import VeltoLayout from "../components/velto/VeltoLayout";

export default function CryptoCommerce() {
  return (
    <VeltoLayout title="Crypto-commerce">
      <div style={{ padding: "20px" }}>
        <h2 style={{ color: "#3a2f28" }}>Module Crypto-commerce</h2>

        <p style={{ color: "#6b5b4d", marginTop: "10px" }}>
          Ce module vous permettra d’intégrer des fonctionnalités crypto dans
          votre boutique Velto Cozy Warm Edition.
        </p>

        <ul style={{ marginTop: "20px", color: "#3a2f28", fontSize: "18px", lineHeight: "32px" }}>
          <li>🔥 Paiements crypto</li>
          <li>🔥 Portefeuilles intégrés</li>
          <li>🔥 Récompenses blockchain</li>
          <li>🔥 Promotions crypto intelligentes</li>
        </ul>
      </div>
    </VeltoLayout>
  );
}
