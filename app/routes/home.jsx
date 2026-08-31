import VeltoLayout from "../components/velto/VeltoLayout";

/* â­ Fake Data (Ã  remplacer plus tard par Shopify Admin API) */
const overview = {
  totalSales: 1280,
  todaySales: 12,
  newClients: 4,
  activePromotions: 3,
  topProduct: "Produit A",
  weakProduct: "Produit D",
};

export default function Home() {
  return (
    <VeltoLayout title="Accueil â€” Velto Cozy Warm">
      <div style={pageContainer}>

        {/* â­ INTRO */}
        <div style={introCard}>
          <h2 style={sectionTitle}>Bienvenue dans Velto</h2>
          <p style={sectionText}>
            Votre assistant IA Cozy Warm pour analyser vos produits, comprendre vos clients,
            crÃ©er des promotions intelligentes et augmenter vos ventes.
          </p>
        </div>

        {/* â­ GRID OVERVIEW */}
        <div style={overviewGrid}>

          <div style={overviewCard}>
            <h3 style={overviewTitle}>Ventes totales</h3>
            <p style={overviewValue}>{overview.totalSales}$</p>
          </div>

          <div style={overviewCard}>
            <h3 style={overviewTitle}>Ventes aujourdâ€™hui</h3>
            <p style={overviewValue}>{overview.todaySales}</p>
          </div>

          <div style={overviewCard}>
            <h3 style={overviewTitle}>Nouveaux clients</h3>
            <p style={overviewValue}>{overview.newClients}</p>
          </div>

          <div style={overviewCard}>
            <h3 style={overviewTitle}>Promotions actives</h3>
            <p style={overviewValue}>{overview.activePromotions}</p>
          </div>

        </div>

        {/* â­ ANALYSE IA */}
        <div style={cardPremium}>
          <h3 style={sectionTitle}>Analyse IA Cozy Warm</h3>
          <p style={{ whiteSpace: "pre-line" }}>
            â€¢ Produit le plus performant : {overview.topProduct}  
            â€¢ Produit le plus faible : {overview.weakProduct}  
            â€¢ Tendance gÃ©nÃ©rale : stable  
            â€¢ Recommandation : booster {overview.weakProduct} avec une promotion IA
          </p>
        </div>

        {/* â­ MODULES */}
        <div style={modulesGrid}>

          <a href="/app/promotions" style={moduleCard}>
            <h3 style={moduleTitle}>Promotions IA</h3>
            <p style={moduleText}>CrÃ©er des promotions intelligentes Cozy Warm.</p>
          </a>

          <a href="/dashboard" style={moduleCard}>
            <h3 style={moduleTitle}>Dashboard Cozy Warm</h3>
            <p style={moduleText}>Analyse produits, clients et tendances.</p>
          </a>

          <a href="/crypto" style={moduleCard}>
            <h3 style={moduleTitle}>Cryptoâ€‘commerce</h3>
            <p style={moduleText}>Analyse BTC, ETH, SOL, MATIC.</p>
          </a>

          <a href="/settings" style={moduleCard}>
            <h3 style={moduleTitle}>ParamÃ¨tres</h3>
            <p style={moduleText}>Configurer Velto selon vos prÃ©fÃ©rences.</p>
          </a>

        </div>

      </div>
    </VeltoLayout>
  );
}

/* â­ Styles Premium */
const pageContainer = {
  maxWidth: "1000px",
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

const overviewGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "25px",
};

const overviewCard = {
  backgroundColor: "#f7f2ec",
  borderRadius: "14px",
  padding: "25px",
  border: "1px solid #c7a45a",
  boxShadow: "0 4px 10px rgba(0,0,0,0.12)",
  textAlign: "center",
};

const overviewTitle = {
  fontSize: "18px",
  color: "#3a2f28",
  marginBottom: "10px",
};

const overviewValue = {
  fontSize: "32px",
  fontWeight: "700",
  color: "#3a2f28",
};

const cardPremium = {
  backgroundColor: "#f7f2ec",
  borderRadius: "14px",
  padding: "25px",
  border: "1px solid #c7a45a",
  boxShadow: "0 4px 10px rgba(0,0,0,0.12)",
};

const modulesGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "25px",
};

const moduleCard = {
  backgroundColor: "#faf6f0",
  borderRadius: "14px",
  padding: "25px",
  border: "1px solid #c7a45a",
  boxShadow: "0 4px 10px rgba(0,0,0,0.12)",
  textDecoration: "none",
  color: "#3a2f28",
  transition: "all 0.2s ease",
};

const moduleTitle = {
  fontSize: "18px",
  fontWeight: "700",
  marginBottom: "10px",
};

const moduleText = {
  fontSize: "16px",
  lineHeight: "1.6",
};

