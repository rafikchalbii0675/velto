// app/routes/app.security.jsx

import { Form, useLoaderData, useActionData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { requireUserId } from "~/session.server";

// IMPORTANT : alias "~" interdit  chemin relatif obligatoire
import { prisma } from "../db.server";

export async function loader({ request }) {
  const userId = await requireUserId(request);

  const shop = await prisma.shop.findUnique({
    where: { ownerId: userId },
  });

  if (!shop) {
    return json({
      shopFound: false,
      security: null,
    });
  }

  return json({
    shopFound: true,
    security: {
      owner: shop.ownerId,
      createdAt: shop.createdAt,
      points: shop.points,
    },
  });
}

export default function Security() {
  const { shopFound, security } = useLoaderData();

  if (!shopFound) {
    return <p>Aucun shop trouvé pour cet utilisateur.</p>;
  }

  return (
    <div>
      <h1>Sécurité du compte</h1>
      <p>ID propriétaire : {security.owner}</p>
      <p>Créé le : {new Date(security.createdAt).toLocaleDateString()}</p>
      <p>Points : {security.points}</p>

      <Form method="post">
        <button type="submit">Mettre à jour la sécurité</button>
      </Form>
    </div>
  );
}
