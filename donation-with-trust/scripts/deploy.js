// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
import hre from "hardhat";
import { expect } from "chai";
import pkg from "hardhat";
const { ethers } = pkg;

const TrustUSDFactory = await ethers.getContractFactory("TrustUSD");
const [deployerAddress, regulator, donor] = await ethers.getSigners();
const trustUSD = await TrustUSDFactory.deploy(deployerAddress.address);
console.log("TrustUSD deployed to:", trustUSD.target);


const TrustTraceFactory = await ethers.getContractFactory("TrustTrace");
const trustTrace = await TrustTraceFactory.deploy(trustUSD.target, "10000000000000000000000000", regulator.address, [10, 20, 20, 40, 10]);
console.log("TrustTrace deployed to:", trustTrace.target);