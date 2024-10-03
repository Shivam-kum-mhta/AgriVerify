// scripts/deploy.js

const hre = require("hardhat");

async function main() {
    // Compile the contracts
    await hre.run('compile');

    // Get the ContractFactory and Signers here.
    const AgriVerify = await hre.ethers.getContractFactory("AgriVerify");
    const agriVerify = await AgriVerify.deploy(); // Deploy the contract

    await agriVerify.deployed(); // Wait until the contract is deployed

    console.log("AgriVerify deployed to:", agriVerify.address);
}

// Run the main function and catch errors
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
