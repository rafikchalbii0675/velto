import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { requireUserId } from "~/session.server";
import { prisma } from "~/db.server";

export async function loader({ request }) {
  await requireUserId(request);

  const url = new URL(request.url);
  const shopId = url.searchParams.get("shop");

  const wallet = await prisma.iAWallet.findUnique({ where: { shopId } });
  const transactions = await prisma.iATransaction.findMany({
    where: { shopId },
    orderBy: { createdAt: "desc" },
  });

  return json({ wallet, transactions });
}

export default function WalletIA() {
  const { wallet, transactions } = useLoaderData();

  return (
    <div className="dashboard-ia">
      <h1>IA Wallet — Portefeuille Intelligent</h1>

      <section className="wallet-box">
        <h2>Points IA : {wallet.points}</h2>
        <h2>Récompenses : {wallet.rewards}</h2>
      </section>

      <section className="transactions-box">
        <h2>Historique des transactions IA</h2>
        {transactions.map((t) => (
          <div key={t.id} className="transaction-item">
            <strong>{t.title}</strong>
            <p>Type : {t.type}</p>
            <p>Montant : {t.amount}</p>
            <p>Date : {new Date(t.createdAt).toLocaleString()}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
