// app/routes/crypto.wallet.tsx
import { json } from "@remix-run/node";
import { useLoaderData, Form } from "@remix-run/react";
import { getWalletBalance } from "~/services/crypto.server";

export async function loader() {
  const balance = await getWalletBalance();
  return json({ balance });
}

export default function CryptoWallet() {
  const { balance } = useLoaderData();

  return (
    <div style={{ padding: 20 }}>
      <h1>Velto Wallet</h1>
      <p>Solde du wallet : {balance} ETH</p>

      <h2>Envoyer une transaction</h2>
      <Form method="post">
        <input name="to" placeholder="Adresse du destinataire" />
        <input name="amount" placeholder="Montant en ETH" />
        <button type="submit">Envoyer</button>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const form = await request.formData();
  const to = form.get("to") as string;
  const amount = form.get("amount") as string;

  return json({ ok: true, to, amount });
}
