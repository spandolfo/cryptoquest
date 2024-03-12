import hre from "hardhat";
const path = require("path");

async function main() {
  const soul = await hre.viem.deployContract("Soul", ["0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"]);

  console.log(
    `Soul deployed to ${soul.address}`
  );
  saveFrontendFiles(soul)
}

function saveFrontendFiles(contract: any) {
  const fs = require("fs");
  const contractsDir = path.join(__dirname, "..", "frontend", "app", "lib","evm");

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }
  const networkName = hre.network.name

  fs.writeFileSync(
    path.join(contractsDir, networkName+".json"),
    JSON.stringify({ address: contract.address}, undefined, 2)
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
