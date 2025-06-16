import React, { useState } from "react";
import AccountInfoWidget from './AccountInfoWidget';

// Para evitar error de typescript con window.ethereum
declare global {
  interface Window {
    ethereum?: any;
  }
}

interface RWAWidgetProps {
  initialAddress?: string;
}

const RWAWidget: React.FC<RWAWidgetProps> = ({ initialAddress }) => {
  const [contractAddress, setContractAddress] = useState<string>(initialAddress || "");

  return (
    <div style={{ border: "1px solid #ccc", padding: 24, borderRadius: 8, maxWidth: 400 }}>
      <h2>RWA Token</h2>
      <div style={{ marginBottom: 12 }}>
        <input
          type="text"
          placeholder="Dirección del contrato"
          value={contractAddress}
          onChange={e => setContractAddress(e.target.value)}
          style={{ width: "100%", marginBottom: 8 }}
        />
      </div>
      <AccountInfoWidget contractAddress={contractAddress} />
    </div>
  );
};

export default RWAWidget;
