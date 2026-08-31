import VeltoLayout from "../components/velto/VeltoLayout";

export default function Policy() {
  return (
    <VeltoLayout title="Conditions & Confidentialité — Velto">
      <div style={pageContainer}>

        {/* ⭐ INTRO */}
        <div style={cardPremium}>
          <h2 style={sectionTitle}>Conditions d’utilisation</h2>
          <p style={sectionText}>
            En utilisant Velto, vous acceptez les présentes conditions d’utilisation.  
            Velto est conçu pour aider les commerçants à optimiser leurs ventes grâce à 
            l’intelligence artificielle Cozy Warm.
          </p>
        </div>

        {/* ⭐ CONFIDENTIALITÉ */}
        <div style={cardPremium}>
          <h3 style={sectionTitle}>Confidentialité</h3>
          <p style={sectionText}>
            Velto respecte la confidentialité de vos données.  
            Les informations de votre boutique sont utilisées uniquement pour générer des 
            analyses, des recommandations et des promotions IA.
          </p>

          <ul style={listStyle}>
            <li>🔒 Aucune donnée n’est vendue ou partagée.</li>
            <li>🔒 Les données sont utilisées uniquement pour les fonctionnalités Velto.</li>
            <li>🔒 Vous pouvez demander la suppression de vos données à tout moment.</li>
          </ul>
        </div>

        {/* ⭐ DONNÉES UTILISÉES */}
        <div style={cardPremium}>
          <h3 style={sectionTitle}>Données utilisées par Velto</h3>
          <p style={sectionText}>
            Velto utilise uniquement les données nécessaires au fonctionnement de l’application :
          </p>

          <ul style={listStyle}>
            <li>• Produits (nom, prix, inventaire, ventes)</li>
            <li>• Clients (commandes, dépenses, activité)</li>
            <li>• Promotions existantes</li>
            <li>• Tendances de ventes</li>
          </ul>
        </div>

        {/* ⭐ RESPONSABILITÉ */}
        <div style={cardPremium}>
          <h3 style={sectionTitle}>Responsabilité</h3>
          <p style={sectionText}>
            Velto fournit des recommandations IA basées sur les données de votre boutique.  
            Les décisions finales concernant les promotions, les prix et les stratégies 
            commerciales vous appartiennent entièrement.
          </p>
        </div>

        {/* ⭐ SÉCURITÉ */}
        <div style={cardPremium}>
          <h3 style={sectionTitle}>Sécurité</h3>
          <p style={sectionText}>
            Velto utilise les standards de sécurité Shopify pour garantir la protection de 
            vos données et de votre boutique.
          </p>
        </div>

        {/* ⭐ CONTACT */}
        <div style={cardPremium}>
          <h3 style={sectionTitle}>Contact</h3>
          <p style={sectionText}>
            Pour toute question concernant les conditions ou la confidentialité :
          </p>

          <ul style={listStyle}>
            <li>📧 Email : <strong>support@studiocozy.ca</strong></li>
            <li>🛠️ Assistance technique : <strong>dev@studiocozy.ca</strong></li>
          </ul>
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
