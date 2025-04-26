# Universal Game Currency Converter (UGCC)

A blockchain-based platform designed to simplify and unify the way players purchase and manage in-game currencies across multiple games.

## Features

- Connect multiple game accounts and view their balances
- Convert game currencies to UGCC stablecoin (with 1-week cooldown)
- Claim converted stablecoins after cooldown period
- Support for MetaMask and Polkadot.js wallets
- Real-time balance tracking
- Transparent conversion rates (70-80% of original value)

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ugcc.git
cd ugcc
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Technology Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Headless UI
- Heroicons
- ethers.js

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── page.tsx           # Dashboard page
│   ├── convert/           # Currency conversion
│   └── claim/             # Claim stablecoins
├── components/            # Reusable components
│   ├── Navigation.tsx     # Main navigation
│   └── WalletConnect.tsx  # Wallet connection
└── styles/               # Global styles
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
