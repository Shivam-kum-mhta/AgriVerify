// src/components/Login.jsx

import React, { useState } from 'react';
import { ethers } from 'ethers';

const Login = () => {
    const [account, setAccount] = useState(null);
    const [error, setError] = useState('');

    const connectWallet = async () => {
        if (typeof window.ethereum !== 'undefined') {
            try {
                // Request account access
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                setAccount(accounts[0]);
                setError('');
                
                // Here you can fetch user's certifications from the smart contract
                // fetchCertifications(accounts[0]);
                
                console.log('Connected account:', accounts[0]);
            } catch (err) {
                setError('Failed to connect wallet: ' + err.message);
            }
        } else {
            setError('Please install MetaMask!');
        }
    };

    return (
        <div>
            <h1>AgriVerify Login</h1>
            {account ? (
                <div>
                    <p>Logged in as: {account}</p>
                    {/* Redirect or show dashboard */}
                </div>
            ) : (
                <button onClick={connectWallet}>Connect Wallet</button>
            )}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default Login;
