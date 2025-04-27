const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001; 

const API_MEOW_KEY = "game1_key"; // Secret key for Meow (Game 1)

// 🗂 Simple in-memory "total spent" database
const playerSpent = {};
app.use(cors()); 
app.use(express.json());

// Authenticate Meow API requests
function authMeow(req, res, next) {
    const authHeader = req.headers['authorization']; 
    if (!authHeader) {
        return res.status(401).json({ error: "Missing Authorization Header" });
    }

    const token = authHeader.split(' ')[1];
    if (token !== API_MEOW_KEY) {
        return res.status(403).json({ error: "Invalid Access!" });
    }

    next();
}

// ✅ POST /spend: Game 1 server sends amount player spent
app.post('/spend', authMeow, (req, res) => {
    const { playerId, amount } = req.body; 
    if (!playerId || !amount) {
        return res.status(400).json({ error: "Missing playerId or amount" });
    }

    if (!playerSpent[playerId]) {
        playerSpent[playerId] = { totalSpent: 0 };
    }

    playerSpent[playerId].totalSpent += amount;

    res.json({
        message: "Spend from Game 1 recorded successfully",
        playerId: playerId,
        totalSpent: playerSpent[playerId].totalSpent
    });
});

// ✅ GET /spent/:playerId: frontend can see total spent
app.get('/spent/:playerId', (req, res) => {
    const playerId = req.params.playerId;
    const totalSpent = playerSpent[playerId]?.totalSpent || 0;

    res.json({
        playerId: playerId,
        totalSpent: totalSpent
    });
});

// ✅ Start the server
app.listen(PORT, () => {
    console.log(`Game 1 API running at http://localhost:${PORT}`);
});