import VeltoLayout from "~/components/velto/VeltoLayout";

export default function VeltoMarketIA() {
  return (
    <VeltoLayout>
      <div style={{ padding: "32px", maxWidth: "900px", margin: "0 auto" }}>
        <h1 style={{ marginBottom: "24px" }}>Tendances du Marché IA</h1>

        {/* SECTION 1 — TENDANCES INTERNES (ACTIVES) */}
        <section style={sectionStyle}>
          <h2>Tendances internes (Actives)</h2>
          <p style={pStyle}>
            Ces tendances IA sont basées sur les données internes de votre boutique Shopify.
            Elles sont déjà fonctionnelles dans la version actuelle de Velto.
          </p>

          <div style={card}>
            <h3>Produits en hausse</h3>
            <p style={pStyle}>
              Velto détecte les produits qui commencent à performer et vous recommande
              de les mettre en avant.
            </p>
          </div>

          <div style={card}>
            <h3>Produits à booster</h3>
            <p style={pStyle}>
              Velto identifie les produits avec un potentiel immédiat pour augmenter vos ventes.
            </p>
          </div>

          <div style={card}>
            <h3>Produits à optimiser</h3>
            <p style={pStyle}>
              Velto vous indique les produits qui peuvent être améliorés pour de meilleurs résultats.
            </p>
          </div>
        </section>

        {/* SECTION 2 — TENDANCES PRO (VISIBLE MAIS NON ACTIVE) */}
        <section style={sectionStyle}>
          <h2>Tendances IA avancées (Pro)</h2>
          <p style={pStyle}>
            Ces modules seront activés lorsque vous passerez à Velto Pro.
          </p>

          <div style={cardDisabled}>
            <h3>Tendances Shopify</h3>
            <p style={pStyle}>
              Analyse IA des tendances globales Shopify selon votre niche.
            </p>
          </div>

          <div style={cardDisabled}>
            <h3>Tendances TikTok Shop</h3>
            <p style={pStyle}>
              Détection des produits qui explosent sur TikTok Shop.
            </p>
          </div>

          <div style={cardDisabled}>
            <h3>Tendances Meta / Instagram</h3>
            <p style={pStyle}>
              Analyse IA des produits populaires sur Meta Ads et Instagram Reels.
            </p>
          </div>
        </section>

        {/* SECTION 3 — TENDANCES PREMIUM (VISIBLE MAIS NON ACTIVE) */}
        <section style={sectionStyle}>
          <h2>Tendances IA mondiales (Premium)</h2>
          <p style={pStyle}>
            Ces modules seront activés avec Velto Premium.
          </p>

          <div style={cardDisabled}>
            <h3>Google Trends IA</h3>
            <p style={pStyle}>
              Analyse IA des recherches mondiales pour détecter les opportunités.
            </p>
          </div>

          <div style={cardDisabled}>
            <h3>Tendances Amazon</h3>
            <p style={pStyle}>
              Détection IA des produits en croissance sur Amazon.
            </p>
          </div>

          <div style={cardDisabled}>
            <h3>Tendances AliExpress / Dropshipping</h3>
            <p style={pStyle}>
              Analyse IA des produits gagnants et niches en croissance dans le dropshipping.
            </p>
          </div>

          <div style={cardDisabled}>
            <h3>Opportunités IA globales</h3>
            <p style={pStyle}>
              Velto identifie les niches mondiales avec un potentiel élevé.
            </p>
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
