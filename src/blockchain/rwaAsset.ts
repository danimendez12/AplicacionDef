// src/blockchain/rwaAsset.ts
import { ethers, type Signer, type Provider } from "ethers";

// Ya no exportamos la dirección aquí
export const RWA_ABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address) view returns (uint256)",
  "function transfer(address to, uint amount) returns (bool)",
  "event Transfer(address indexed from, address indexed to, uint amount)"
];

export function getRWAContract(address: string, providerOrSigner: Signer | Provider) {
  return new ethers.Contract(address, RWA_ABI, providerOrSigner);
}
