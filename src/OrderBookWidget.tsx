import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

// Para evitar error de typescript con window.ethereum
declare global {
  interface Window {
    ethereum?: any;
  }
}

interface OrderBookWidgetProps {
  contractAddress: string;
  name: string;
  symbol: string;
}

interface Offer {
  seller: string;
  amount: string;
  pricePerToken: string;
  active: boolean;
}

const orderBookAbi = [
  "function createOffer(uint256 amount, uint256 pricePerToken)",
  "function fillOffer(uint256 offerId, uint256 buyAmount) payable",
  "function getOffersCount() view returns (uint256)",
  "function offers(uint256) view returns (address,uint256,uint256,bool)",
  "function token() view returns (address)" // <--- getter explícito
];

const erc20Abi = [
  "function approve(address spender, uint256 amount)",
  "function allowance(address owner, address spender) view returns (uint256)",
  "function balanceOf(address) view returns (uint256)"
];

const OrderBookWidget: React.FC<OrderBookWidgetProps> = ({ contractAddress, name, symbol }) => {
  const [account, setAccount] = useState("");
  const [offers, setOffers] = useState<Offer[]>([]);
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("");
  const [buyAmount, setBuyAmount] = useState("");
  const [selectedOffer, setSelectedOffer] = useState<number | null>(null);
  const [erc20, setErc20] = useState<string>("");
  const [balance, setBalance] = useState<string>("");

  // Obtener dirección del ERC-20 desde el contrato OrderBook
  useEffect(() => {
    async function loadERC20() {
      if (window.ethereum && contractAddress) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const orderBook = new ethers.Contract(contractAddress, orderBookAbi, provider);
        const erc20Addr = await orderBook.token();
        setErc20(erc20Addr);
      }
    }
    loadERC20();
  }, [contractAddress]);

  // Cargar cuenta y balance
  useEffect(() => {
    async function loadAccount() {
      if (window.ethereum && erc20) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        setAccount(accounts[0]);
        const token = new ethers.Contract(erc20, erc20Abi, provider);
        const bal = await token.balanceOf(accounts[0]);
        setBalance(ethers.formatUnits(bal, 18));
      }
    }
    loadAccount();
  }, [erc20]);

  // Cargar ofertas
  useEffect(() => {
    async function loadOffers() {
      if (window.ethereum && contractAddress) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const orderBook = new ethers.Contract(contractAddress, orderBookAbi, provider);
        const count = await orderBook.getOffersCount();
        const arr: Offer[] = [];
        for (let i = 0; i < Number(count); i++) {
          const [seller, amount, pricePerToken, active] = await orderBook.offers(i);
          arr.push({
            seller,
            amount: ethers.formatUnits(amount, 18),
            pricePerToken: ethers.formatEther(pricePerToken),
            active
          });
        }
        setOffers(arr);
      }
    }
    loadOffers();
  }, [contractAddress, status]);

  // Crear oferta de venta
  const handleCreateOffer = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Aprobando tokens...");
    try {
      if (!window.ethereum || !erc20) return;
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const token = new ethers.Contract(erc20, erc20Abi, signer);
      const orderBook = new ethers.Contract(contractAddress, orderBookAbi, signer);
      const amountWei = ethers.parseUnits(amount, 18);
      const priceWei = ethers.parseEther(price);
      // Aprobar tokens
      const allowance = await token.allowance(account, contractAddress);
      if (allowance < amountWei) {
        const txApprove = await token.approve(contractAddress, amountWei);
        await txApprove.wait();
      }
      setStatus("Creando oferta...");
      const tx = await orderBook.createOffer(amountWei, priceWei);
      await tx.wait();
      setStatus("Oferta creada");
      setAmount("");
      setPrice("");
    } catch (err: any) {
      setStatus("Error: " + (err.message || err));
    }
  };

  // Comprar tokens de una oferta
  const handleBuy = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedOffer === null) return;
    setStatus("Comprando...");
    try {
      if (!window.ethereum) return;
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const orderBook = new ethers.Contract(contractAddress, orderBookAbi, signer);
      const offer = offers[selectedOffer];
      const buyAmountWei = ethers.parseUnits(buyAmount, 18);
      const totalPrice = ethers.parseEther(offer.pricePerToken) * BigInt(buyAmount);
      const tx = await orderBook.fillOffer(selectedOffer, buyAmountWei, { value: totalPrice });
      await tx.wait();
      setStatus("Compra exitosa");
      setBuyAmount("");
    } catch (err: any) {
      setStatus("Error: " + (err.message || err));
    }
  };

  return (
    <div style={{ border: "1px solid #458339", borderRadius: 8, padding: 24, maxWidth: 600, background: '#f8fff4', color: '#222', margin: '0 auto' }}>
      <h2 style={{ color: '#458339' }}>{name} ({symbol})</h2>
      <div><b>Tu cuenta:</b> {account}</div>
      <div><b>Tu balance:</b> {balance}</div>
      <form onSubmit={handleCreateOffer} style={{ marginTop: 16, marginBottom: 32 }}>
        <h4>Crear oferta de venta</h4>
        <input
          type="number"
          placeholder="Cantidad de tokens"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          min={1}
          style={{ width: '100%', marginBottom: 8 }}
        />
        <input
          type="number"
          placeholder="Precio por token (ETH)"
          value={price}
          onChange={e => setPrice(e.target.value)}
          min={0.00001}
          step={0.00001}
          style={{ width: '100%', marginBottom: 8 }}
        />
        <button type="submit" style={{ width: '100%', background: '#458339', color: 'white', padding: 8, border: 'none', borderRadius: 4 }}>
          Crear oferta
        </button>
      </form>
      <h4>Ofertas activas</h4>
      <table style={{ width: '100%', background: '#fff', borderRadius: 6, marginBottom: 16 }}>
        <thead>
          <tr style={{ background: '#e6f9e6' }}>
            <th>Vendedor</th>
            <th>Cantidad</th>
            <th>Precio/token (ETH)</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {offers.map((offer, idx) => offer.active && (
            <tr key={idx}>
              <td style={{ fontSize: 12 }}>{offer.seller.slice(0, 8)}...{offer.seller.slice(-4)}</td>
              <td>{offer.amount}</td>
              <td>{offer.pricePerToken}</td>
              <td>
                <form onSubmit={handleBuy} style={{ display: 'flex', gap: 4 }}>
                  <input
                    type="number"
                    placeholder="Cantidad"
                    value={selectedOffer === idx ? buyAmount : ""}
                    onChange={e => { setSelectedOffer(idx); setBuyAmount(e.target.value); }}
                    min={1}
                    max={offer.amount}
                    style={{ width: 70 }}
                  />
                  <button type="submit" style={{ background: '#b6e388', color: '#222', border: 'none', borderRadius: 4, padding: '4px 10px', cursor: 'pointer' }}>
                    Comprar
                  </button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {status && <div style={{ marginTop: 12 }}>{status}</div>}
    </div>
  );
};

export default OrderBookWidget;
