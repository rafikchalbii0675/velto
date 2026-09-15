import VeltoLayout from "~/components/velto/VeltoLayout";

export default function VeltoNotifications() {
  return (
    <VeltoLayout>
      <div style={{ padding: "32px", maxWidth: "900px", margin: "0 auto" }}>
        <h1 style={{ marginBottom: "24px" }}>Notifications IA</h1>

        <section style={sectionStyle}>
          <h2>Notifications actives</h2>
          <p style={pStyle}>
            Ces notifications IA sont déjà fonctionnelles et basées sur les données de votre boutique Shopify.
          </p>

          <div style={card}>
            <h3>Stock critique</h3>
            <p style={pStyle}>Velto vous avertit lorsque un produit approche de la rupture.</p>
          </div>

          <div style={card}>
            <h3>SEO faible</h3>
            <p style={pStyle}>Velto détecte les descriptions à optimiser pour améliorer votre visibilité.</p>
          </div>

          <div style={card}>
            <h3>Produits en hausse</h3>
            <p style={pStyle}>Velto vous informe des produits qui commencent à performer.</p>
          </div>

          <div style={card}>
            <h3>Produits à booster</h3>
            <p style={pStyle}>Velto identifie les produits avec un potentiel immédiat.</p>
          </div>
        </section>

        <section style={sectionStyle}>
          <h2>Notifications IA avancées (Pro)</h2>
          <p style={pStyle}>
            Ces modules seront activés lorsque vous passerez à Velto Pro.
          </p>

          <div style={cardDisabled}>
            <h3>Opportunités IA</h3>
            <p style={pStyle}>Détection des opportunités internes et recommandations IA.</p>
          </div>

          <div style={cardDisabled}>
            <h3>Campagnes IA recommandées</h3>
            <p style={pStyle}>Suggestions IA pour TikTok, Meta et Instagram.</p>
          </div>

          <div style={cardDisabled}>
            <h3>Événements IA nationaux</h3>
            <p style={pStyle}>Alertes pour les fêtes commerciales (Fête des mères, Noël, etc.).</p>
          </div>
        </section>

        <section style={sectionStyle}>
          <h2>Notifications IA mondiales (Premium)</h2>
          <p style={pStyle}>
            Ces modules seront activés avec Velto Premium.
          </p>

          <div style={cardDisabled}>
            <h3>Tendances IA mondiales</h3>
            <p style={pStyle}>Analyse des tendances TikTok, Meta, Google Trends.</p>
          </div>

          <div style={cardDisabled}>
            <h3>Événements internationaux</h3>
            <p style={pStyle}>Ramadan, Diwali, Nouvel an chinois, Golden Week.</p>
          </div>

          <div style={cardDisabled}>
            <h3>Opportunités dropshipping IA</h3>
            <p style={pStyle}>Détection des niches et produits à potentiel global.</p>
          </div>
        </section>
      </div>
    </VeltoLayout>
  );
}

/* STYLES */
const sectionStyle = { marginBottom: "40px" };
const pStyle = { marginTop: "8px", lineHeight: "1.6" };

const card = {
  background: "#fff",
  padding: "20px",
  borderRadius: "12px",
  marginTop: "16px",
  border: "1px solid #e0d8d1"
};

const cardDisabled = {
  ...card,
  opacity: 0.5,
  pointerEvents: "none"
};
