async function main() {
    const AgriVerify = await ethers.getContractFactory("AgriVerify");
    const agriVerify = await AgriVerify.deploy();
    console.log("AgriVerify deployed to:", agriVerify.address);
  }
  
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  