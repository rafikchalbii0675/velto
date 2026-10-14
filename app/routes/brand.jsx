import VeltoLayout from "../components/velto/VeltoLayout";

export default function Brand() {
  return (
    <VeltoLayout title="Velto Studio Cozy — Identité & Valeurs">
      <div style={pageContainer}>

        {/*  INTRO */}
        <div style={introCard}>
          <h2 style={sectionTitle}>L’âme de Velto</h2>
          <p style={sectionText}>
            Velto n’est pas seulement une application.  
            C’est une ambiance, une philosophie, une manière douce et élégante d’aider les marchands.  
            Velto est né pour apporter une intelligence chaleureuse, humaine et esthétique au commerce moderne.
          </p>
        </div>

        {/*  IDENTITÉ */}
        <div style={cardPremium}>
          <h3 style={sectionTitle}>Identité Cozy Warm Or</h3>
          <p style={sectionText}>
            L’identité de Velto repose sur trois piliers :
          </p>

          <ul style={listStyle}>
            <li> <strong>Cozy</strong> — une douceur visuelle, une approche humaine</li>
            <li> <strong>Warm</strong> — une chaleur dans les couleurs, les mots, les décisions</li>
            <li> <strong>Or</strong> — une élégance, une finesse, une qualité premium</li>
          </ul>

          <p style={sectionText}>
            Chaque page, chaque bouton, chaque analyse IA est pensée pour refléter cette identité.
          </p>
        </div>

        {/*  VALEURS */}
        <div style={cardPremium}>
          <h3 style={sectionTitle}>Valeurs Studio Cozy</h3>
          <ul style={listStyle}>
            <li> <strong>Humanité</strong> — Velto respecte le marchand et ses clients</li>
            <li> <strong>Esthétique</strong> — un design doux, premium, cohérent</li>
            <li> <strong>Clarté</strong> — des analyses IA simples à comprendre</li>
            <li> <strong>Confiance</strong> — transparence totale dans les actions IA</li>
            <li> <strong>Créativité</strong> — des promotions intelligentes et inspirées</li>
          </ul>
        </div>

        {/*  HISTOIRE */}
        <div style={cardPremium}>
          <h3 style={sectionTitle}>L’histoire de Velto</h3>
          <p style={sectionText}>
            Velto est né d’un désir simple :  
            créer une application Shopify qui ne ressemble à aucune autre.  
            Une application qui ne soit pas froide, technique ou agressive.  
            Une application qui respire la douceur, la chaleur, l’élégance.
          </p>

          <p style={sectionText}>
            Velto est né dans Studio Cozy, un espace où l’art, la technologie et l’émotion se rencontrent.  
            Il grandit avec soin, intention et amour du détail.
          </p>
        </div>

        {/*  PROMESSE */}
        <div style={cardPremium}>
          <h3 style={sectionTitle}>La promesse Velto</h3>
          <p style={sectionText}>
            Velto promet d’être :
          </p>

          <ul style={listStyle}>
            <li> <strong>Simple</strong> — facile à utiliser</li>
            <li> <strong>Chaleureux</strong> — jamais agressif</li>
            <li> <strong>Précis</strong> — analyses IA utiles et claires</li>
            <li> <strong>Beau</strong> — design premium Cozy Warm Or</li>
            <li> <strong>Intelligent</strong> — IA qui comprend le marchand</li>
          </ul>
        </div>

        {/*  CRÉATEUR */}
        <div style={cardPremium}>
          <h3 style={sectionTitle}>Le créateur</h3>
          <p style={sectionText}>
            Velto est créé par Studio Cozy, fondé par un créateur passionné de design,  
            d’innovation et d’expérience utilisateur.  
            Chaque ligne de code, chaque couleur, chaque mot est choisi avec intention.
          </p>

          <p style={sectionText}>
            Velto n’est pas un produit.  
            C’est une création.  
            Une œuvre.  
            Un compagnon pour les marchands.
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
