// require("@nomicfoundation/hardhat-toolbox");

// /** @type import('hardhat/config').HardhatUserConfig */
// module.exports = {
//   solidity: "0.8.27",
// };


require("@nomiclabs/hardhat-ethers");

module.exports = {
  solidity: "0.8.0",
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/85de5f615aa44e5a9381fca701ae43b1`, // Use your Infura project ID
      accounts: [`0x${`1ee3c774ec7e62bfeb71d867fc205fa80d8ba363dc56804932ce71c7516ee9dd`}`] // Add your wallet private key here
    }
  }
};
