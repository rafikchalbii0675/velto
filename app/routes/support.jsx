import VeltoLayout from "../components/velto/VeltoLayout";

export default function Support() {
  return (
    <VeltoLayout title="Support • Velto Studio Cozy">
      <div style={pageContainer}>

        {/*  SECTION SUPPORT */}
        <div style={cardPremium}>
          <h2 style={sectionTitle}>Support Velto</h2>
          <p style={sectionText}>
            Notre équipe Cozy Warm est disponible pour vous aider à utiliser Velto, 
            configurer vos promotions, comprendre les analyses IA et optimiser vos ventes.
          </p>
        </div>

        {/*  SECTION CONTACT */}
        <div style={cardPremium}>
          <h3 style={sectionTitle}>Contact</h3>
          <p style={sectionText}>
            Pour toute question, assistance ou demande de boutique pilote :
          </p>

          <ul style={listStyle}>
            <li> Email : <strong>support@studiocozy.ca</strong></li>
            <li> Assistance IA intégrée dans Velto</li>
            <li> Aide technique : <strong>dev@studiocozy.ca</strong></li>
          </ul>
        </div>

        {/*  SECTION FAQ */}
        <div style={cardPremium}>
          <h3 style={sectionTitle}>FAQ — Questions fréquentes</h3>

          <div style={faqItem}>
            <h4 style={faqQuestion}>Comment activer une promotion IA ?</h4>
            <p style={faqAnswer}>
              Rendez-vous dans l’onglet “Promotions”, entrez le produit et le pourcentage, 
              puis cliquez sur “Générer la promotion IA”.
            </p>
          </div>

          <div style={faqItem}>
            <h4 style={faqQuestion}>Velto crée-t-il des promotions automatiquement ?</h4>
            <p style={faqAnswer}>
              Oui. Velto analyse vos produits, vos clients, les saisons et les tendances 
              pour proposer des promotions intelligentes Cozy Warm.
            </p>
          </div>

          <div style={faqItem}>
            <h4 style={faqQuestion}>Comment fonctionne le crypto-commerce ?</h4>
            <p style={faqAnswer}>
              Velto analyse les tendances crypto (BTC, ETH, SOL, MATIC) et propose des 
              stratégies Cozy Warm pour les paiements modernes.
            </p>
          </div>

          <div style={faqItem}>
            <h4 style={faqQuestion}>Puis-je devenir boutique pilote ?</h4>
            <p style={faqAnswer}>
              Oui. Contactez-nous à <strong>support@studiocozy.ca</strong> pour rejoindre 
              le programme pilote Velto.
            </p>
          </div>

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

const faqItem = {
  marginBottom: "20px",
};

const faqQuestion = {
  fontSize: "18px",
  fontWeight: "600",
  color: "#3a2f28",
  marginBottom: "8px",
};

const faqAnswer = {
  fontSize: "16px",
  color: "#3a2f28",
  lineHeight: "1.6",
};
