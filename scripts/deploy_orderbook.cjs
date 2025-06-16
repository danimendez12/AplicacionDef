// scripts/deploy_orderbook.cjs
const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Pide la dirección del contrato ERC-20 a usar
  const tokenAddress = process.env.TOKEN_ADDRESS || "<DIRECCION_DEL_CONTRATO_ERC20>";
  if (!tokenAddress || tokenAddress.startsWith('<')) {
    throw new Error("Debes definir la dirección del contrato ERC-20 en TOKEN_ADDRESS");
  }

  const RWAOrderBook = await ethers.getContractFactory("RWAOrderBook");
  const orderBook = await RWAOrderBook.deploy(tokenAddress);
  await orderBook.waitForDeployment();
  console.log("RWAOrderBook deployed to:", orderBook.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
