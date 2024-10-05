import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import QRcode from 'qrcode';
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
  const [certifications, setCertifications] = useState([]);


  useEffect(() => {
    const initBlockchain = async () => {
      try {    
const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');       // HardHat localhost url

const signer = new ethers.Wallet('0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80', provider);
        const contractAddress = '0x5fbdb2315678afecb367f032d93f642f64180aa3'; //  Deployed contract address (in Hardhat localhost)
        const agriContract = new ethers.Contract(contractAddress, AgriVerifyContract.abi, signer);

        /**  Contract Address from Hardhat deployment
             const contractAddress = 'YOUR_DEPLOYED_CONTRACT_ADDRESS';  // Replace with your contract address
            const agriContract = new ethers.Contract(contractAddress, AgriVerifyContract.abi, signer); **/

          setContract(agriContract);

        const address = await signer.getAddress();
        setAccount(address);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error connecting to the blockchain:', error);
      }
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
        const tx = await contract.submitCertification(formData.cropName, formData.farmName, formData.location);
        await tx.wait();  
        alert('Certification request submitted!');

const imgURL = await QRcode.toDataURL('https://localhost/account/certification/index')
// img.save('qrcode.png')
    setCertifications([...certifications, {...formData , img:imgURL}]);
// img.show()
        

        setFormData({ cropName: '', farmName: '', location: '' });
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
          <p>Account Connected: {account}</p>
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
              <label>Farmer Name: </label>
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
          <div>
          <h2>Certified Crops</h2>
          {certifications.map((cert, index) => (
            <div key={index}>
              <p><strong>Crop Name:</strong> {cert.cropName}</p>
              <p><strong>Farmer Name:</strong> {cert.farmName}</p>
              <p><strong>Location:</strong> {cert.location}</p>
              <p><strong>QR Code:</strong> <img src={cert.img} alt="QR Code" /></p>
            </div>
          ))}
          </div>
      </>
      ) : (
        <p>Connecting to Hardhat Network...</p>
      )}
    </div>
  );
};

export default App;
