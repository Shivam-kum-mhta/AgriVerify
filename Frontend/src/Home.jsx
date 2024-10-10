import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

const Home = ({ account, setAccount, setContract, setIsAuthenticated, contractAddress, AgriVerifyABI }) => {
  useEffect(() => {
    const connectToMetaMask = async () => {
      try {
        if (window.ethereum) {
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

    connectToMetaMask();
  }, [contractAddress, AgriVerifyABI, setAccount, setContract, setIsAuthenticated]);

  return (
    <header className="header">
      <h1>AgriVerify - Decentralized Crop Certification</h1>
      {account ? (
        <p className="connected"><strong>Connected Account:</strong> {account}</p>
      ) : (
        <p>Please connect to MetaMask.</p>
      )}
    </header>
  );
};

export default Home;
