import React from 'react';
import './Home.css'; // Import additional styles

const Home = ({ account }) => {
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
          <button className="connect-button">Connect MetaMask</button>
        </div>
      ) : (

          <p >CERTIFY YOUR CROPS HERE:</p>

      )}
    </div>
  );
};

export default Home;
