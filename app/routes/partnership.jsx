import VeltoLayout from "../components/velto/VeltoLayout";

export default function Partnership() {
  return (
    <VeltoLayout title="Velto Partnership • Récompenses & Réseau">
      <div style={pageContainer}>

        {/* INTRO */}
        <div style={introCard}>
          <h2 style={sectionTitle}>Velto Partnership Network</h2>
          <p style={sectionText}>
            Le programme de partenariat Velto est conçu pour améliorer la performance de votre boutique,
            récompenser votre progression et vous connecter à des partenaires capables de soutenir votre développement.
            Il s’agit d’un réseau professionnel, structuré et orienté croissance.
          </p>
        </div>

        {/* OBJECTIFS */}
        <div style={cardPremium}>
          <h3 style={sectionTitle}>Objectifs du programme</h3>
          <ul style={listStyle}>
            <li>Améliorer la performance globale de votre boutique</li>
            <li>Récompenser votre progression et vos résultats</li>
            <li>Vous connecter à des partenaires professionnels</li>
            <li>Accompagner votre croissance à long terme</li>
            <li>Offrir des avantages exclusifs Cozy Warm Or</li>
          </ul>
        </div>

        {/* NIVEAUX */}
        <div style={cardPremium}>
          <h3 style={sectionTitle}>Niveaux de progression</h3>
          <p style={sectionText}>
            Votre évolution dans Velto débloque des niveaux de récompenses.  
            Chaque niveau donne accès à des avantages supplémentaires.
          </p>

          <ul style={listStyle}>
            <li><strong>Bronze Cozy</strong> — accès aux analyses IA essentielles</li>
            <li><strong>Argent Warm</strong> — recommandations avancées</li>
            <li><strong>Or Premium</strong> — promotions IA automatiques</li>
            <li><strong>Cozy Warm Or</strong> — accès aux partenaires et avantages exclusifs</li>
          </ul>
        </div>

        {/* PARTENAIRES */}
        <div style={cardPremium}>
          <h3 style={sectionTitle}>Réseau de partenaires</h3>
          <p style={sectionText}>
            Velto sélectionne des partenaires professionnels capables d’accompagner votre boutique
            dans différents domaines stratégiques.
          </p>

          <ul style={listStyle}>
            <li>Designers Shopify spécialisés en branding et thèmes</li>
            <li>Agences marketing orientées performance et conversion</li>
            <li>Experts Shopify (SEO, optimisation, structure)</li>
            <li>Fournisseurs produits et solutions logistiques</li>
            <li>Services professionnels Studio Cozy</li>
          </ul>
        </div>

        {/* PROGRESSION */}
        <div style={cardPremium}>
          <h3 style={sectionTitle}>Suivi de votre progression</h3>
          <p style={sectionText}>
            Velto analyse votre évolution : ventes, promotions, engagement client, saisonnalité.
            Plus votre boutique progresse, plus vous débloquez des avantages professionnels.
          </p>

          <ul style={listStyle}>
            <li>Suivi des ventes et de la croissance</li>
            <li>Objectifs IA personnalisés</li>
            <li>Récompenses débloquées</li>
            <li>Accès progressif aux partenaires</li>
          </ul>
        </div>

        {/* AVANTAGES */}
        <div style={cardPremium}>
          <h3 style={sectionTitle}>Avantages Cozy Warm Or</h3>
          <ul style={listStyle}>
            <li>Accès prioritaire au réseau de partenaires</li>
            <li>Réductions sur les services Studio Cozy</li>
            <li>Coaching IA personnalisé</li>
            <li>Suggestions professionnelles pour votre boutique</li>
            <li>Optimisation avancée des promotions IA</li>
          </ul>
        </div>

        {/* MESSAGE */}
        <div style={cardPremium}>
          <h3 style={sectionTitle}>Message du créateur</h3>
          <p style={sectionText}>
            Le partenariat Velto est conçu pour accompagner votre boutique avec sérieux, élégance et précision.
            Il s’agit d’un programme professionnel, pensé pour soutenir votre croissance de manière durable.
            Velto et ses partenaires sont là pour vous aider à atteindre vos objectifs.
          </p>
        </div>

      </div>
    </VeltoLayout>
  );
}

/* Styles Premium */
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
