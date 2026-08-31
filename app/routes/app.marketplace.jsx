import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { requireUserId } from "~/session.server";
import { prisma } from "~/db.server";
import { getPartnerOffersForLevel } from "~/models/iaPartners.server";
import { getRewardsForLevel } from "~/models/iaRewards.server";
import { getSuggestions } from "~/models/iaSuggestions.server";

export async function loader({ request }) {
  await requireUserId(request);

  const url = new URL(request.url);
  const shopId = url.searchParams.get("shop");

  const pointsData = await prisma.iAPoints.findUnique({ where: { shopId } });

  const rewards = await getRewardsForLevel(pointsData.level);
  const offers = await getPartnerOffersForLevel(pointsData.level);
  const suggestions = getSuggestions(pointsData.level);

  return json({ pointsData, rewards, offers, suggestions });
}

export default function Marketplace() {
  const { pointsData, rewards, offers, suggestions } = useLoaderData();

  return (
    <div className="dashboard-ia">
      <h1>Marketplace IA Velto</h1>
      <p>Modules IA, Récompenses Premium, Offres Partenaires et Extensions IA.</p>

      {/* Points & Niveau */}
      <section className="market-section">
        <h2>Niveau actuel : {pointsData.level.toUpperCase()}</h2>
        <p><strong>{pointsData.points}</strong> points IA</p>
        <p>Progression : <strong>{pointsData.progress}%</strong></p>
      </section>

      {/* Récompenses Premium */}
      <section className="market-section">
        <h2>🎁 Récompenses Premium</h2>
        {rewards.length === 0 && <p>Aucune récompense débloquée pour ce niveau.</p>}
        {rewards.map((r) => (
          <div key={r.id} className="market-item">
            <h3>{r.title}</h3>
            <p>{r.description}</p>
          </div>
        ))}
      </section>

      {/* Offres Partenaires */}
      <section className="market-section">
        <h2>🤝 Offres Partenaires</h2>
        {offers.length === 0 && <p>Aucune offre partenaire disponible pour ce niveau.</p>}
        {offers.map((o) => (
          <div key={o.id} className="market-item">
            <h3>{o.title}</h3>
            <p>{o.description}</p>
            <p><strong>Partenaire :</strong> {o.partner.name}</p>
          </div>
        ))}
      </section>

      {/* Suggestions IA */}
      <section className="market-section">
        <h2>💡 Suggestions IA pour progresser</h2>
        {suggestions.map((s, i) => (
          <p key={i}>• {s}</p>
        ))}
      </section>

      {/* Modules IA */}
      <section className="market-section">
        <h2>⚙️ Modules IA Velto</h2>
        <div className="market-item">
          <h3>IA Vision</h3>
          <p>Analyse des images produits, détection flou, cadrage, luminosité.</p>
          <Link to="/app.ai.vision">Accéder</Link>
        </div>

        <div className="market-item">
          <h3>IA Auto‑Pilot</h3>
          <p>Optimisation automatique, sécurité crypto, alertes IA.</p>
          <Link to="/app.ai.autopilot">Accéder</Link>
        </div>

        <div className="market-item">
          <h3>IA Points & Récompenses</h3>
          <p>Progression, niveaux, récompenses premium.</p>
          <Link to="/app.ai.points">Accéder</Link>
        </div>

        <div className="market-item">
          <h3>IA Partenaires</h3>
          <p>Offres partenaires, négociation IA, récompenses premium.</p>
          <Link to="/app.partners">Accéder</Link>
        </div>
      </section>
    </div>
  );
}
