import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { fetchDeployments } from "./utils/deployments";
import { getRWAContract } from "./blockchain/rwaAsset";
import house1 from './assets/asset-house1.png';
import house2 from './assets/asset-house2.png';

// Para evitar error de typescript con window.ethereum
declare global {
  interface Window {
    ethereum?: any;
  }
}

const assetImages = [house1, house2];

const RWAWidget: React.FC = () => {
  const [assets, setAssets] = useState<any[]>([]);
  const [account, setAccount] = useState<string>("");
  const [balances, setBalances] = useState<{ [addr: string]: string }>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDeployments().then(setAssets);
  }, []);

  useEffect(() => {
    async function loadBalances() {
      if (window.ethereum && assets.length > 0) {
        setLoading(true);
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        setAccount(accounts[0]);
        const newBalances: { [addr: string]: string } = {};
        for (const asset of assets) {
          const contract = getRWAContract(asset.erc20, provider);
          const bal = await contract.balanceOf(accounts[0]);
          newBalances[asset.erc20] = ethers.formatUnits(bal, 18);
        }
        setBalances(newBalances);
        setLoading(false);
      }
    }
    loadBalances();
    // eslint-disable-next-line
  }, [assets]);

  return (
    <div>
      <h2 style={{ color: '#458339' }}>Activos Tokenizados</h2>
      {account && <div style={{ marginBottom: 16, color: '#888' }}>Cuenta conectada: <b>{account}</b></div>}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
        {assets.map((asset, idx) => (
          <div key={asset.erc20} style={{ background: '#fff', borderRadius: 10, boxShadow: '0 2px 8px #0001', padding: 18, width: 260, margin: 12, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img src={assetImages[idx % assetImages.length]} alt={asset.name} style={{ width: 180, height: 120, objectFit: 'cover', borderRadius: 8, marginBottom: 12 }} />
            <div style={{ fontWeight: 700, fontSize: 18 }}>{asset.name}</div>
            <div style={{ color: '#458339', fontWeight: 500 }}>{asset.symbol}</div>
            <div style={{ margin: '8px 0' }}>Contrato: <span style={{ fontFamily: 'monospace' }}>{asset.erc20.slice(0, 8)}...{asset.erc20.slice(-4)}</span></div>
            <div>Tu balance: <b>{balances[asset.erc20] ?? (loading ? 'Cargando...' : '0')}</b></div>
          </div>
        ))}
      </div>
      {assets.length === 0 && <div style={{ color: '#888' }}>No hay activos desplegados aún.</div>}
    </div>
  );
};

export default RWAWidget;
