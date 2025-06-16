import React, { useState } from "react";
import TokenizationSimulator from "./TokenizationSimulator";
import AssetCard from "./AssetCard";
import house1 from './assets/asset-house1.png';
import house2 from './assets/asset-house2.png';

const assetImages = [house1, house2];

const AssetRegistry: React.FC = () => {
  const [requests, setRequests] = useState<any[]>(() => {
    const stored = localStorage.getItem('tokenizationRequests');
    return stored ? JSON.parse(stored) : [];
  });
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [supply, setSupply] = useState("");
  const [imageIdx, setImageIdx] = useState(0);
  const [status, setStatus] = useState("");

  const handleRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !symbol || !supply) {
      setStatus("Todos los campos son obligatorios");
      return;
    }
    const req = { name, symbol, supply, imageIdx, date: new Date().toISOString() };
    setRequests(prev => {
      const updated = [...prev, req];
      localStorage.setItem('tokenizationRequests', JSON.stringify(updated));
      return updated;
    });
    setName(""); setSymbol(""); setSupply(""); setImageIdx(0); setStatus("¡Petición enviada!");
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', marginTop: 32 }}>
      <h2 style={{ color: '#458339' }}>Solicitar Tokenización de Activo</h2>
      <form onSubmit={handleRequest} style={{ background: '#f8fff4', borderRadius: 8, padding: 24, marginBottom: 32 }}>
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
        <div style={{ marginBottom: 12 }}>
          <label>Imagen</label>
          <select value={imageIdx} onChange={e => setImageIdx(Number(e.target.value))} style={{ width: '100%', padding: 6, borderRadius: 4 }}>
            <option value={0}>Casa 1</option>
            <option value={1}>Casa 2</option>
          </select>
        </div>
        <button type="submit" style={{ background: '#458339', color: '#fff', border: 'none', borderRadius: 4, padding: '8px 20px', cursor: 'pointer' }}>
          Solicitar Tokenización
        </button>
        {status && <div style={{ marginTop: 12, color: status.includes('¡Petición') ? '#458339' : 'red' }}>{status}</div>}
      </form>
      <h3 style={{ color: '#458339' }}>Peticiones realizadas</h3>
      {requests.length === 0 && <div style={{ color: '#888' }}>No hay peticiones aún.</div>}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {requests.map((req, idx) => (
          <li key={idx} style={{ marginBottom: 12, background: '#f0f2f5', borderRadius: 6, padding: 12, display: 'flex', alignItems: 'center', gap: 16 }}>
            <img src={assetImages[req.imageIdx]} alt="activo" style={{ width: 60, height: 40, objectFit: 'cover', borderRadius: 4 }} />
            <div>
              <div><b>{req.name}</b> ({req.symbol})</div>
              <div>Total tokens: {req.supply}</div>
              <div style={{ fontSize: 12, color: '#888' }}>Solicitado: {new Date(req.date).toLocaleString()}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AssetRegistry;
