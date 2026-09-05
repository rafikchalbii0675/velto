import VeltoLayout from "../components/velto/VeltoLayout";
import { useState } from "react";

export default function Settings() {
  const [iaEnabled, setIaEnabled] = useState(true);
  const [seasonalEnabled, setSeasonalEnabled] = useState(true);
  const [cryptoEnabled, setCryptoEnabled] = useState(true);
  const [autoPromo, setAutoPromo] = useState(false);

  return (
    <VeltoLayout title="Paramètres Velto">
      <div style={pageContainer}>

        {/*  INTRO */}
        <div style={introCard}>
          <h2 style={sectionTitle}>Configuration générale</h2>
          <p style={sectionText}>
            Ajustez les paramètres de Velto selon vos préférences Cozy Warm.  
            Ces réglages influencent les analyses IA, les promotions et les modules actifs.
          </p>
        </div>

        {/*  MODULE IA */}
        <div style={cardPremium}>
          <h3 style={sectionTitle}>Intelligence artificielle Cozy Warm</h3>

          <div style={settingRow}>
            <span style={settingLabel}>Activer l’IA Cozy Warm</span>
            <input
              type="checkbox"
              checked={iaEnabled}
              onChange={() => setIaEnabled(!iaEnabled)}
              style={checkboxStyle}
            />
          </div>

          <p style={settingDescription}>
            L’IA Cozy Warm analyse vos produits, vos clients et vos tendances pour proposer des promotions intelligentes.
          </p>
        </div>

        {/*  MODULE SAISONNIER */}
        <div style={cardPremium}>
          <h3 style={sectionTitle}>Promotions saisonnières</h3>

          <div style={settingRow}>
            <span style={settingLabel}>Activer les promotions saisonnières</span>
            <input
              type="checkbox"
              checked={seasonalEnabled}
              onChange={() => setSeasonalEnabled(!seasonalEnabled)}
              style={checkboxStyle}
            />
          </div>

          <p style={settingDescription}>
            Active les promotions Cozy Warm basées sur les saisons (Noël, Automne, Été, Printemps).
          </p>
        </div>

        {/*  MODULE CRYPTO */}
        <div style={cardPremium}>
          <h3 style={sectionTitle}>Crypto‑commerce</h3>

          <div style={settingRow}>
            <span style={settingLabel}>Activer le module crypto</span>
            <input
              type="checkbox"
              checked={cryptoEnabled}
              onChange={() => setCryptoEnabled(!cryptoEnabled)}
              style={checkboxStyle}
            />
          </div>

          <p style={settingDescription}>
            Active les analyses crypto (BTC, ETH, SOL, MATIC) et les recommandations Cozy Warm pour paiements modernes.
          </p>
        </div>

        {/*  PROMOTIONS AUTOMATIQUES */}
        <div style={cardPremium}>
          <h3 style={sectionTitle}>Promotions automatiques</h3>

          <div style={settingRow}>
            <span style={settingLabel}>Activer les promotions automatiques IA</span>
            <input
              type="checkbox"
              checked={autoPromo}
              onChange={() => setAutoPromo(!autoPromo)}
              style={checkboxStyle}
            />
          </div>

          <p style={settingDescription}>
            Velto créera automatiquement des promotions IA basées sur vos ventes et vos clients.
          </p>
        </div>

      </div>
    </VeltoLayout>
  );
}

/*  Styles Premium */
const pageContainer = {
  maxWidth: "900px",
  margin: "0 auto",
  display: "flex",
  flexDirection: "column",
  gap: "35px",
};

const introCard = {
  backgroundColor: "#faf6f0",
  borderRadius: "14px",
  padding: "30px",
  border: "1px solid #c7a45a",
  boxShadow: "0 4px 10px rgba(0,0,0,0.12)",
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

const settingRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "12px",
};

const settingLabel = {
  fontSize: "17px",
  color: "#3a2f28",
};

const settingDescription = {
  fontSize: "15px",
  color: "#3a2f28",
  lineHeight: "1.6",
  marginTop: "10px",
};

const checkboxStyle = {
  width: "22px",
  height: "22px",
  cursor: "pointer",
};
