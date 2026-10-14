// app/routes/app.ai.points.jsx

import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { requireUserId } from "~/session.server";

// IMPORTANT : alias "~" interdit  chemin relatif obligatoire
import { prisma } from "../db.server";

export async function loader({ request }) {
  const userId = await requireUserId(request);

  // Récupérer les points du shop
  const shop = await prisma.shop.findUnique({
    where: { ownerId: userId },
  });

  if (!shop) {
    return json({
      points: 0,
      shopFound: false,
    });
  }

  return json({
    points: shop.points,
    shopFound: true,
  });
}

export default function AiPoints() {
  const { points, shopFound } = useLoaderData();

  if (!shopFound) {
    return <p>Aucun shop trouvé pour cet utilisateur.</p>;
  }

  return (
    <div>
      <h1>Points IA</h1>
      <p>Total des points : {points}</p>
    </div>
  );
}
