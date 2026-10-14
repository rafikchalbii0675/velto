// app/routes/app.marketplace.jsx

import { useLoaderData, Link } from "@remix-run/react";
import { json } from "@remix-run/node";
import { requireUserId } from "~/session.server";

// IMPORTANT : on utilise les modèles, pas Prisma directement
import { getPartnerOffersForLevel } from "~/models/iaPartners.server";
import { getRewardsForLevel } from "~/models/iaRewards.server";

export async function loader({ request }) {
  const userId = await requireUserId(request);

  // Exemple : niveau IA du user (à adapter selon ton système)
  const level = 1;

  const partnerOffers = await getPartnerOffersForLevel(level);
  const rewards = await getRewardsForLevel(level);

  return json({ partnerOffers, rewards });
}

export default function Marketplace() {
  const { partnerOffers, rewards } = useLoaderData();

  return (
    <div>
      <h1>Marketplace IA</h1>

      <h2>Offres partenaires</h2>
      <ul>
        {partnerOffers.map((offer) => (
          <li key={offer.id}>
            <Link to={offer.link}>{offer.title}</Link>
          </li>
        ))}
      </ul>

      <h2>Récompenses IA</h2>
      <ul>
        {rewards.map((reward) => (
          <li key={reward.id}>{reward.title}</li>
        ))}
      </ul>
    </div>
  );
}
