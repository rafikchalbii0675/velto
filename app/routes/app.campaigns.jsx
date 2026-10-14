import VeltoLayout from "~/components/velto/VeltoLayout";

export default function VeltoCampaignsIA() {
  return (
    <VeltoLayout>
      <div style={{ padding: "32px", maxWidth: "900px", margin: "0 auto" }}>
        <h1 style={{ marginBottom: "24px" }}>Campagnes IA</h1>

        {/* SECTION 1 — CAMPAGNES ACTIVES (FREE) */}
        <section style={sectionStyle}>
          <h2>Campagnes IA internes (Actives)</h2>
          <p style={pStyle}>
            Ces recommandations IA sont basées sur les données internes de votre boutique Shopify.
            Elles sont déjà fonctionnelles dans la version actuelle de Velto.
          </p>

          <div style={card}>
            <h3>Produits à mettre en avant</h3>
            <p style={pStyle}>
              Velto identifie les produits qui ont un potentiel immédiat pour une campagne.
            </p>
          </div>

          <div style={card}>
            <h3>Recommandations IA simples</h3>
            <p style={pStyle}>
              Velto vous propose des idées de campagnes basées sur vos produits en hausse.
            </p>
          </div>
        </section>

        {/* SECTION 2 — CAMPAGNES PRO (VISIBLE MAIS NON ACTIVE) */}
        <section style={sectionStyle}>
          <h2>Campagnes IA avancées (Pro)</h2>
          <p style={pStyle}>
            Ces modules seront activés lorsque vous passerez à Velto Pro.
          </p>

          <div style={cardDisabled}>
            <h3>Campagnes TikTok IA</h3>
            <p style={pStyle}>
              Recommandations IA pour créer des vidéos TikTok optimisées : hooks, hashtags,
              musiques tendances et produits à booster.
            </p>
          </div>

          <div style={cardDisabled}>
            <h3>Campagnes Meta IA</h3>
            <p style={pStyle}>
              Suggestions IA pour Facebook Ads et Instagram Ads : audiences, formats,
              textes IA et visuels recommandés.
            </p>
          </div>

          <div style={cardDisabled}>
            <h3>Campagnes Instagram Reels IA</h3>
            <p style={pStyle}>
              Recommandations IA pour créer des Reels performants basés sur les tendances actuelles.
            </p>
          </div>
        </section>

        {/* SECTION 3 — CAMPAGNES PREMIUM (VISIBLE MAIS NON ACTIVE) */}
        <section style={sectionStyle}>
          <h2>Campagnes IA automatiques (Premium)</h2>
          <p style={pStyle}>
            Ces modules seront activés avec Velto Premium.
          </p>

          <div style={cardDisabled}>
            <h3>Campagnes IA multi‑plateformes</h3>
            <p style={pStyle}>
              Velto génère automatiquement des campagnes pour TikTok, Meta, Instagram et Google Ads.
            </p>
          </div>

          <div style={cardDisabled}>
            <h3>Audience IA automatique</h3>
            <p style={pStyle}>
              Velto sélectionne automatiquement les audiences les plus performantes selon votre niche.
            </p>
          </div>

          <div style={cardDisabled}>
            <h3>Budget IA automatique</h3>
            <p style={pStyle}>
              Velto calcule le budget optimal pour maximiser les résultats de vos campagnes.
            </p>
          </div>

          <div style={cardDisabled}>
            <h3>Optimisation IA continue</h3>
            <p style={pStyle}>
              Velto ajuste automatiquement vos campagnes selon les performances en temps réel.
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
