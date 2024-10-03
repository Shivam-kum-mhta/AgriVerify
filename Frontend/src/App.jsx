import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import AgriVerifyContract from './contracts/AgriVerify.json';  // ABI from Hardhat deployment

const App = () => {
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState(null);
  const [formData, setFormData] = useState({
    cropName: '',
    farmName: '',
    location: ''
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const initBlockchain = async () => {
      // Connect to Hardhat network via ethers
      const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545'); // Local Hardhat RPC
      const signer = provider.getSigner(0);  // Use the first account from Hardhat
      const networkId = await provider.getNetwork();

      // Contract Address from Hardhat deployment
      const contractAddress = 'YOUR_DEPLOYED_CONTRACT_ADDRESS';
      
      // Initialize the contract
      const agriContract = new ethers.Contract(contractAddress, AgriVerifyContract.abi, signer);
      setContract(agriContract);

      // Get the public address from Hardhat
      const address = await signer.getAddress();
      setAccount(address);
      setIsAuthenticated(true);
    };

    initBlockchain();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (contract) {
      try {
        // Call the contract method to submit certification
        const tx = await contract.submitCertification(formData.cropName, formData.farmName, formData.location);
        await tx.wait();  // Wait for the transaction to be mined
        alert('Certification request submitted!');
      } catch (error) {
        console.error('Error submitting certification:', error);
      }
    }
  };

  return (
    <div>
      <h1>AgriVerify: Farmer Onboarding</h1>
      {isAuthenticated ? (
        <>
          <p>Connected Account: {account}</p>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Crop Name: </label>
              <input
                type="text"
                name="cropName"
                value={formData.cropName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Farm Name: </label>
              <input
                type="text"
                name="farmName"
                value={formData.farmName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Location: </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit">Request Certification</button>
          </form>
        </>
      ) : (
        <p>Connecting to Hardhat Network...</p>
      )}
    </div>
  );
};

export default App;
