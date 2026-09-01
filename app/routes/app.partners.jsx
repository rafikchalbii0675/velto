// app/routes/app.partners.jsx

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
      partners: [],
    });
  }

  // Exemple : récupérer des partenaires
  const partners = await prisma.partner.findMany({
    where: { shopId: shop.id },
    orderBy: { createdAt: "desc" },
  });

  return json({
    shopFound: true,
    partners,
  });
}

export default function Partners() {
  const { shopFound, partners } = useLoaderData();

  if (!shopFound) {
    return <p>Aucun shop trouvé pour cet utilisateur.</p>;
  }

  return (
    <div>
      <h1>Partenaires</h1>
      {partners.length === 0 ? (
        <p>Aucun partenaire pour le moment.</p>
      ) : (
        <ul>
          {partners.map((p) => (
            <li key={p.id}>{p.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
