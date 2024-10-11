import React, { useState } from 'react';
import './Home.css'; // Import additional styles
import PushProtocolImage from '../images/PUSHPROTOCOL.png';

const Home = ({account, connectToWallet}) => {
  const [copyText, setCopyText] = useState('Copy');

  const copyToClipboard = () => {
    navigator.clipboard.writeText('0x63b1A4aE31409221fD0e9272b49D490CB52960bb')
      .then(() => {
        setCopyText('Copied!');
        setTimeout(() => {
          setCopyText('Copy');
        }, 2000); // Hide success message after 2 seconds
      })
      .catch(() => {
        setCopyText('Failed to copy');
      });
  };

  return (
    <div className="home-container">
      {!account ? (
        <div className="description">
          <h1 className="title">Welcome to AgriVerify</h1>
          <h2 className="subtitle">Decentralized Crop Certification</h2>
          <p className="paragraph">
            AgriVerify is a decentralized platform that empowers farmers to certify their organic produce 
            using blockchain technology. Consumers can trust the authenticity of crop certifications.
          </p>
          <p className="paragraph">Get started by connecting your MetaMask wallet.</p>
          <button className="connect-button" onClick={connectToWallet}>Connect MetaMask</button>
          {/* Notification Subscription Instructions */}
          <div className="notification-instructions">
            <h2 className="instructions-title">Subscribe to Notifications</h2>
            <p className="instructions-subtext">Follow these steps to stay updated:</p>
            
            <ol className="instruction-list">
              <li>Visit the <a href="https://staging.push.org/channels" target="_blank" rel="noopener noreferrer">Push Protocol Website</a>.</li>
              <li>Enter the channel address in the search bar as shown.</li>
              <li>Click <strong>Opt-In</strong> to receive updates.</li>
            </ol>

            <div className="copy-address-container">
              <div className="address-text">Channel Address: <strong>0x63b1A4aE31409221fD0e9272b49D490CB52960bb</strong></div>
              <button className="copy-button" onClick={copyToClipboard}>{copyText}</button>
            </div>

            {/* Image of Push Protocol Guide */}
            <div className="image-container">
              <img 
                src={PushProtocolImage} 
                alt="Notification Subscription Guide" 
                className="push-protocol-image" 
              />
            </div>
          </div>
        </div>
      ) : (
        <p>CERTIFY YOUR CROPS HERE:</p>
      )}
    </div>
  );
};

export default Home;
