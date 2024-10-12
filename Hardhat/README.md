# HARDHAT DEVELOPMENT ENVIRONMENT

To demonstrate deploying the AgriVerify Smart Contract and also deploying it to the Sepolia testnet, here’s an outline of the commands and steps with additional explanations.

### Development Environment Setup

1. **Navigate to the Hardhat project directory**:
   ```shell
   cd Hardhat
   ```

2. **Install necessary dependencies**:
   ```shell
   npm i
   ```

### Compile the AgriVerify Smart Contract

To compile the smart contract, you can use the following command:
```shell
npx hardhat compile contracts/AgriVerify.sol
```

### Testing the Contract

To run tests for the AgriVerify contract:
```shell
npx hardhat test contracts/AgriVerify
```
Tested contract demo:
![alt text](@Assets/image.png)

Make sure you have test scripts written in the `/test` folder that specify what aspects of the contract you want to verify.

### Deploy the Contract Locally (on localhost)

1. **Start a local blockchain instance (using Hardhat’s built-in node)**:
   ```shell
   npx hardhat node
   ```

2. **Deploy the contract to the local node**:
   ```shell
   npx hardhat deploy contracts/AgriVerify.sol --network localhost
   ```

The local deployment mimics a real blockchain environment, allowing you to interact with your smart contract and perform tests before deploying to a live network.

---

### Deploy the Contract to Sepolia Testnet

Deploying on Sepolia requires an account with Sepolia ETH (which you can get from a faucet) and a node provider like Alchemy or Infura to interact with the Sepolia testnet.

1. **Set up environment variables:**

   Create a `.env` file to securely store your private key and node provider URL:

   ```shell
   PRIVATE_KEY=your_private_key
   SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID
   ```

2. **Update `hardhat.config.js` for Sepolia network:**

   Open your `hardhat.config.js` file and add the Sepolia network configuration:
   
   ```javascript
   require('@nomiclabs/hardhat-waffle');
   require('dotenv').config();

   module.exports = {
     solidity: "0.8.0",
     networks: {
       sepolia: {
         url: process.env.SEPOLIA_RPC_URL,
         accounts: [process.env.PRIVATE_KEY]
       }
     }
   };
   ```

3. **Deploy the contract to Sepolia:**

   To deploy the contract to the Sepolia testnet, run:
   ```shell
   npx hardhat run --network sepolia scripts/deploy.js
   ```

   Make sure you have a deploy script (e.g., `scripts/deploy.js`) that handles the contract deployment, such as:

   ```javascript
   async function main() {
     const AgriVerify = await ethers.getContractFactory("AgriVerify");
     const agriVerify = await AgriVerify.deploy();
   
     await agriVerify.deployed();
     console.log("AgriVerify deployed to:", agriVerify.address);
   }
   
   main().catch((error) => {
     console.error(error);
     process.exitCode = 1;
   });
   ```

---

### Hardhat Documentation Links

For more detailed guidance on using Hardhat, you can refer to the official documentation:

- [Hardhat Getting Started](https://hardhat.org/getting-started/)
- [Hardhat Network](https://hardhat.org/hardhat-network/)
- [Deploying Contracts](https://hardhat.org/guides/deploying.html)

This provides instructions on how to work with smart contracts, set up networks, and deploy contracts using Hardhat.

