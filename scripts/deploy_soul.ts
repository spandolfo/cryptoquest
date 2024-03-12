import { formatEther, parseEther } from "viem";
import hre from "hardhat";

async function main() {
  const lock = await hre.viem.deployContract("Soul", ["0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"]);

  console.log(
    `Soul deployed to ${lock.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
