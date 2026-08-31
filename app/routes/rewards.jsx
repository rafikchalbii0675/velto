import VeltoLayout from "../components/velto/VeltoLayout";

export default function Rewards() {
  return (
    <VeltoLayout title="Velto Rewards • Progression IA">
      <div style={pageContainer}>

        {/* INTRO */}
        <div style={introCard}>
          <h2 style={sectionTitle}>Programme de Récompenses Velto</h2>
          <p style={sectionText}>
            Le programme de récompenses Velto est conçu pour valoriser votre progression,
            reconnaître vos efforts et vous offrir des avantages professionnels à mesure que votre boutique évolue.
            Il s’agit d’un système structuré, clair et orienté performance.
          </p>
        </div>

        {/* OBJECTIFS */}
        <div style={cardPremium}>
          <h3 style={sectionTitle}>Objectifs du programme</h3>
          <ul style={listStyle}>
            <li>Encourager la croissance de votre boutique</li>
            <li>Récompenser les progrès réalisés</li>
            <li>Offrir des avantages exclusifs selon votre niveau</li>
            <li>Accompagner votre développement avec des outils IA avancés</li>
            <li>Créer une progression claire et motivante</li>
          </ul>
        </div>

        {/* NIVEAUX */}
        <div style={cardPremium}>
          <h3 style={sectionTitle}>Niveaux de progression</h3>
          <p style={sectionText}>
            Le programme Velto comporte quatre niveaux.  
            Chaque niveau débloque des fonctionnalités et avantages supplémentaires.
          </p>

          <ul style={listStyle}>
            <li><strong>Bronze Cozy</strong> — accès aux analyses IA essentielles</li>
            <li><strong>Argent Warm</strong> — recommandations IA avancées</li>
            <li><strong>Or Premium</strong> — promotions IA automatiques et optimisées</li>
            <li><strong>Cozy Warm Or</strong> — accès complet aux partenaires et avantages exclusifs</li>
          </ul>
        </div>

        {/* CRITERES */}
        <div style={cardPremium}>
          <h3 style={sectionTitle}>Critères de progression</h3>
          <p style={sectionText}>
            Velto analyse plusieurs indicateurs pour déterminer votre niveau :
          </p>

          <ul style={listStyle}>
            <li>Performance des ventes</li>
            <li>Utilisation des promotions IA</li>
            <li>Engagement client</li>
            <li>Stabilité de la croissance</li>
            <li>Respect des objectifs IA</li>
          </ul>
        </div>

        {/* AVANTAGES */}
        <div style={cardPremium}>
          <h3 style={sectionTitle}>Avantages selon le niveau</h3>
          <ul style={listStyle}>
            <li>Accès à des modules IA avancés</li>
            <li>Optimisation automatique des promotions</li>
            <li>Accès prioritaire au réseau de partenaires</li>
            <li>Réductions sur les services Studio Cozy</li>
            <li>Coaching IA personnalisé</li>
          </ul>
        </div>

        {/* MESSAGE */}
        <div style={cardPremium}>
          <h3 style={sectionTitle}>Message du créateur</h3>
          <p style={sectionText}>
            Le programme de récompenses Velto est conçu pour accompagner votre boutique
            avec sérieux, précision et élégance.  
            Il ne s’agit pas d’un système de gamification, mais d’un cadre professionnel
            destiné à soutenir votre progression et à valoriser votre travail.
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
