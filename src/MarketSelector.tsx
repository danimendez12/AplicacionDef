import React, { useEffect, useState } from "react";
import DynamicMarketWidget from "./DynamicMarketWidget";
import OrderBookWidget from './OrderBookWidget';
import { fetchDeployments } from './utils/deployments';

const MarketSelector: React.FC = () => {
  const [assets, setAssets] = useState<any[]>([]);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  useEffect(() => {
    fetchDeployments().then((data) => setAssets(data));
  }, []);

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', marginTop: 32 }}>
      <h2 style={{ color: '#458339' }}>Comprar/Vender Tokens de Activos</h2>
      {assets.length === 0 && <div style={{ color: '#888' }}>No hay activos registrados aún.</div>}
      <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexWrap: 'wrap', gap: 16 }}>
        {assets.map((asset, idx) => (
          <li key={idx} style={{ background: selectedIdx === idx ? '#e6f9e6' : '#fff', border: '1px solid #ccc', borderRadius: 8, padding: 16, cursor: 'pointer', minWidth: 220 }} onClick={() => setSelectedIdx(idx)}>
            <div style={{ fontWeight: 700 }}>{asset.name}</div>
            <div style={{ color: '#458339' }}>{asset.symbol}</div>
            <div style={{ fontSize: 12, color: '#888', marginTop: 4 }}>{asset.erc20.slice(0, 8)}...{asset.erc20.slice(-4)}</div>
            {selectedIdx === idx && <div style={{ marginTop: 8, color: '#458339', fontWeight: 500 }}>Seleccionado</div>}
          </li>
        ))}
      </ul>
      {selectedIdx !== null && assets[selectedIdx] && (
        <div style={{ marginTop: 32 }}>
          <OrderBookWidget
            contractAddress={assets[selectedIdx].orderBook}
            name={assets[selectedIdx].name}
            symbol={assets[selectedIdx].symbol}
          />
        </div>
      )}
    </div>
  );
};

export default MarketSelector;
