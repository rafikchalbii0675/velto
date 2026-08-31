import VeltoLayout from "../components/velto/VeltoLayout";

export default function About() {
  return (
    <VeltoLayout title="À propos — Velto Studio Cozy">
      <div style={pageContainer}>

        {/* ⭐ INTRO */}
        <div style={introCard}>
          <h2 style={sectionTitle}>Velto — Cozy Warm Edition</h2>
          <p style={sectionText}>
            Velto est une application Shopify intelligente conçue pour aider les commerçants 
            à augmenter leurs ventes grâce à l’IA Cozy Warm, une approche douce, humaine et 
            orientée vers l’expérience client.
          </p>
        </div>

        {/* ⭐ MISSION */}
        <div style={cardPremium}>
          <h3 style={sectionTitle}>Notre mission</h3>
          <p style={sectionText}>
            Offrir aux commerçants une intelligence artificielle chaleureuse, intuitive et 
            élégante, capable d’analyser les produits, les clients, les saisons et les tendances 
            pour créer des promotions réellement efficaces.
          </p>
        </div>

        {/* ⭐ VISION */}
        <div style={cardPremium}>
          <h3 style={sectionTitle}>Notre vision</h3>
          <p style={sectionText}>
            Velto vise à devenir l’assistant IA Cozy Warm le plus apprécié des commerçants, 
            en combinant technologie avancée, design premium et simplicité d’utilisation.
          </p>
        </div>

        {/* ⭐ FONCTIONNALITÉS */}
        <div style={cardPremium}>
          <h3 style={sectionTitle}>Fonctionnalités principales</h3>
          <ul style={listStyle}>
            <li>✨ Promotions intelligentes IA</li>
            <li>📊 Dashboard Cozy Warm</li>
            <li>💎 Analyse produits & clients</li>
            <li>🍂 Promotions saisonnières</li>
            <li>⚡ Promotions dynamiques</li>
            <li>🪙 Crypto‑commerce Premium</li>
            <li>🎨 Design Cozy Warm Or</li>
          </ul>
        </div>

        {/* ⭐ TECHNOLOGIE */}
        <div style={cardPremium}>
          <h3 style={sectionTitle}>Technologie Velto</h3>
          <p style={sectionText}>
            Velto repose sur une architecture moderne : Remix, Shopify Admin API, IA interne, 
            design premium, et une structure stable pensée pour les boutiques réelles.
          </p>
        </div>

        {/* ⭐ FONDATEUR */}
        <div style={cardPremium}>
          <h3 style={sectionTitle}>À propos du fondateur</h3>
          <p style={sectionText}>
            Velto est développé par Studio Cozy, fondé par un créateur passionné de design, 
            d’innovation et d’expérience utilisateur.  
            L’objectif : créer des outils élégants, humains et puissants pour les commerçants.
          </p>
        </div>

      </div>
    </VeltoLayout>
  );
}

/* ⭐ Styles Premium */
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

const listStyle = {
  fontSize: "17px",
  color: "#3a2f28",
  lineHeight: "1.8",
  paddingLeft: "20px",
};
