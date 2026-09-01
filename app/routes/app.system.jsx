// app/routes/app.system.jsx

import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { requireUserId } from "~/session.server";

// IMPORTANT : importer le module serveur dans le loader (serveur)
import { getSystemStatus } from "~/models/system.server";

export async function loader({ request }) {
  const userId = await requireUserId(request);

  const result = await getSystemStatus(userId);

  return json(result);
}

export default function System() {
  const { shopFound, system } = useLoaderData();

  if (!shopFound) {
    return <p>Aucun shop trouvé pour cet utilisateur.</p>;
  }

  return (
    <div>
      <h1>Système</h1>
      <p>Nom : {system.name}</p>
      <p>Points : {system.points}</p>
      <p>Logs : {system.logsCount}</p>
      <p>Produits : {system.productsCount}</p>
      <p>Promotions : {system.promotionsCount}</p>
      <p>Créé le : {new Date(system.createdAt).toLocaleDateString()}</p>
    </div>
  );
}
