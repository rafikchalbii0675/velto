// app/routes/owner.dashboard.jsx

import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { requireUserId } from "~/session.server";

// IMPORTANT : on utilise les modèles, pas Prisma directement
import { getAllPartnerOffers } from "~/models/iaPartners.server";
import { getAllRewards } from "~/models/iaRewards.server";

export async function loader({ request }) {
  const userId = await requireUserId(request);

  // Le owner voit tout : toutes les offres + toutes les récompenses
  const partnerOffers = await getAllPartnerOffers();
  const rewards = await getAllRewards();

  return json({ partnerOffers, rewards });
}

export default function OwnerDashboard() {
  const { partnerOffers, rewards } = useLoaderData();

  return (
    <div>
      <h1>Dashboard Owner</h1>

      <h2>Toutes les offres partenaires</h2>
      <ul>
        {partnerOffers.map((offer) => (
          <li key={offer.id}>{offer.title}</li>
        ))}
      </ul>

      <h2>Toutes les récompenses IA</h2>
      <ul>
        {rewards.map((reward) => (
          <li key={reward.id}>{reward.title}</li>
        ))}
      </ul>
    </div>
  );
}
