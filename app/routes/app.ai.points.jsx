import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { requireUserId } from "~/session.server";
import { prisma } from "~/db.server";
import { getRewardsForLevel, getPartnerOffers } from "~/models/iaRewards.server";
import { getSuggestions } from "~/models/iaSuggestions.server";

export async function loader({ request }) {
  await requireUserId(request);

  const url = new URL(request.url);
  const shopId = url.searchParams.get("shop");

  const data = await prisma.iAPoints.findUnique({ where: { shopId } });

  const rewards = await getRewardsForLevel(data.level);
  const offers = await getPartnerOffers(data.level);
  const suggestions = getSuggestions(data.level);

  return json({ data, rewards, offers, suggestions });
}

export default function IAPoints() {
  const { data, rewards, offers, suggestions } = useLoaderData();

  return (
    <div className="dashboard-ia">
      <h1>Points & Récompenses IA</h1>

      <section className="points-box">
        <h2>Niveau : {data.level.toUpperCase()}</h2>
        <p>{data.points} points</p>
        <p>Progression : {data.progress}%</p>
      </section>

      <section className="rewards-box">
        <h2>Récompenses débloquées</h2>
        {rewards.map((r) => (
          <div key={r.id} className="reward-item">
            <strong>{r.title}</strong>
            <p>{r.description}</p>
          </div>
        ))}
      </section>

      <section className="offers-box">
        <h2>Offres partenaires</h2>
        {offers.map((o) => (
          <div key={o.id} className="offer-item">
            <strong>{o.partnerName}</strong>
            <p>{o.offerTitle}</p>
          </div>
        ))}
      </section>

      <section className="suggestions-box">
        <h2>Suggestions IA pour progresser</h2>
        {suggestions.map((s, i) => (
          <p key={i}>{s}</p>
        ))}
      </section>
    </div>
  );
}
