const express = require('express');
const cors = require('cors');
const { ethers } = require('ethers'); //First time using this idk
const axios = require('axios');
const app = express();
const PORT = 3003; 

// API KEY
const API_USER_KEY = "user_api_secret_key";

// Middleware
app.use(cors()); 
app.use(express.json());

//------------------------------------Blockchain Setup ---------------------------------------------------//
const provider = new ethers.JsonRpcProvider("YOUR_BLOCKCHAIN_RPC_URL"); // Ur RPC Url
const wallet = new ethers.Wallet("YOUR_PRIVATE_KEY", provider); // Private key to wallet (DONT SHARE APPARTELY)
const contractAddress = "YOUR_CONTRACT_ADDRESS"; // Smart Contract Address
const contractABI = [
    "function shieldcoin(address to, uint256 amount) public"
];
const contract = new ethers.Contract(contractAddress, contractABI, wallet);
//------------------------------------Blockchain Setup ---------------------------------------------------//



// Frontend check how much plater set
app.get('/spent/:playerId', (req, res) => {
    const playerId = req.params.playerId;
    // Fetch from Game 1 API;
    res.status(400).json({ error: "This endpoint is not supported here. Use Game 1 API instead." });
});

// POST /convert: frontend requests conversion
app.post('/convert', async (req, res) => {
    const { playerId, userWalletAddress, amountToConvert } = req.body;

    if (!playerId || !userWalletAddress || !amountToConvert) {
        return res.status(400).json({ error: "Missing playerId, wallet address, or amount to convert" });
    }

    try {
        // Fetch player's total spent from Game 1 API
        const response = await axios.get(`http://localhost:3001/spent/${playerId}`);
        const { totalSpent } = response.data;

        if (totalSpent < amountToConvert) {
            return res.status(400).json({ error: "Not enough total spent to convert this amount" });
        }

        // Mint stablecoins to user's wallet
        const tx = await contract.shieldcoin(userWalletAddress, amountToConvert);
        await tx.wait(); // Wait for transaction

        res.json({
            message: "Conversion successful!",
            transactionHash: tx.hash
        });
        
        /* FAKE Conversion (IF WE CANT CONNECT TO REAL BLOCKCHAIN MINT)
        const fakeTransactionHash = `0x${Math.floor(Math.random() * 1e16).toString(16)}FAKEHASH`;

        res.json({
            message: "Fake Conversion Successful",
            transactionHash: fakeTransactionHash
        }); */
        
        
    } catch (error) {
        console.error("Blockchain conversion failed:", error);
        res.status(500).json({ error: "Conversion failed" });
    }
});

// Start the User API server (CHECK)
app.listen(PORT, () => {
    console.log(`User API running at http://localhost:${PORT}`);
});