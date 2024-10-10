import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ethers } from 'ethers';
import AgriVerifyABI from './contracts/AgriVerify.json'; // Adjust the path as necessary

const Show = () => {
  const { account, cropId } = useParams(); // Get the account and cropId from URL params
  const [cropDetails, setCropDetails] = useState(null);
  const [error, setError] = useState(null);

  // WARNING: DO NOT EXPOSE PRIVATE KEYS IN PRODUCTION CODE. Use environment variables instead.
  const privateKey = import.meta.env.VITE_PRIVATE_KEY; 

  useEffect(() => {
    const fetchCropDetails = async () => {
      try {
        // Use ethers to connect to Ethereum blockchain
        const provider = new ethers.providers.JsonRpcProvider(
          'https://sepolia.infura.io/v3/85de5f615aa44e5a9381fca701ae43b1'
        );
        const wallet = new ethers.Wallet(privateKey, provider);
        const contractAddress = '0x2fD926D5eF17514F8a7F4A7b41fd2904e1d97fA5';

        // Initialize contract with ABI and signer (wallet)
        const contract = new ethers.Contract(contractAddress, AgriVerifyABI.abi, wallet);

        // Fetch all crops associated with the account
        const crops = await contract.getCropInfo(account);
        const crop = crops.find((crop) => crop.cropId.toNumber() === parseInt(cropId, 10)); // Match the cropId

        // If the crop exists, set its details
        if (crop) {
          setCropDetails({
            name: crop.name,
            timestamp: new Date(crop.timestamp.toNumber() * 1000).toLocaleString(),
            certified: crop.certified ? 'Yes' : 'No',
          });
        } else {
          setError(`Crop with ID ${cropId} not found.`);
        }
      } catch (err) {
        console.error('Error fetching crop details:', err);
        setError('Error fetching crop details.');
      }
    };

    fetchCropDetails();
  }, [account, cropId, privateKey]); // Dependencies: re-run when account, cropId, or privateKey changes

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!cropDetails) {
    return <div>Loading crop details...</div>;
  }

  return (
    <div className="certification-details">
      <h2>Crop Certification Details</h2>
      <p><strong>Crop Name:</strong> {cropDetails.name}</p>
      <p><strong>Timestamp:</strong> {cropDetails.timestamp}</p>
      <p><strong>Certified:</strong> {cropDetails.certified}</p>
    </div>
  );
};

export default Show;
