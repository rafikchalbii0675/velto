import VeltoLayout from "~/components/velto/VeltoLayout";

export default function AboutVelto() {
  return (
    <VeltoLayout>
      <div style={{ padding: "32px", maxWidth: "900px", margin: "0 auto" }}>
        <h1 style={{ marginBottom: "24px" }}>À propos de Velto</h1>

        {/* INTRODUCTION */}
        <section style={sectionStyle}>
          <h2>Qu’est‑ce que Velto ?</h2>
          <p style={pStyle}>
            Velto est un assistant intelligent conçu pour aider les marchands Shopify
            à analyser leur boutique, optimiser leurs produits, améliorer leur SEO,
            détecter les opportunités et automatiser leurs tâches grâce à l’IA.
          </p>
          <p style={pStyle}>
            Velto n’est pas une simple application. C’est un cerveau IA connecté à
            votre boutique, capable de comprendre vos données et de vous guider vers
            de meilleures décisions.
          </p>
        </section>

        {/* HISTOIRE */}
        <section style={sectionStyle}>
          <h2>L’histoire de Velto</h2>
          <p style={pStyle}>
            Velto est né d’un constat simple : les marchands Shopify manquent de temps,
            d’analyse et d’outils intelligents. Les applications existantes donnent des
            chiffres, mais aucune ne pense à la place du marchand.
          </p>
          <p style={pStyle}>
            Velto a été créé pour combler ce vide. Pour devenir un assistant IA capable
            d’analyser, proposer, optimiser et exécuter. Un assistant qui travaille
            24h/24 pour le marchand.
          </p>
        </section>

        {/* MISSION */}
        <section style={sectionStyle}>
          <h2>Notre mission</h2>
          <p style={pStyle}>
            Offrir aux marchands un assistant IA complet, simple, rapide et puissant,
            capable d’analyser leur boutique en temps réel et de proposer des actions
            concrètes pour augmenter les ventes, réduire les pertes et améliorer la
            performance globale.
          </p>
        </section>

        {/* VALEURS */}
        <section style={sectionStyle}>
          <h2>Nos valeurs</h2>
          <ul style={ulStyle}>
            <li><strong>Simplicité</strong> — Velto doit être facile à utiliser.</li>
            <li><strong>Intelligence</strong> — Velto doit analyser et comprendre.</li>
            <li><strong>Automatisation</strong> — Velto doit exécuter les tâches.</li>
            <li><strong>Performance</strong> — Velto doit augmenter les ventes.</li>
            <li><strong>Transparence</strong> — Velto doit expliquer ses actions.</li>
            <li><strong>Innovation</strong> — Velto doit toujours être en avance.</li>
          </ul>
        </section>

        {/* IA */}
        <section style={sectionStyle}>
          <h2>La force de l’IA Velto</h2>
          <p style={pStyle}>
            Velto analyse vos produits, vos ventes, votre stock, votre SEO et vos
            tendances internes. Il détecte les opportunités, propose des actions,
            envoie des notifications intelligentes et optimise automatiquement vos
            descriptions.
          </p>
          <p style={pStyle}>
            Velto ne se contente pas d’afficher des chiffres. Il vous dit quoi faire.
            Il vous guide. Il vous assiste. Il travaille pour vous.
          </p>
        </section>

        {/* ECO-IA */}
        <section style={sectionStyle}>
          <h2>Velto Eco‑IA : la vision</h2>
          <p style={pStyle}>
            Velto vise à devenir une alliance éco‑intelligente du commerce. Un système
            capable de suivre les tendances mondiales, les événements nationaux,
            les opportunités dropshipping et les marchés internationaux.
          </p>
          <p style={pStyle}>
            À long terme, Velto deviendra un assistant IA mondial, capable de connecter
            les marchands aux tendances TikTok, Meta, Google Trends, Amazon, AliExpress
            et aux événements internationaux comme le Ramadan, Diwali ou le Nouvel an
            chinois.
          </p>
        </section>

        {/* ABONNEMENTS */}
        <section style={sectionStyle}>
          <h2>Les plans Velto</h2>

          <div style={card}>
            <h3>Velto Free</h3>
            <p style={pStyle}>Analyse IA interne, SEO simple, notifications IA internes.</p>
          </div>

          <div style={card}>
            <h3>Velto Pro — 49,99$/mois</h3>
            <p style={pStyle}>
              SEO IA avancé, campagnes IA TikTok/Meta/Instagram, événements nationaux,
              booster IA produits, optimisation IA automatique.
            </p>
          </div>

          <div style={card}>
            <h3>Velto Premium — 74,99$/mois</h3>
            <p style={pStyle}>
              Analyse du marché mondial, tendances IA, opportunités dropshipping,
              campagnes IA automatiques, SEO IA événementiel, crypto API avancée.
            </p>
          </div>
        </section>

        {/* CONTACT */}
        <section style={sectionStyle}>
          <h2>Support & Contact</h2>
          <p style={pStyle}>
            Pour toute question ou assistance, notre équipe Velto est disponible pour
            vous accompagner.
          </p>
        </section>
      </div>
    </VeltoLayout>
  );
}

/* STYLES */
const sectionStyle = { marginBottom: "40px" };
const pStyle = { marginTop: "8px", lineHeight: "1.6" };
const ulStyle = { marginTop: "12px", lineHeight: "1.8" };

const card = {
  background: "#fff",
  padding: "20px",
  borderRadius: "12px",
  marginTop: "16px",
  border: "1px solid #e0d8d1"
};
