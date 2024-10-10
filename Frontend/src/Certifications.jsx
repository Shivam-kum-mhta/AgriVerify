import React, { useState, useEffect } from 'react';
import QRcode from 'qrcode'; // Import the QR code library
import sendPushNotification from './middleware/notify'; // Adjust the import path as necessary

const Certifications = ({ account, contract }) => {
  const [cropName, setCropName] = useState('');
  const [certifiedCrops, setCertifiedCrops] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    setCropName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!contract) return;

    setLoading(true);
    try {
      const tx = await contract.submitCertification(cropName);
      await tx.wait();
      await sendPushNotification(account, cropName);
      setMessage(`Crop "${cropName}" has been certified!`);
      setCropName('');
      getCertifiedCrops(); // Refresh the certified crops
    } catch (error) {
      setMessage('Error submitting certification.');
      console.error('Error submitting certification:', error);
    } finally {
      setLoading(false);
    }
  };

  // GET CERTIFIED CROPS
  const getCertifiedCrops = async () => {
    if (!contract) return;

    try {
      const crops = await contract.getCropInfo(account);
      const formattedCrops = await Promise.all(
        crops.map(async (crop) => {
          const cropId = crop.cropId.toNumber();
          const name = crop.name;
          const timestamp = new Date(crop.timestamp.toNumber() * 1000).toLocaleString();
          const certified = crop.certified ? 'Yes' : 'No';

          // Generate the QR code data URL
          const imgURL = await QRcode.toDataURL(`http://localhost:5173/showcertificate/${account}/${cropId}`);

          // Return the formatted crop with QR code URL
          return {
            cropId,
            name,
            timestamp,
            certified,
            img: imgURL // Include the QR code image URL
          };
        })
      );

      setCertifiedCrops(formattedCrops);
    } catch (error) {
      console.error('Error fetching certified crops:', error);
    }
  };

  useEffect(() => {
    if (contract && account) {
      getCertifiedCrops();
    }
  }, [contract, account]);

  return (
    <div className="form-container">
      <div className="card">
        <form onSubmit={handleSubmit} className="cert-form">
          <label htmlFor="cropName" className="label">Crop Name:</label>
          <input
            id="cropName"
            type="text"
            value={cropName}
            onChange={handleInputChange}
            className="input-field"
            required
          />
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Certifying...' : 'Submit Crop for Certification'}
          </button>
        </form>

        {message && (
          <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
            {message}
          </div>
        )}

        <h2 className="sub-title">Your Certified Crops</h2>
        <div className="crop-list">
          {certifiedCrops.map((crop, index) => (
            <div key={index} className="crop-card">
              <p><strong>Crop Name:</strong> {crop.name}</p>
              <p><strong>Crop ID:</strong> {crop.cropId}</p>
              <p><strong>Certified:</strong> {crop.certified}</p>
              <p><strong>Timestamp:</strong> {crop.timestamp}</p>
              <img src={crop.img} alt={`QR Code for ${crop.name}`} style={{ marginTop: '10px' }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Certifications;
