import VeltoLayout from "../components/velto/VeltoLayout";

/*  Fake Release Notes (à remplacer par DB plus tard) */
const updates = [
  {
    version: "1.0.4",
    date: "2026-08-09",
    type: "Amélioration",
    changes: [
      "Ajout de la page Logs / Historique IA",
      "Amélioration du design Cozy Warm Or",
      "Optimisation du module Promotions IA",
      "Amélioration du module Crypto IA",
    ],
    impact: "Velto devient plus transparent et plus professionnel pour les marchands.",
  },
  {
    version: "1.0.3",
    date: "2026-08-07",
    type: "Nouveauté",
    changes: [
      "Ajout du Dashboard Cozy Warm",
      "Ajout des analyses IA produits et clients",
      "Ajout des recommandations IA",
    ],
    impact: "Les marchands peuvent maintenant suivre leurs performances en temps réel.",
  },
  {
    version: "1.0.2",
    date: "2026-08-05",
    type: "Nouveauté",
    changes: [
      "Ajout du module Crypto‑commerce",
      "Analyse BTC, ETH, SOL, MATIC",
      "Recommandations IA Crypto",
    ],
    impact: "Velto devient compatible avec les paiements modernes.",
  },
  {
    version: "1.0.1",
    date: "2026-08-03",
    type: "Correction",
    changes: [
      "Correction du style des boutons Premium Or",
      "Amélioration du spacing global",
      "Correction du layout mobile",
    ],
    impact: "Velto devient plus stable et plus agréable à utiliser.",
  },
  {
    version: "1.0.0",
    date: "2026-08-01",
    type: "Lancement",
    changes: [
      "Version initiale de Velto",
      "Promotions IA",
      "Design Cozy Warm Or",
      "Intégration Shopify Admin API",
    ],
    impact: "Velto est officiellement lancé.",
  },
];

export default function Updates() {
  return (
    <VeltoLayout title="Mises à jour • Velto Cozy Warm">
      <div style={pageContainer}>

        {/*  INTRO */}
        <div style={introCard}>
          <h2 style={sectionTitle}>Notes de mise à jour</h2>
          <p style={sectionText}>
            Velto évolue constamment pour offrir une expérience Cozy Warm toujours plus 
            performante, intuitive et professionnelle.  
            Voici l’historique complet des mises à jour.
          </p>
        </div>

        {/*  LISTE DES UPDATES */}
        <div style={updatesContainer}>
          {updates.map((update, index) => (
            <div key={index} style={updateCard}>

              {/* HEADER */}
              <div style={updateHeader}>
                <span style={updateVersion}>{update.version}</span>
                <span style={updateDate}>{update.date}</span>
              </div>

              {/* TYPE */}
              <p style={updateType(update.type)}>
                {update.type}
              </p>

              {/* CHANGES */}
              <ul style={updateList}>
                {update.changes.map((change, i) => (
                  <li key={i}>{change}</li>
                ))}
              </ul>

              {/* IMPACT */}
              <p style={updateImpact}>
                <strong>Impact :</strong> {update.impact}
              </p>

            </div>
          ))}
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

const updatesContainer = {
  display: "flex",
  flexDirection: "column",
  gap: "25px",
};

const updateCard = {
  backgroundColor: "#f7f2ec",
  borderRadius: "14px",
  padding: "25px",
  border: "1px solid #c7a45a",
  boxShadow: "0 4px 10px rgba(0,0,0,0.12)",
};

const updateHeader = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "10px",
};

const updateVersion = {
  fontSize: "20px",
  fontWeight: "700",
  color: "#3a2f28",
};

const updateDate = {
  fontSize: "16px",
  color: "#3a2f28",
};

const updateType = (type) => ({
  fontSize: "16px",
  fontWeight: "600",
  color:
    type === "Nouveauté"
      ? "#2e7d32"
      : type === "Amélioration"
      ? "#1565c0"
      : type === "Correction"
      ? "#c62828"
      : "#3a2f28",
  marginBottom: "10px",
});

const updateList = {
  fontSize: "16px",
  color: "#3a2f28",
  lineHeight: "1.8",
  paddingLeft: "20px",
};

const updateImpact = {
  fontSize: "16px",
  color: "#3a2f28",
  marginTop: "10px",
  lineHeight: "1.6",
};
