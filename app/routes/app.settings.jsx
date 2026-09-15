import VeltoLayout from "~/components/velto/VeltoLayout";

export default function VeltoSettings() {
  return (
    <VeltoLayout>
      <div style={{ padding: "32px", maxWidth: "900px", margin: "0 auto" }}>
        <h1 style={{ marginBottom: "24px" }}>Paramètres Velto</h1>

        {/* SECTION 1 — ABONNEMENT */}
        <section style={sectionStyle}>
          <h2>Abonnement & Paiement</h2>
          <p style={pStyle}>
            Gérez votre abonnement Velto. Les fonctionnalités avancées seront
            activées automatiquement selon votre plan.
          </p>

          <div style={card}>
            <h3>Plan actuel : Velto Free</h3>
            <p style={pStyle}>Accès aux fonctionnalités IA de base.</p>
            <button style={btnPrimary}>Passer à Velto Pro (49,99$/mois)</button>
            <button style={btnSecondary}>Passer à Velto Premium (74,99$/mois)</button>
          </div>
        </section>

        {/* SECTION 2 — IA */}
        <section style={sectionStyle}>
          <h2>Intelligence Artificielle</h2>
          <p style={pStyle}>
            Configurez les modules IA disponibles selon votre plan.
          </p>

          <div style={card}>
            <h3>Analyse IA interne (Active)</h3>
            <p style={pStyle}>Analyse des produits, stock, SEO et tendances internes.</p>
          </div>

          <div style={cardDisabled}>
            <h3>Analyse IA avancée (Pro)</h3>
            <p style={pStyle}>Analyse approfondie des performances et recommandations IA.</p>
          </div>

          <div style={cardDisabled}>
            <h3>Analyse IA du marché mondial (Premium)</h3>
            <p style={pStyle}>Tendances TikTok, Meta, Google Trends, Dropshipping.</p>
          </div>
        </section>

        {/* SECTION 3 — NOTIFICATIONS IA */}
        <section style={sectionStyle}>
          <h2>Notifications IA</h2>
          <p style={pStyle}>
            Recevez des alertes intelligentes selon les données de votre boutique.
          </p>

          <div style={card}>
            <h3>Notifications internes (Active)</h3>
            <p style={pStyle}>Stock, SEO, produits en hausse, produits à booster.</p>
          </div>

          <div style={cardDisabled}>
            <h3>Notifications IA avancées (Pro)</h3>
            <p style={pStyle}>Alertes IA sur les opportunités et campagnes recommandées.</p>
          </div>

          <div style={cardDisabled}>
            <h3>Notifications IA mondiales (Premium)</h3>
            <p style={pStyle}>Alertes IA sur les tendances internationales.</p>
          </div>
        </section>

        {/* SECTION 4 — ÉVÉNEMENTS IA */}
        <section style={sectionStyle}>
          <h2>Événements IA</h2>
          <p style={pStyle}>
            Velto suit les événements commerciaux pour vous aider à préparer vos campagnes.
          </p>

          <div style={cardDisabled}>
            <h3>Événements nationaux (Pro)</h3>
            <p style={pStyle}>Fête des mères, Noël, Black Friday, etc.</p>
          </div>

          <div style={cardDisabled}>
            <h3>Événements internationaux (Premium)</h3>
            <p style={pStyle}>Ramadan, Diwali, Nouvel an chinois, Golden Week.</p>
          </div>
        </section>

        {/* SECTION 5 — CAMPAGNES IA */}
        <section style={sectionStyle}>
          <h2>Campagnes IA</h2>
          <p style={pStyle}>
            Suggestions IA pour TikTok, Meta, Instagram selon vos produits.
          </p>

          <div style={cardDisabled}>
            <h3>Campagnes IA recommandées (Pro)</h3>
            <p style={pStyle}>Recommandations IA pour booster vos produits.</p>
          </div>

          <div style={cardDisabled}>
            <h3>Campagnes IA automatiques (Premium)</h3>
            <p style={pStyle}>Création automatique de campagnes IA multi‑plateformes.</p>
          </div>
        </section>

        {/* SECTION 6 — SEO IA */}
        <section style={sectionStyle}>
          <h2>SEO IA</h2>
          <p style={pStyle}>
            Optimisez vos descriptions produits grâce à l’IA.
          </p>

          <div style={card}>
            <h3>SEO IA simple (Active)</h3>
            <p style={pStyle}>Optimisation de base des descriptions.</p>
          </div>

          <div style={cardDisabled}>
            <h3>SEO IA avancé (Pro)</h3>
            <p style={pStyle}>Titres, tags, mots‑clés IA avancés.</p>
          </div>

          <div style={cardDisabled}>
            <h3>SEO IA événementiel (Premium)</h3>
            <p style={pStyle}>SEO optimisé selon les fêtes et tendances mondiales.</p>
          </div>
        </section>

        {/* SECTION 7 — CRYPTO API */}
        <section style={sectionStyle}>
          <h2>Crypto API</h2>
          <p style={pStyle}>
            Préparez votre boutique pour le commerce du futur.
          </p>

          <div style={cardDisabled}>
            <h3>Crypto API (Pro)</h3>
            <p style={pStyle}>USDC / ETH (bêta).</p>
          </div>

          <div style={cardDisabled}>
            <h3>Crypto API avancée (Premium)</h3>
            <p style={pStyle}>USDC, ETH, BTC, NFT Rewards, Cashback Crypto.</p>
          </div>
        </section>

        {/* SECTION 8 — INTERFACE */}
        <section style={sectionStyle}>
          <h2>Interface & Mode Nuit</h2>

          <div style={card}>
            <h3>Mode Nuit</h3>
            <p style={pStyle}>Activez le mode nuit pour une interface plus confortable.</p>
            <button style={btnPrimary}>Activer le mode nuit</button>
          </div>

          <div style={cardDisabled}>
            <h3>Mode Gold Edition (Pro)</h3>
            <p style={pStyle}>Interface premium pour les marchands avancés.</p>
          </div>
        </section>

        {/* SECTION 9 — À PROPOS */}
        <section style={sectionStyle}>
          <h2>À propos de Velto</h2>
          <p style={pStyle}>
            Découvrez l’histoire, la mission et la vision de Velto.
          </p>
          <a href="/app/about" style={btnPrimary}>Voir la page À propos</a>
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

const btnPrimary = {
  padding: "10px 16px",
  background: "#ff9900",
  color: "#fff",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  marginTop: "12px"
};

const btnSecondary = {
  padding: "10px 16px",
  background: "#4a3f35",
  color: "#fff",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  marginTop: "12px",
  marginLeft: "12px"
};
