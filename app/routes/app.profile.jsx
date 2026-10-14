// app/routes/app.profile.jsx

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
      profile: null,
    });
  }

  return json({
    shopFound: true,
    profile: {
      name: shop.name,
      points: shop.points,
      createdAt: shop.createdAt,
    },
  });
}

export default function Profile() {
  const { shopFound, profile } = useLoaderData();

  if (!shopFound) {
    return <p>Aucun shop trouvé pour cet utilisateur.</p>;
  }

  return (
    <div>
      <h1>Profil du shop</h1>
      <p>Nom : {profile.name}</p>
      <p>Points : {profile.points}</p>
      <p>Créé le : {new Date(profile.createdAt).toLocaleDateString()}</p>

      <Form method="post">
        <button type="submit">Mettre à jour le profil</button>
      </Form>
    </div>
  );
}
