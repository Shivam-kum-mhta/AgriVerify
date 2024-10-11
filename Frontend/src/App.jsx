import React, { useState } from 'react';
import Home from './Home'; 
import Certifications from './Certifications'; // Import the Certifications component
import AgriVerifyABI from './contracts/AgriVerify.json'; // Import the ABI of the deployed contract
import './App.css'; // Import the CSS
import Show from './Show';
import { ethers } from 'ethers';
import Navbar from './Navbar'; 
import pushimage from '../images/PUSHPROTOCOL.png'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
const App = () => {
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const contractAddress = '0x2fD926D5eF17514F8a7F4A7b41fd2904e1d97fA5';
  const connectToMetaMask = async () => {
    try {
      if (window.ethereum) {
         // Request MetaMask to connect to the site
      await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);

        const contractInstance = new ethers.Contract(contractAddress, AgriVerifyABI.abi, signer);
        setContract(contractInstance);
        setIsAuthenticated(true);
      } else {
        alert('MetaMask is not installed. Please install MetaMask.');
      }
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
    }
  };

  return (
    <Router>
    <div className="inch-app">
    <Navbar account={account} connectToWallet={connectToMetaMask} />
      <Routes>
        {/* Default Home Route */}
        <Route
          path="/"
          element={
    <div className="inch-app">
      <Home
        account={account}
        connectToWallet={connectToMetaMask}
      />

      {isAuthenticated && (
        <Certifications account={account} contract={contract} />
      )}
    </div>}/>
    <Route
            path="/showcertificate/:account/:cropId"
            element={
              <Show
                account={account}
                contractAddress={contractAddress}
                AgriVerifyABI={AgriVerifyABI}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
