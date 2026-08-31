import VeltoLayout from "../components/velto/VeltoLayout";

export default function Team() {
  return (
    <VeltoLayout title="Velto Team • Studio Cozy">
      <div style={pageContainer}>

        {/* ⭐ INTRO */}
        <div style={introCard}>
          <h2 style={sectionTitle}>Derrière Velto</h2>
          <p style={sectionText}>
            Velto n’est pas seulement une application.  
            C’est une création née dans Studio Cozy, un espace où le design, la technologie 
            et l’émotion se rencontrent.  
            Voici l’équipe, la vision et l’esprit derrière Velto.
          </p>
        </div>

        {/* ⭐ FONDATEUR */}
        <div style={cardPremium}>
          <h3 style={sectionTitle}>Le créateur</h3>
          <p style={sectionText}>
            Velto est imaginé et développé par un créateur passionné de design, d’art, 
            d’innovation et d’expérience utilisateur.  
            Chaque détail — couleur, mot, analyse IA, ambiance — est choisi avec intention.
          </p>

          <p style={sectionText}>
            Le créateur de Velto croit que la technologie doit être douce, élégante, humaine.  
            Velto est l’expression de cette vision Cozy Warm Or.
          </p>
        </div>

        {/* ⭐ STUDIO COZY */}
        <div style={cardPremium}>
          <h3 style={sectionTitle}>Studio Cozy</h3>
          <p style={sectionText}>
            Studio Cozy est un atelier créatif où naissent des projets élégants, chaleureux 
            et inspirés.  
            L’objectif : créer des outils qui ne sont pas seulement utiles, mais qui ont une âme.
          </p>

          <ul style={listStyle}>
            <li>🎨 Design élégant</li>
            <li>💛 Ambiance Cozy Warm</li>
            <li>🧠 Intelligence douce</li>
            <li>📈 Vision long terme</li>
            <li>🌿 Respect du marchand</li>
          </ul>
        </div>

        {/* ⭐ PHILOSOPHIE */}
        <div style={cardPremium}>
          <h3 style={sectionTitle}>Philosophie de création</h3>
          <p style={sectionText}>
            Velto est créé avec une philosophie simple :
          </p>

          <ul style={listStyle}>
            <li>🌿 La technologie doit être douce</li>
            <li>💛 Le design doit être chaleureux</li>
            <li>🎨 L’expérience doit être élégante</li>
            <li>📈 L’IA doit être compréhensible</li>
            <li>🤝 Le marchand doit se sentir accompagné</li>
          </ul>

          <p style={sectionText}>
            Velto n’est pas une IA froide.  
            C’est une IA Cozy Warm, pensée pour aider, pas pour imposer.
          </p>
        </div>

        {/* ⭐ MISSION */}
        <div style={cardPremium}>
          <h3 style={sectionTitle}>Notre mission</h3>
          <p style={sectionText}>
            Aider les marchands à vendre mieux, avec élégance, intelligence et simplicité.  
            Offrir une expérience qui ne ressemble à aucune autre application Shopify.
          </p>
        </div>

        {/* ⭐ MESSAGE */}
        <div style={cardPremium}>
          <h3 style={sectionTitle}>Message du créateur</h3>
          <p style={sectionText}>
            Velto est un projet que je fais grandir avec soin, intention et respect.  
            Je veux qu’il devienne un compagnon pour les marchands,  
            un assistant qui comprend, qui aide, qui inspire.
          </p>

          <p style={sectionText}>
            Merci d’être ici,  
            merci de faire partie de l’histoire Cozy Warm Or.
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
