import React, { useState } from "react";

interface TokenizationSimulatorProps {
  onSimulate?: (data: { name: string; symbol: string; supply: string }) => void;
}

const TokenizationSimulator: React.FC<TokenizationSimulatorProps> = ({ onSimulate }) => {
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [supply, setSupply] = useState("");
  const [simulated, setSimulated] = useState(false);

  const handleSimulate = (e: React.FormEvent) => {
    e.preventDefault();
    setSimulated(true);
    if (onSimulate) onSimulate({ name, symbol, supply });
  };

  return (
    <div style={{ border: "1px solid #458339", borderRadius: 8, padding: 24, maxWidth: 420, background: '#f8fff4', color: '#222', margin: '0 auto' }}>
      <h2 style={{ color: '#458339' }}>Simulador de Tokenización de Activo</h2>
      <form onSubmit={handleSimulate}>
        <div style={{ marginBottom: 12 }}>
          <label>Nombre del Activo</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            style={{ width: '100%', padding: 6, borderRadius: 4, border: '1px solid #ccc' }}
          />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Símbolo</label>
          <input
            type="text"
            value={symbol}
            onChange={e => setSymbol(e.target.value)}
            required
            style={{ width: '100%', padding: 6, borderRadius: 4, border: '1px solid #ccc' }}
          />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Cantidad total de tokens</label>
          <input
            type="number"
            value={supply}
            onChange={e => setSupply(e.target.value)}
            required
            min={1}
            style={{ width: '100%', padding: 6, borderRadius: 4, border: '1px solid #ccc' }}
          />
        </div>
        <button type="submit" style={{ background: '#458339', color: '#fff', border: 'none', borderRadius: 4, padding: '8px 20px', cursor: 'pointer' }}>
          Simular Tokenización
        </button>
      </form>
      {simulated && (
        <div style={{ marginTop: 24, background: '#e6f9e6', padding: 16, borderRadius: 6 }}>
          <h4>Activo Tokenizado</h4>
          <div><b>Nombre:</b> {name}</div>
          <div><b>Símbolo:</b> {symbol}</div>
          <div><b>Total Supply:</b> {supply}</div>
          <div style={{ marginTop: 8, color: '#666', fontSize: 13 }}>
            (Recuerda: en la blockchain real, el deployment se hace manualmente y solo el deployer recibe los tokens al inicio)
          </div>
        </div>
      )}
    </div>
  );
};

export default TokenizationSimulator;
