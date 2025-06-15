// scripts/deploy.js
const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const RWAAsset = await ethers.getContractFactory("RWAAsset");
  const rwa = await RWAAsset.deploy("RWA Token", "RWA", ethers.utils.parseUnits("1000000", 18));

  await rwa.deployed();
  console.log("RWAAsset deployed to:", rwa.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
