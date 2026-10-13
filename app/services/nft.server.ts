// app/services/nft.server.ts
import { ethers } from "ethers";
import { getProvider, getWallet } from "./crypto.server";

export function getNftContract() {
  const address = process.env.NFT_CONTRACT_ADDRESS;
  if (!address) throw new Error("NFT_CONTRACT_ADDRESS missing");

  const abi = [
    "function balanceOf(address owner) view returns (uint256)",
    "function tokenURI(uint256 tokenId) view returns (string)",
    "function safeMint(address to) public returns (uint256)",
  ];

  return new ethers.Contract(address, abi, getWallet());
}

export async function getNftBalance(address: string) {
  const contract = getNftContract();
  return await contract.balanceOf(address);
}

export async function mintNft(to: string) {
  const contract = getNftContract();
  const tx = await contract.safeMint(to);
  return tx.hash;
}
