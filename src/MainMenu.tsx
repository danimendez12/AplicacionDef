import React, { useState } from "react";
import AssetRegistry from "./AssetRegistry";
import RWAWidget from "./RWAWidget";
import MarketSelector from './MarketSelector';

const menuItems = [
  { key: "register", label: "Registrar Activo" },
  { key: "consult", label: "Consultar Activos" },
  { key: "market", label: "Comprar/Vender Tokens" },
];

const MainMenu: React.FC = () => {
  const [selected, setSelected] = useState("register");

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#f0f2f5' }}>
      <aside style={{ width: 220, background: '#222', color: '#fff', padding: 0 }}>
        <div style={{ fontWeight: 700, fontSize: 22, padding: '2rem 1rem', color: '#b6e388' }}>
          Plataforma RWA
        </div>
        <nav>
          {menuItems.map(item => (
            <div
              key={item.key}
              onClick={() => setSelected(item.key)}
              style={{
                padding: '1rem',
                background: selected === item.key ? '#458339' : 'transparent',
                color: selected === item.key ? '#fff' : '#b6e388',
                cursor: 'pointer',
                fontWeight: selected === item.key ? 700 : 400,
                borderLeft: selected === item.key ? '4px solid #b6e388' : '4px solid transparent',
                transition: 'background 0.2s',
              }}
            >
              {item.label}
            </div>
          ))}
        </nav>
      </aside>
      <main style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
        {selected === "register" && <AssetRegistry />}
        {selected === "consult" && <RWAWidget />}
        {selected === "market" && <MarketSelector />}
      </main>
    </div>
  );
};

export default MainMenu;
