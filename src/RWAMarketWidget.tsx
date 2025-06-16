import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { getRWAMarketContract } from "./blockchain/rwaMarket";

// Para evitar error de typescript con window.ethereum
declare global {
  interface Window {
    ethereum?: any;
  }
}

const RWAMarketWidget: React.FC = () => {
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState("");
  const [totalSupply, setTotalSupply] = useState("");
  const [tokenPrice, setTokenPrice] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");

  useEffect(() => {
    async function load() {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        setAccount(accounts[0]);
        const contract = getRWAMarketContract(provider);
        setName(await contract.name());
        setSymbol(await contract.symbol());
        setTotalSupply(ethers.formatUnits(await contract.totalSupply(), 18));
        setTokenPrice(ethers.formatEther(await contract.tokenPrice()));
        setBalance(ethers.formatUnits(await contract.balanceOf(accounts[0]), 18));
      }
    }
    load();
  }, []);

  const handleBuy = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Comprando...");
    try {
      if (!window.ethereum) return;
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = getRWAMarketContract(signer);
      const price = await contract.tokenPrice();
      const value = price * BigInt(amount);
      const tx = await contract.buyTokens({ value });
      await tx.wait();
      setStatus("Compra exitosa");
      setBalance(ethers.formatUnits(await contract.balanceOf(account), 18));
    } catch (err: any) {
      setStatus("Error: " + (err.message || err));
    }
  };

  const handleSell = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Vendiendo...");
    try {
      if (!window.ethereum) return;
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = getRWAMarketContract(signer);
      const tx = await contract.sellTokens(ethers.parseUnits(amount, 18));
      await tx.wait();
      setStatus("Venta exitosa");
      setBalance(ethers.formatUnits(await contract.balanceOf(account), 18));
    } catch (err: any) {
      setStatus("Error: " + (err.message || err));
    }
  };

  return (
    <div style={{ border: "1px solid #458339", borderRadius: 8, padding: 24, maxWidth: 420, background: '#f8fff4', color: '#222', margin: '0 auto' }}>
      <h2 style={{ color: '#458339' }}>{name} ({symbol})</h2>
      <div><b>Cuenta:</b> {account}</div>
      <div><b>Balance:</b> {balance}</div>
      <div><b>Total Supply:</b> {totalSupply}</div>
      <div><b>Precio por token:</b> {tokenPrice} ETH</div>
      <form onSubmit={handleBuy} style={{ marginTop: 16 }}>
        <h4>Comprar tokens</h4>
        <input
          type="number"
          placeholder="Cantidad"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          min={1}
          style={{ width: '100%', marginBottom: 8 }}
        />
        <button type="submit" style={{ width: '100%', background: '#458339', color: 'white', padding: 8, border: 'none', borderRadius: 4 }}>
          Comprar
        </button>
      </form>
      <form onSubmit={handleSell} style={{ marginTop: 16 }}>
        <h4>Vender tokens</h4>
        <input
          type="number"
          placeholder="Cantidad"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          min={1}
          style={{ width: '100%', marginBottom: 8 }}
        />
        <button type="submit" style={{ width: '100%', background: '#b6e388', color: '#222', padding: 8, border: 'none', borderRadius: 4 }}>
          Vender
        </button>
      </form>
      {status && <div style={{ marginTop: 12 }}>{status}</div>}
    </div>
  );
};

export default RWAMarketWidget;
