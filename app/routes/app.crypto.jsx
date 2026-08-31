import VeltoLayout from "../components/velto/VeltoLayout";

/* ⭐ Fake Data Crypto (à remplacer plus tard par API réelle) */
const cryptoData = {
  btc: { price: 64200, change24h: 2.4, trend: "up" },
  eth: { price: 3200, change24h: -1.2, trend: "down" },
  sol: { price: 148, change24h: 4.8, trend: "up" },
  matic: { price: 0.78, change24h: -0.4, trend: "neutral" },
};

/* ⭐ IA Crypto */
function cryptoAI(cryptoData) {
  const btc = cryptoData.btc;
  const eth = cryptoData.eth;
  const sol = cryptoData.sol;

  let message = `
Analyse IA Crypto Cozy Warm :

• Bitcoin : ${btc.change24h}% (tendance ${btc.trend})
• Ethereum : ${eth.change24h}% (tendance ${eth.trend})
• Solana : ${sol.change24h}% (tendance ${sol.trend})

Stratégie Cozy Warm :
- Surveiller Bitcoin pour les paiements crypto
- Ethereum idéal pour les transactions stables
- Solana recommandé pour les micro‑paiements rapides
`;

  return message;
}

/* ⭐ Recommandations IA Crypto */
function cryptoRecommendations(cryptoData) {
  return `
Recommandations Cozy Warm Crypto :

• Activer les paiements BTC si la tendance reste positive
• Proposer des réductions ETH pour les clients technophiles
• Utiliser Solana pour les paiements rapides (coût faible)
• Surveiller les tokens en baisse pour opportunités de cashback
`;
}

export default function Crypto() {
  const aiMessage = cryptoAI(cryptoData);
  const recoMessage = cryptoRecommendations(cryptoData);

  return (
    <VeltoLayout title="Crypto‑commerce Premium">
      <div style={pageContainer}>

        {/* ⭐ GRID CRYPTO */}
        <div style={cryptoGrid}>

          {/* BTC */}
          <div style={cryptoCard}>
            <h3 style={cryptoTitle}>Bitcoin (BTC)</h3>
            <p style={cryptoPrice}>{cryptoData.btc.price}$</p>
            <p style={cryptoChange(cryptoData.btc.change24h)}>
              {cryptoData.btc.change24h}% / 24h
            </p>
          </div>

          {/* ETH */}
          <div style={cryptoCard}>
            <h3 style={cryptoTitle}>Ethereum (ETH)</h3>
            <p style={cryptoPrice}>{cryptoData.eth.price}$</p>
            <p style={cryptoChange(cryptoData.eth.change24h)}>
              {cryptoData.eth.change24h}% / 24h
            </p>
          </div>

          {/* SOL */}
          <div style={cryptoCard}>
            <h3 style={cryptoTitle}>Solana (SOL)</h3>
            <p style={cryptoPrice}>{cryptoData.sol.price}$</p>
            <p style={cryptoChange(cryptoData.sol.change24h)}>
              {cryptoData.sol.change24h}% / 24h
            </p>
          </div>

          {/* MATIC */}
          <div style={cryptoCard}>
            <h3 style={cryptoTitle}>Polygon (MATIC)</h3>
            <p style={cryptoPrice}>{cryptoData.matic.price}$</p>
            <p style={cryptoChange(cryptoData.matic.change24h)}>
              {cryptoData.matic.change24h}% / 24h
            </p>
          </div>

        </div>

        {/* ⭐ Analyse IA */}
        <div style={cardPremium}>
          <h3>Analyse IA Crypto Cozy Warm</h3>
          <p style={{ whiteSpace: "pre-line" }}>{aiMessage}</p>
        </div>

        {/* ⭐ Recommandations IA */}
        <div style={cardPremium}>
          <h3>Recommandations IA Crypto</h3>
          <p style={{ whiteSpace: "pre-line" }}>{recoMessage}</p>
        </div>

      </div>
    </VeltoLayout>
  );
}

/* ⭐ Styles Premium */
const pageContainer = {
  maxWidth: "1000px",
  margin: "0 auto",
  display: "flex",
  flexDirection: "column",
  gap: "35px",
};

const cryptoGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "25px",
};

const cryptoCard = {
  backgroundColor: "#f7f2ec",
  borderRadius: "14px",
  padding: "25px",
  border: "1px solid #c7a45a",
  boxShadow: "0 4px 10px rgba(0,0,0,0.12)",
  textAlign: "center",
};

const cryptoTitle = {
  fontSize: "18px",
  color: "#3a2f28",
  marginBottom: "10px",
};

const cryptoPrice = {
  fontSize: "28px",
  fontWeight: "700",
  color: "#3a2f28",
};

const cryptoChange = (value) => ({
  fontSize: "18px",
  fontWeight: "600",
  color: value > 0 ? "#2e7d32" : value < 0 ? "#c62828" : "#3a2f28",
});

const cardPremium = {
  backgroundColor: "#faf6f0",
  borderRadius: "14px",
  padding: "25px",
  border: "1px solid #c7a45a",
  boxShadow: "0 4px 10px rgba(0,0,0,0.12)",
  color: "#3a2f28",
};
