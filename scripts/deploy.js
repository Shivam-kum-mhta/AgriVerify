const hre = require("hardhat");

async function main() {
        
    await hre.run('compile'); //compiled?

    // Get the contract factory
    const AgriVerify = await hre.ethers.getContractFactory("AgriVerify");

    // Deploy the contract
    const agriVerify = await AgriVerify.deploy();

    // Wait for the deployment to finish
    await agriVerify.deployed();
    console.log("AgriVerify deployed to:", agriVerify.address);

    // saveFrontendFiles(agriVerify);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
