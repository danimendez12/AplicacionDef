import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { getRWAContract } from "./blockchain/rwaAsset";

// Para evitar error de typescript con window.ethereum
declare global {
  interface Window {
    ethereum?: any;
  }
}

interface AccountInfoWidgetProps {
  contractAddress: string;
}

const AccountInfoWidget: React.FC<AccountInfoWidgetProps> = ({ contractAddress }) => {
  const [account, setAccount] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [symbol, setSymbol] = useState<string>("");
  const [totalSupply, setTotalSupply] = useState<string>("");
  const [balance, setBalance] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const load = async () => {
    if (window.ethereum && contractAddress) {
      setLoading(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      setAccount(accounts[0]);
      const contract = getRWAContract(contractAddress, provider);
      setName(await contract.name());
      setSymbol(await contract.symbol());
      setTotalSupply(ethers.formatUnits(await contract.totalSupply(), 18));
      setBalance(ethers.formatUnits(await contract.balanceOf(accounts[0]), 18));
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line
  }, [contractAddress]);

  if (!contractAddress) return null;

  return (
    <div style={{ border: "1px solid #aaa", padding: 20, borderRadius: 8, maxWidth: 400, marginTop: 16, background: '#222', color: '#fff' }}>
      <h3 style={{ color: '#b6e388' }}>Información de la Cuenta</h3>
      <div><b>Cuenta:</b> {account}</div>
      <div><b>Token:</b> {name} ({symbol})</div>
      <div><b>Total Supply:</b> {totalSupply}</div>
      <div><b>Balance:</b> {balance}</div>
      <button onClick={load} style={{ marginTop: 12, background: '#b6e388', color: '#222', border: 'none', borderRadius: 4, padding: '6px 16px', cursor: 'pointer' }} disabled={loading}>
        {loading ? 'Actualizando...' : 'Actualizar'}
      </button>
    </div>
  );
};

export default AccountInfoWidget;
