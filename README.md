# UGCC Backend API - Quick READMEProject 
Overview
The backend powers the Universal Game Currency Converter (UGCC) platform.
It connects game servers (companies) with player wallets, allowing players to convert in-game currency into stablecoins.

Structure
Game1 API (api-game1/)
Simulates a game company backend that records player spending.

User API (api-user/)
Handles frontend conversion requests, verifies player info with Game1 API, and mints (or fakes) blockchain tokens.

How it Works - Game1 API (Port 3001)
- POST /spend
  - Records how much a player has spent.
  - Needs an Authorization: Bearer game1_key header.
- GET /spent/:playerId
  - Returns the total spent amount for the specified player.
  - Returns 404 if player ID does not exist.

User API (Port 3003)POST /convert
Frontend sends playerId, walletAddress, and amountToConvert.
Backend checks if player exists by calling Game1 API /spent/:playerId.
If player is valid, mints stablecoins (currently faked).
If player does not exist, returns 404 error.
Command to run:
cd api-user
npm install
node serverU.jsImportant NotesBlockchain minting is currently faked with a random transaction hash.
Player ID validation is strict: only existing players in Game1 API can convert.
Frontend only submits Player ID and Wallet ID, amount is preloaded.
All APIs use localhost ports for testing.
Example cURL Command to Simulate Spendcurl -X POST http://localhost:3001/spend \
  -H "Authorization: Bearer game1_key" \
  -H "Content-Type: application/json" \
  -d '{"playerId": "player123", "amount": 1000}'Example cURL to Test Conversion (after spending)
