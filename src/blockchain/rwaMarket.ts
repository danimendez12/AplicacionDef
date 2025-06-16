import { ethers, type Signer, type Provider } from "ethers";

export const RWA_MARKET_CONTRACT_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

export const RWA_MARKET_ABI = [
  "function buyTokens() payable",
  "function sellTokens(uint256 amount)",
  "function balanceOf(address) view returns (uint256)",
  "function totalSupply() view returns (uint256)",
  "function tokenPrice() view returns (uint256)",
  "function name() view returns (string)",
  "function symbol() view returns (string)"
];

export function getRWAMarketContract(providerOrSigner: Signer | Provider) {
  return new ethers.Contract(RWA_MARKET_CONTRACT_ADDRESS, RWA_MARKET_ABI, providerOrSigner);
}
