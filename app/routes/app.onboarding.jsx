// app/routes/app.onboarding.jsx

import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { requireUserId } from "~/session.server";

// IMPORTANT : on utilise les modèles, pas Prisma directement
import { getAllPartnerOffers } from "~/models/iaPartners.server";
import { getAllRewards } from "~/models/iaRewards.server";

export async function loader({ request }) {
  const userId = await requireUserId(request);

  // Pour l’onboarding, on montre tout ce qui est disponible
  const partnerOffers = await getAllPartnerOffers();
  const rewards = await getAllRewards();

  return json({ partnerOffers, rewards });
}

export default function Onboarding() {
  const { partnerOffers, rewards } = useLoaderData();

  return (
    <div>
      <h1>Bienvenue dans Velto</h1>

      <h2>Offres partenaires disponibles</h2>
      <ul>
        {partnerOffers.map((offer) => (
          <li key={offer.id}>{offer.title}</li>
        ))}
      </ul>

      <h2>Récompenses IA disponibles</h2>
      <ul>
        {rewards.map((reward) => (
          <li key={reward.id}>{reward.title}</li>
        ))}
      </ul>
    </div>
  );
}
