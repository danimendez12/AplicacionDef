// scripts/deploy.js
import pkg from 'hardhat';
const { ethers } = pkg;

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const RWAAsset = await ethers.getContractFactory("RWAAsset");
  const rwa = await RWAAsset.deploy("RWA Token", "RWA", ethers.parseUnits("1000000", 18));

  await rwa.waitForDeployment();
  console.log("RWAAsset deployed to:", await rwa.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
