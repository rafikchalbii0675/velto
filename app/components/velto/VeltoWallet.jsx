import VeltoLayout from "./VeltoLayout";

export default function VeltoWallet() {
  return (
    <VeltoLayout title="Velto Wallet">
      <div
        style={{
          padding: "24px",
          backgroundColor: "#fff",
          borderRadius: "16px",
          boxShadow: "0px 4px 12px rgba(0,0,0,0.06)",
        }}
      >
        <h1 style={{ marginBottom: "16px" }}>Wallet 💳</h1>

        <p style={{ marginBottom: "24px", color: "#4a4a4a" }}>
          Gestion des paiements, transactions et crypto‑commerce.
        </p>

        <div
          style={{
            padding: "16px",
            borderRadius: "12px",
            backgroundColor: "#faf7f3",
            border: "1px solid #e1e3e5",
            marginBottom: "16px",
          }}
        >
          <h3 style={{ marginBottom: "8px" }}>Solde actuel</h3>
          <p style={{ fontSize: "20px", fontWeight: "700" }}>0.00 CAD</p>
        </div>

        <button
          style={{
            width: "100%",
            padding: "14px 20px",
            background: "#202223",
            color: "#ffffff",
            border: "none",
            borderRadius: "9px",
            fontSize: "17px",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Activer les paiements crypto
        </button>
      </div>
    </VeltoLayout>
  );
}
