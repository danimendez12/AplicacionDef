import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { getRWAContract } from "./blockchain/rwaAsset";

interface AssetCardProps {
  name: string;
  symbol: string;
  supply: string;
  contractAddress: string;
  image: string;
}

const AssetCard: React.FC<AssetCardProps> = ({ name, symbol, supply, contractAddress, image }) => {
  const [account, setAccount] = useState<string>("");
  const [balance, setBalance] = useState<string>("");

  useEffect(() => {
    async function load() {
      if (window.ethereum && contractAddress) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        setAccount(accounts[0]);
        const contract = getRWAContract(contractAddress, provider);
        const bal = await contract.balanceOf(accounts[0]);
        setBalance(ethers.formatUnits(bal, 18));
      }
    }
    load();
  }, [contractAddress]);

  return (
    <div style={{ background: '#fff', borderRadius: 10, boxShadow: '0 2px 8px #0001', padding: 18, width: 260, margin: 12, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <img src={image} alt={name} style={{ width: 180, height: 120, objectFit: 'cover', borderRadius: 8, marginBottom: 12 }} />
      <div style={{ fontWeight: 700, fontSize: 18 }}>{name}</div>
      <div style={{ color: '#458339', fontWeight: 500 }}>{symbol}</div>
      <div style={{ margin: '8px 0' }}>Total tokens: <b>{supply}</b></div>
      <div>Tu balance: <b>{balance}</b></div>
      <div style={{ fontSize: 12, color: '#888', marginTop: 6 }}>Contrato: <span style={{ fontFamily: 'monospace' }}>{contractAddress.slice(0, 8)}...{contractAddress.slice(-4)}</span></div>
    </div>
  );
};

export default AssetCard;
