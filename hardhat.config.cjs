// require("@nomicfoundation/hardhat-toolbox");

// /** @type import('hardhat/config').HardhatUserConfig */
// module.exports = {
//   solidity: "0.8.27",
//   networks:{

//   }
// };

require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: "0.8.0",
  networks: {
    hardhat: {},
    localhost: {
      url: "http://127.0.0.1:8545"
    }
  }
};
