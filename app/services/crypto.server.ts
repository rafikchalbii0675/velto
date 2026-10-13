// app/services/crypto.server.ts
import { ethers } from "ethers";

export function getProvider() {
  const rpc = process.env.CRYPTO_RPC_URL;
  if (!rpc) throw new Error("CRYPTO_RPC_URL missing");
  return new ethers.JsonRpcProvider(rpc);
}

export function getWallet() {
  const privateKey = process.env.CRYPTO_WALLET_PRIVATE_KEY;
  if (!privateKey) throw new Error("CRYPTO_WALLET_PRIVATE_KEY missing");
  return new ethers.Wallet(privateKey, getProvider());
}

export async function getWalletBalance() {
  const wallet = getWallet();
  const balance = await wallet.getBalance();
  return ethers.formatEther(balance);
}

export async function sendTransaction(to: string, amountEth: string) {
  const wallet = getWallet();
  const tx = await wallet.sendTransaction({
    to,
    value: ethers.parseEther(amountEth),
  });
  return tx.hash;
}
