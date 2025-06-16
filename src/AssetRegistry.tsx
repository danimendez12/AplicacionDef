import React, { useState } from "react";
import TokenizationSimulator from "./TokenizationSimulator";
import AssetCard from "./AssetCard";
import house1 from './assets/asset-house1.png';
import house2 from './assets/asset-house2.png';

const assetImages = [house1, house2];

interface TokenizedAsset {
  name: string;
  symbol: string;
  supply: string;
  contractAddress: string;
  imageIdx?: number;
}

const AssetRegistry: React.FC = () => {
  const [assets, setAssets] = useState<TokenizedAsset[]>([]);

  // Simula el registro de un nuevo activo tokenizado
  const handleSimulate = (data: { name: string; symbol: string; supply: string }) => {
    const contractAddress = prompt(
      `Simulación: Ingresa la dirección del contrato desplegado para el activo "${data.name}" (${data.symbol})`);
    if (contractAddress) {
      // Asignar imagen de forma cíclica
      const imageIdx = assets.length % assetImages.length;
      setAssets(prev => [...prev, { ...data, contractAddress, imageIdx }]);
    }
  };

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', marginTop: 32 }}>
      <TokenizationSimulator onSimulate={handleSimulate} />
      <h3 style={{ marginTop: 32, color: '#458339' }}>Activos Tokenizados</h3>
      {assets.length === 0 && <div style={{ color: '#888' }}>No hay activos registrados aún.</div>}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
        {assets.map((asset, idx) => (
          <AssetCard
            key={idx}
            name={asset.name}
            symbol={asset.symbol}
            supply={asset.supply}
            contractAddress={asset.contractAddress}
            image={assetImages[asset.imageIdx ?? 0]}
          />
        ))}
      </div>
    </div>
  );
};

export default AssetRegistry;
