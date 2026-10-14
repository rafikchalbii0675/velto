// app/routes/owner.control.jsx

import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { requireUserId } from "~/session.server";

// IMPORTANT : alias "~" interdit  chemin relatif obligatoire
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
      owner: null,
    });
  }

  return json({
    shopFound: true,
    owner: {
      id: shop.id,
      name: shop.name,
      points: shop.points,
      createdAt: shop.createdAt,
    },
  });
}

export default function OwnerControl() {
  const { shopFound, owner } = useLoaderData();

  if (!shopFound) {
    return <p>Aucun shop trouvé pour cet utilisateur.</p>;
  }

  return (
    <div>
      <h1>Contrôle du propriétaire</h1>
      <p>Nom du shop : {owner.name}</p>
      <p>ID : {owner.id}</p>
      <p>Points : {owner.points}</p>
      <p>Créé le : {new Date(owner.createdAt).toLocaleDateString()}</p>
    </div>
  );
}
