THIS IS AGRIVERIFY

# AgriVerify Documentation

**AgriVerify** is a decentralized platform that allows farmers to certify their organic produce using blockchain technology. It aims to ensure trust and transparency in the certification of organic crops, providing consumers with the ability to verify the authenticity of the crops they purchase.

This documentation will cover the setup, usage, and features of the AgriVerify platform.

---

## Table of Contents
1. [Getting Started](#getting-started)
2. [Features](#features)
3. [Installation](#installation)
4. [Environment Variables](#environment-variables)
5. [Directory Structure](#directory-structure)
6. [Usage](#usage)
   - [MetaMask Connection](#metamask-connection)
   - [Certifying Crops](#certifying-crops)
   - [QR Code Generation](#qr-code-generation)
   - [Subscribing to Notifications](#subscribing-to-notifications)
7. [Routes](#routes)
8. [Deployment](#deployment)
   - [Vercel Deployment](#vercel-deployment)
9. [Technologies Used](#technologies-used)
10. [Resources Used](#resources-used)
11. [Contributing](#contributing)

---

## Demo
Try Out: [https://agri-verify-rvsq.vercel.app/](https://agri-verify-rvsq.vercel.app/).
<video controls src="Demo.mp4" title="Title"></video>

## 1. Getting Started

To use **AgriVerify**, you'll need to:
1. Install MetaMask wallet (Connect to your account and have some testETHs lol).
2. Install Push Protocol Staging (alpha).
3. Connect your wallet to the platform.
4. Certify your crops and generate QR codes for validation.

## 2. Features

- **Decentralized Crop Certification**: Farmers can certify their organic crops on the blockchain, ensuring authenticity.
- **MetaMask Integration**: Users can easily connect their Ethereum wallet (MetaMask) to interact with the platform.
- **QR Code Generation**: Each crop certification generates a unique QR code that consumers can scan to verify the crop's details.
- **Notification Subscription**: Users can opt-in to notifications through Push Protocol to stay updated on their certification status.

## 3. Installation

To install and run the project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/Shivam-kum-mhta/AgriVerify
   <!-- Enter Frontend Directory of the cloned repo -->
   cd Frontend 
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open the app in your browser:
   ```
   <!-- http://localhost:5173 -->
   ```

## 4. Environment Variables

Configure your environment variables properly. You will need the following variables in a `.env` file in Frontend directory as root directory:

- `VITE_PRIVATE_ADDRESS`: The smart contract address used for certification.

<!-- - `VITE_CONTRACT_ADDRESS`: The smart contract address used for certification.
- `VITE_AGRIVERIFY_ABI`: The ABI (Application Binary Interface) of the deployed contract.
- `VITE_PUSH_PROTOCOL_API`: API key for Push Protocol integration. -->

Example `.env` file:

```bash
VITE_PRIVATE_ADDRESS=<your_wallet_private_address>
```

## 5. Directory Structure

```bash
AgriVerify/
├── Hardhat/
│   ├──contracts/
│   ├──scripts/deploy.js
│   ├──test/
│   ├── package.json
│ 
├── Frontend/
│   ├── public/
│   ├── src/
│   │   ├──contracts/
│   │   ├──middleware/
│   │   ├──(component-files)
│   │   └── App.jsx
│   ├── env
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
```

- **Hardhat/**: Contains Hardhat Environment setup for easy compilation, testing and deployment of smart contract to Sepolia Testnet. <br>
- **Frontend**:  Contains code for user interface to interact with AgriVerify's smart contract.
- **Frontend/public/**: Contains static assets.
- **Frontend/src/**: Main source folder with component files, images, and style sheets.
- **Frontend/src/contracts**: Contains ABI of Agriverify on deployment through Hardhat.
- **Frontend/App.jsx**: The main app component.
- **Frontend/vite.config.js**: Vite configuration for development and production builds.

## 6. Usage

### 6.1 MetaMask Connection

Users need to connect their MetaMask wallet to interact with AgriVerify. The wallet is used to authenticate and interact with the smart contract for crop certification.

### 6.2 Certifying Crops

Once MetaMask is connected, the user can certify their crops by entering details such as crop name. The platform generates a certification on the blockchain, ensuring the authenticity of the crop.

### 6.3 QR Code Generation

For each certified crop, a QR code is generated. This code can be scanned to verify the crop's certification details stored on the blockchain.

Example QR code generation:

```javascript
const imgURL = await QRcode.toDataURL(`https://agri-verify-rvsq.vercel.app//showcertificate/${account}/${cropId}`);
// eg url: https://agri-verify-rvsq.vercel.app/showcertificate/0xD94348AE0372161D4c3E9862c906697FdC30eb55/29
```

### 6.4 Subscribing to Notifications

Users can subscribe to AgriVerify notifications to get updates using the Push Protocol (Push Protocol Staging for testnets).

#### Instructions:
1. Visit the Push Protocol Staging website: [Push Protocol Staging](https://staging.push.org/channels).
2. Search for the AgriVerify channel using the channel address. Channel Adress is <0x63b1A4aE31409221fD0e9272b49D490CB52960bb>
3. Opt-in to notifications.

<!-- You can create their own channel at [https://staging.push.org/channel/create](https://staging.push.org/channel/create). -->

```jsx
<img src={PushProtocolImage} alt="Notification Subscription Guide" />
```

## 7. Routes

The platform includes few routes, including dynamic routes to show certificate details. For example:

- `/`: Homepage
- `/showcertificate/:account/:cropId`: Shows crop certification details based on the account and crop ID.


## 8. Deployment

### 8.1 Vercel Deployment

For deploying to Vercel, follow these steps:

1. Link your repository to Vercel.
2. Set the root directory to `/Frontend` for the build.
3. Ensure dynamic routes are correctly configured in vercel.json file.

## 9. Technologies Used

- **React.js**: Frontend framework.
- **Vite**: Build tool.
- **Ethereum (Smart Contracts)**: Blockchain for crop certification.
- **MetaMask**: Wallet connection for blockchain interaction.
- **QR Code Library**: For generating QR codes.
- **Push Protocol**: For sending notifications.
- **Hardhat**: For testing, compiling and deploying smart contracts
- **Miscellaneous**: Postman(api testing), Remix(for testing smart contracts), Google Lens (scanning QR codes).

## 10. Resources Used
Hardhat Documentation
QR Code Generation with JavaScript
Push Protocol Guide
Push Protocol Tutorials
OpenZeppelin Contracts Wizard - Easily create custom ERC20 and ERC721 contracts
Solidity by Example - Learn Solidity with simple, practical examples
How to Build a Blockchain App with Ethereum - Step-by-step tutorial on creating a dApp

## 11. Contributing
You are welcome to contribute to AgriVerify
---

Thank you for using **AgriVerify**! If you have any questions or need further assistance, please reach out via my [support channels](shivamkumara231it068@nitk.edu.in).