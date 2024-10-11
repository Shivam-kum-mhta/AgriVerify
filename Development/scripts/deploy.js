// scripts/deploy.js
async function main() {
    // Get the contract factory
    const AgriVerify = await ethers.getContractFactory("AgriVerify");
  
    // Deploy the contract
    const agriVerify = await AgriVerify.deploy();
  
    // Wait for the contract to be deployed
    await agriVerify.deployed();
  
    // Log the address of the deployed contract
    console.log("AgriVerify deployed to:", agriVerify.address);
  }
  
  // Error handling and running the main function
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
  