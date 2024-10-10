import React, { useState } from 'react';
import Home from './Home'; // Import the Home component
import Certifications from './Certifications'; // Import the Certifications component
import AgriVerifyABI from './contracts/AgriVerify.json'; // Import the ABI of the deployed contract
import './App.css'; // Import the CSS
import Show from './Show';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
const App = () => {
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const contractAddress = '0x2fD926D5eF17514F8a7F4A7b41fd2904e1d97fA5';

  return (
    <Router>
    <div className="inch-app">
      <Routes>
        {/* Default Home Route */}
        <Route
          path="/"
          element={
    <div className="inch-app">
      <Home
        account={account}
        setAccount={setAccount}
        setContract={setContract}
        setIsAuthenticated={setIsAuthenticated}
        contractAddress={contractAddress}
        AgriVerifyABI={AgriVerifyABI}
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
