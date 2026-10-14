import VeltoLayout from "../components/velto/VeltoLayout";

export default function AI() {
  return (
    <VeltoLayout title="Velto AI Engine • Comment ça marche">
      <div style={pageContainer}>

        {/*  INTRO */}
        <div style={introCard}>
          <h2 style={sectionTitle}>Le moteur IA Cozy Warm</h2>
          <p style={sectionText}>
            Velto utilise un moteur d’intelligence artificielle conçu pour analyser vos produits, 
            vos clients, vos tendances et vos saisons afin de créer des promotions intelligentes 
            et cohérentes avec votre boutique.  
            Cette page explique comment fonctionne l’IA Cozy Warm.
          </p>
        </div>

        {/*  ARCHITECTURE */}
        <div style={cardPremium}>
          <h3 style={sectionTitle}>Architecture IA</h3>
          <p style={sectionText}>
            Le moteur IA Cozy Warm repose sur quatre piliers principaux :
          </p>

          <ul style={listStyle}>
            <li> <strong>Analyse produits</strong> — ventes, popularité, faiblesse</li>
            <li> <strong>Analyse clients</strong> — nouveaux, VIP, inactifs</li>
            <li> <strong>Analyse saisonnière</strong> — Noël, Automne, Été, Printemps</li>
            <li> <strong>Analyse dynamique</strong> — tendances du jour et de la semaine</li>
          </ul>

          <p style={sectionText}>
            Ces quatre modules travaillent ensemble pour générer des promotions intelligentes 
            et adaptées à votre boutique.
          </p>
        </div>

        {/*  COMMENT L’IA DÉCIDE */}
        <div style={cardPremium}>
          <h3 style={sectionTitle}>Comment l’IA prend ses décisions</h3>

          <p style={sectionText}>
            L’IA Cozy Warm suit un processus clair et transparent :
          </p>

          <ol style={orderedList}>
            <li>Analyse des données produits et clients</li>
            <li>Détection des opportunités (produits faibles, VIP, saison)</li>
            <li>Création d’une stratégie Cozy Warm</li>
            <li>Génération d’une promotion IA</li>
            <li>Enregistrement dans les logs Velto</li>
          </ol>

          <p style={sectionText}>
            Chaque décision IA est enregistrée dans la page <strong>Historique IA</strong> 
            pour une transparence totale.
          </p>
        </div>

        {/*  MODULES IA */}
        <div style={cardPremium}>
          <h3 style={sectionTitle}>Modules IA actifs</h3>

          <ul style={listStyle}>
            <li> <strong>Promotions IA</strong> — création automatique de promotions</li>
            <li> <strong>Dashboard IA</strong> — analyse produits & clients</li>
            <li> <strong>Crypto IA</strong> — analyse BTC, ETH, SOL, MATIC</li>
            <li> <strong>Saisonnier IA</strong> — promotions selon la saison</li>
            <li> <strong>Dynamique IA</strong> — tendances du jour et de la semaine</li>
          </ul>
        </div>

        {/*  POURQUOI COZY WARM */}
        <div style={cardPremium}>
          <h3 style={sectionTitle}>Pourquoi “Cozy Warm” ?</h3>
          <p style={sectionText}>
            L’IA Cozy Warm n’est pas une IA froide ou agressive.  
            Elle est conçue pour être :
          </p>

          <ul style={listStyle}>
            <li> douce</li>
            <li> humaine</li>
            <li> esthétique</li>
            <li> orientée résultats</li>
            <li> respectueuse du client</li>
          </ul>

          <p style={sectionText}>
            Elle aide le marchand à prendre de meilleures décisions sans jamais imposer 
            une stratégie agressive.
          </p>
        </div>

        {/*  TRANSPARENCE */}
        <div style={cardPremium}>
          <h3 style={sectionTitle}>Transparence IA</h3>
          <p style={sectionText}>
            Velto enregistre toutes les actions IA dans la page <strong>Logs / Historique IA</strong>.  
            Vous pouvez voir :
          </p>

          <ul style={listStyle}>
            <li>• Les promotions créées</li>
            <li>• Les analyses effectuées</li>
            <li>• Les décisions IA</li>
            <li>• Les modules utilisés</li>
            <li>• L’impact sur votre boutique</li>
          </ul>

          <p style={sectionText}>
            Cette transparence est essentielle pour la confiance et pour la qualité Cozy Warm.
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

const orderedList = {
  fontSize: "17px",
  color: "#3a2f28",
  lineHeight: "1.8",
  paddingLeft: "20px",
};
