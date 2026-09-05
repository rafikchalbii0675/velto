import VeltoLayout from "../components/velto/VeltoLayout";

export default function Roadmap() {
  return (
    <VeltoLayout title="Velto Roadmap • Vision 2026–2027">
      <div style={pageContainer}>

        {/*  INTRO */}
        <div style={introCard}>
          <h2 style={sectionTitle}>La vision de Velto</h2>
          <p style={sectionText}>
            Velto grandit chaque jour.  
            Cette roadmap n’est pas une prédiction, mais une intention.  
            Une direction douce, élégante, Cozy Warm, pour guider Velto vers son futur.
          </p>
        </div>

        {/*  2026 Q3 */}
        <div style={cardPremium}>
          <h3 style={sectionTitle}>2026 — Q3</h3>
          <ul style={listStyle}>
            <li> Finalisation des pages essentielles (Promotions, Dashboard, Crypto, Logs)</li>
            <li> Stabilisation du design Cozy Warm Or</li>
            <li> Amélioration des analyses IA produits & clients</li>
            <li> Optimisation du module saisonnier</li>
            <li> Préparation de la candidature Shopify App Store</li>
          </ul>
        </div>

        {/*  2026 Q4 */}
        <div style={cardPremium}>
          <h3 style={sectionTitle}>2026 — Q4</h3>
          <ul style={listStyle}>
            <li> IA avancée : recommandations multi‑produits</li>
            <li> IA dynamique : tendances en temps réel</li>
            <li> Crypto‑paiements (si Shopify autorise)</li>
            <li> Sécurité renforcée pour les données marchands</li>
            <li> Lancement officiel pour boutiques pilotes</li>
          </ul>
        </div>

        {/*  2027 Q1 */}
        <div style={cardPremium}>
          <h3 style={sectionTitle}>2027 — Q1</h3>
          <ul style={listStyle}>
            <li> Module “Bundles IA” — création automatique de combos produits</li>
            <li> IA ciblage clients : promotions personnalisées</li>
            <li> Module Email Cozy Warm (recommandations douces)</li>
            <li> Intégration Shopify Flow (automatisations)</li>
            <li> Version internationale (FR / EN / ES)</li>
          </ul>
        </div>

        {/*  2027 Q2 */}
        <div style={cardPremium}>
          <h3 style={sectionTitle}>2027 — Q2</h3>
          <ul style={listStyle}>
            <li> IA prédictive : prévisions de ventes</li>
            <li> IA inventaire : alertes intelligentes</li>
            <li> IA marketing : suggestions de campagnes</li>
            <li> Velto Theme Assistant (design IA pour boutiques)</li>
            <li> Certification Shopify App Store (objectif)</li>
          </ul>
        </div>

        {/*  PHILOSOPHIE */}
        <div style={cardPremium}>
          <h3 style={sectionTitle}>Philosophie de croissance</h3>
          <p style={sectionText}>
            Velto ne cherche pas à devenir le plus grand.  
            Il cherche à devenir le plus **élégant**, le plus **doux**, le plus **humain**,  
            le plus **cohérent**, le plus **Cozy Warm**.
          </p>
          <p style={sectionText}>
            Chaque mise à jour doit apporter :
          </p>

          <ul style={listStyle}>
            <li> plus de douceur</li>
            <li> plus de chaleur</li>
            <li> plus d’esthétique</li>
            <li> plus de clarté</li>
            <li> plus d’intelligence</li>
          </ul>
        </div>

        {/*  MESSAGE FINAL */}
        <div style={cardPremium}>
          <h3 style={sectionTitle}>Message pour l’avenir</h3>
          <p style={sectionText}>
            L’avenir est imprévisible.  
            Mais Velto est construit avec intention, élégance et respect.  
            Peu importe ce que les jours nous enverront,  
            Velto continuera de grandir avec douceur et intelligence.
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

const listStyle = {
  fontSize: "17px",
  color: "#3a2f28",
  lineHeight: "1.8",
  paddingLeft: "20px",
};
