import React from 'react';
import './Navbar.css'; // Import styling for the navbar
import { Link } from 'react-router-dom';
const Navbar = ({ account, connectToWallet }) => {
    
  //     // Disconnect function to clear the wallet connection
  // const disconnectWallet = () => {
  //   setAccount(null); // Reset the account state to simulate disconnection
  // };



  return (
    <nav className="navbar">
        <Link to="/" style={{ textDecoration: 'none' }}>
      <div className="navbar-logo">AgriVerify</div>
      </Link>
      <ul className="navbar-links">
        {account ? (
          <li className="navbar-account">Connected: {account}</li>
        ) : (
          <li>
            <button onClick={connectToWallet} className="connect-btn">
              Connect Wallet
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
