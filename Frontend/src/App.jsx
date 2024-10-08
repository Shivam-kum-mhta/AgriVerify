import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import AgriVerifyABI from './contracts/AgriVerify.json';  // Import the ABI of the deployed contract

const App = () => {
  const [account, setAccount] = useState('');        
  const [contract, setContract] = useState(null);    
  const [cropName, setCropName] = useState('');      
  const [certifiedCrops, setCertifiedCrops] = useState([]);  // To store the list of certified crops
  const [isAuthenticated, setIsAuthenticated] = useState(false); 
  // Deployed contract address (Replace with your actual deployed contract address)
  const contractAddress = '0x2fD926D5eF17514F8a7F4A7b41fd2904e1d97fA5';

  // MetaMask Connection
  useEffect(() => {
    const connectToMetaMask = async () => {
      try {
        if (window.ethereum) {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const address = await signer.getAddress();
          setAccount(address);

          // Connect to the contract
          const contractInstance = new ethers.Contract(contractAddress, AgriVerifyABI.abi, signer);
          setContract(contractInstance);
          setIsAuthenticated(true);
          getCertifiedCrops();
        } else {
          alert('MetaMask is not installed. Please install MetaMask.');
        }
      } catch (error) {
        console.error('Error connecting to MetaMask:', error);
      }
    };

    connectToMetaMask();
  }, []);

  // Handle crop name input change
  const handleInputChange = (e) => {
    setCropName(e.target.value);
  };

  // Submit crop certification
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!contract) return;

    try {
      const tx = await contract.submitCertification(cropName);  
      await tx.wait();  // Wait for the transaction to be mined
      alert(`Crop "${cropName}" has been certified!`);
      setCropName('');  // Reset input field

      getCertifiedCrops();
    } catch (error) {
      console.error('Error submitting certification:', error);
    }
  };

  // Fetch certified crops for the connected user
  const getCertifiedCrops = async () => {
    if (!contract) return;
    
    try {
      const crops = await contract.getCropInfo(account);  // Fetch the certified crops for this address
      console.log("crops: ",crops);
        // Map and convert BigNumber values (Solidity response headers) to readable numbers
        const formattedCrops = crops.map((crop) => ({
          cropId: crop.cropId.toNumber(),
          name: crop.name,
          timestamp: new Date(crop.timestamp.toNumber() * 1000).toLocaleString(),// Convert timestamp to human-readable date
          certified: crop.certified ? 'Yes' : 'No' 
        }));
  
        setCertifiedCrops(formattedCrops);
    } catch (error) {
      console.error('Error fetching certified crops:', error);
    }
  };

  return (
    <div>
      <h1>AgriVerify: Decentralized Crop Certification</h1>
      {isAuthenticated ? (
        <div>
          <p>Connected Account: {account}</p>

          <form onSubmit={handleSubmit}>
            <div>
              <label>Crop Name:</label>
              <input
                type="text"
                value={cropName}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit">Submit Crop for Certification</button>
          </form>

          <h2>Your Certified Crops</h2>
          {certifiedCrops.length > 0 ? (
            <ul>
              {certifiedCrops.map((crop, index) => (
                <li key={index}>
                  <strong>Crop Name:</strong> {crop.name} <br />
                  <strong>Crop ID:</strong> {crop.cropId} <br />
                  <strong>Certified:</strong> {crop.certified} <br />
                  <strong>Timestamp:</strong> {new Date(crop.timestamp * 1000).toLocaleString()} <br />
                  <hr />
                </li>
              ))}
            </ul>
          ) : (
            <p>No certified crops found.</p>
          )}
        </div>
      ) : (
        <p>Please connect to MetaMask.</p>
      )}
    </div>
  );
};

export default App;
