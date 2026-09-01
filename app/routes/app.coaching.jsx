// app/routes/app.coaching.jsx

import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { requireUserId } from "~/session.server";

// IMPORTANT : alias "~" interdit → chemin relatif obligatoire
import { prisma } from "../db.server";

export async function loader({ request }) {
  const userId = await requireUserId(request);

  // Récupérer le shop du propriétaire
  const shop = await prisma.shop.findUnique({
    where: { ownerId: userId },
  });

  if (!shop) {
    return json({
      shopFound: false,
      coaching: null,
    });
  }

  // Exemple : récupérer des données de coaching IA
  const coaching = {
    recommendedActions: [
      "Optimiser les promotions",
      "Analyser les produits à faible conversion",
      "Améliorer les descriptions",
    ],
    points: shop.points,
  };

  return json({
    shopFound: true,
    coaching,
  });
}

export default function Coaching() {
  const { shopFound, coaching } = useLoaderData();

  if (!shopFound) {
    return <p>Aucun shop trouvé pour cet utilisateur.</p>;
  }

  return (
    <div>
      <h1>Coaching IA</h1>
      <p>Points actuels : {coaching.points}</p>

      <h2>Actions recommandées :</h2>
      <ul>
        {coaching.recommendedActions.map((action, i) => (
          <li key={i}>{action}</li>
        ))}
      </ul>
    </div>
  );
}
