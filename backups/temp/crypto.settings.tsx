// app/routes/crypto.settings.tsx
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export async function loader() {
  return json({
    network: process.env.CRYPTO_NETWORK,
    rpc: process.env.CRYPTO_RPC_URL,
    chainId: process.env.CRYPTO_CHAIN_ID,
    walletPublic: process.env.CRYPTO_WALLET_PUBLIC_KEY,
  });
}

export default function CryptoSettings() {
  const data = useLoaderData();

  return (
    <div style={{ padding: 20 }}>
      <h1>Configuration Blockchain – Velto 2</h1>

      <p><strong>Réseau :</strong> {data.network}</p>
      <p><strong>RPC URL :</strong> {data.rpc}</p>
      <p><strong>Chain ID :</strong> {data.chainId}</p>
      <p><strong>Wallet Public :</strong> {data.walletPublic}</p>

      <p style={{ marginTop: 20 }}>
        Modifie ces valeurs dans ton fichier <code>.env</code>.
      </p>
    </div>
  );
}
