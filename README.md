# Universal Game Currency Converter (UGCC)

A blockchain-based platform designed to simplify and unify the way players purchase and manage in-game currencies across multiple games.

## Features

- Connect multiple game accounts and view their balances
- Convert game currencies to UGCC stablecoin (with 1-week cooldown)
- Claim converted stablecoins after cooldown period
- Support for MetaMask and Polkadot.js wallets
- Real-time balance tracking
- Transparent conversion rates (70-80% of original value)

## API (Back-Main Branch)
The backend powers the Universal Game Currency Converter (UGCC) platform. It connects game servers (companies) with player wallets, allowing players to convert in-game currency into stablecoins. 
- Game1 API (api-game1/) Simulates a game company backend that records player spending.
- User API (api-user/) Handles frontend conversion requests, verifies player info with Game1 API, and mints (or fakes) blockchain tokens.

### Game1 API (Port 3001)
- POST /spend
  - Records how much a player has spent.
  - Needs an Authorization: Bearer game1_key header.
- GET /spent/:playerId
  - Returns the total spent amount for the specified player.
  - Returns 404 if player ID does not exist.

### User API (Port 3003)
- POST /convert
- Frontend sends playerId, walletAddress, and amountToConvert.
- Backend checks if player exists by calling Game1 API /spent/:playerId. If a player is valid, mints stablecoins. If a player does not exist, it returns a 404 error.
- All APIs use localhost ports for testing.

## Smart Contract Details
- Key functions: registerGame(), linkWallet(), triggerPayout()
- registerGame()
  - adds entry in map with an adress (companies address) and their payout rate (percentage of player expenses insured)
- linkWallet()
  - studio calls this to update the money spent given a player's additional wallet address
- triggerPayout()
  - owner of the smart contract calls this function to deliver insured amount for a player to their address using tokens (testnet tokens right now)

## Video Demo
https://drive.google.com/file/d/1HJX70iaU4VwYfLqLgoM7xc3c7GzH7vUn/view?usp=sharing

## UI
https://drive.google.com/file/d/1wdlhSpM8VYd98HjqV3Mzv5iWNdR_m2yZ/view?usp=sharing
