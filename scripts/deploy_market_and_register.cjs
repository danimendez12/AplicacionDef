// scripts/deploy_market_and_register.cjs
const { ethers } = require("hardhat");
const fs = require("fs");
const path = require("path");

const DEPLOYMENTS_FILE = path.join(__dirname, "../deployments.json");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const name = process.env.TOKEN_NAME || "RWA Market Token";
  const symbol = process.env.TOKEN_SYMBOL || "RWAM";
  const initialSupply = ethers.parseUnits("1000000", 18);
  const tokenPrice = ethers.parseUnits("0.001", "ether");

  // 1. Deploy ERC-20
  const RWAAssetMarket = await ethers.getContractFactory("RWAAssetMarket");
  const rwaMarket = await RWAAssetMarket.deploy(name, symbol, initialSupply, tokenPrice);
  await rwaMarket.waitForDeployment();
  const erc20Address = rwaMarket.target;
  console.log("RWAAssetMarket deployed to:", erc20Address);

  // 2. Deploy OrderBook
  const RWAOrderBook = await ethers.getContractFactory("RWAOrderBook");
  const orderBook = await RWAOrderBook.deploy(erc20Address);
  await orderBook.waitForDeployment();
  const orderBookAddress = orderBook.target;
  console.log("RWAOrderBook deployed to:", orderBookAddress);

  // 3. Registrar en deployments.json
  let deployments = [];
  if (fs.existsSync(DEPLOYMENTS_FILE)) {
    deployments = JSON.parse(fs.readFileSync(DEPLOYMENTS_FILE));
  }
  deployments.push({
    name,
    symbol,
    erc20: erc20Address,
    orderBook: orderBookAddress
  });
  fs.writeFileSync(DEPLOYMENTS_FILE, JSON.stringify(deployments, null, 2));
  console.log("Registrado en deployments.json");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
