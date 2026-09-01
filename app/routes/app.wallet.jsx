// app/routes/app.wallet.jsx

import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { requireUserId } from "~/session.server";

// IMPORTANT : alias "~" interdit → chemin relatif obligatoire
import { prisma } from "../db.server";

export async function loader({ request }) {
  const userId = await requireUserId(request);

  const shop = await prisma.shop.findUnique({
    where: { ownerId: userId },
    include: {
      transactions: true,
    },
  });

  if (!shop) {
    return json({
      shopFound: false,
      wallet: null,
    });
  }

  return json({
    shopFound: true,
    wallet: {
      points: shop.points,
      transactions: shop.transactions,
    },
  });
}

export default function Wallet() {
  const { shopFound, wallet } = useLoaderData();

  if (!shopFound) {
    return <p>Aucun shop trouvé pour cet utilisateur.</p>;
  }

  return (
    <div>
      <h1>Wallet</h1>
      <p>Points : {wallet.points}</p>

      <h2>Transactions</h2>
      {wallet.transactions.length === 0 ? (
        <p>Aucune transaction.</p>
      ) : (
        <ul>
          {wallet.transactions.map((t) => (
            <li key={t.id}>
              {t.type} — {t.amount} points — {new Date(t.createdAt).toLocaleDateString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
