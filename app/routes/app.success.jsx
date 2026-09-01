// app/routes/app.success.jsx

import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { requireUserId } from "~/session.server";

// IMPORTANT : alias "~" interdit → chemin relatif obligatoire
import { prisma } from "../db.server";

export async function loader({ request }) {
  const userId = await requireUserId(request);

  const shop = await prisma.shop.findUnique({
    where: { ownerId: userId },
  });

  if (!shop) {
    return json({
      shopFound: false,
      success: null,
    });
  }

  return json({
    shopFound: true,
    success: {
      name: shop.name,
      points: shop.points,
      createdAt: shop.createdAt,
    },
  });
}

export default function Success() {
  const { shopFound, success } = useLoaderData();

  if (!shopFound) {
    return <p>Aucun shop trouvé pour cet utilisateur.</p>;
  }

  return (
    <div>
      <h1>Succès !</h1>
      <p>Votre shop <strong>{success.name}</strong> a été créé avec succès.</p>
      <p>Points : {success.points}</p>
      <p>Créé le : {new Date(success.createdAt).toLocaleDateString()}</p>
    </div>
  );
}
