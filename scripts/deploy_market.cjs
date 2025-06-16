// scripts/deploy_market.cjs
const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const name = "RWA Market Token";
  const symbol = "RWAM";
  const initialSupply = ethers.parseUnits("1000000", 18); // 1 millón de tokens
  const tokenPrice = ethers.parseUnits("0.001", "ether"); // 0.001 ETH por token

  const RWAAssetMarket = await ethers.getContractFactory("RWAAssetMarket");
  const rwaMarket = await RWAAssetMarket.deploy(name, symbol, initialSupply, tokenPrice);

  await rwaMarket.waitForDeployment();
  console.log("RWAAssetMarket deployed to:", rwaMarket.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
