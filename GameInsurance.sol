pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract GameInsurance is Ownable {
    struct ClaimInfo {
        address player;
        uint256 usdSpent;          // USD-equivalent amount player spent
        uint256 payoutRate;        // Payout rate in basis points (e.g., 8000 = 80.00%)
        uint256 payoutAmountDOT;   // How much DOT they got paid
        uint256 dotToUsdRate;      // DOT/USD rate at payout time
        uint256 timestamp;         // Payout timestamp
    }

    mapping(address => uint256) public gameRegistry; // Registered games (studio address => payout rate in basis points)

    mapping(address => uint256) public insuredSpendingUSD; // Map players' total insured spending (player address => USD spent)

    mapping(uint256 => ClaimInfo) public claims;
    uint256 public nextClaimId;

    event GameRegistered(address indexed studio, uint256 payoutRate);
    event WalletLinked(address indexed player, uint256 usdSpent);
    event PayoutTriggered(address indexed player, uint256 payoutAmountDOT);

    constructor() Ownable(msg.sender) {}

    function registerGame(address studio, uint256 payoutRate) external onlyOwner {   // Game studio registration (only the admin can do this)
        require(payoutRate <= 10000, "Payout rate cannot exceed 100%");
        gameRegistry[studio] = payoutRate;
        emit GameRegistered(studio, payoutRate);
    }

    function linkWallet(address player, uint256 usdSpent) external { // Link player wallet to spending (studio calls this after purchase)
        require(gameRegistry[msg.sender] > 0, "Only registered studios can link players");
        insuredSpendingUSD[player] += usdSpent;
        emit WalletLinked(player, usdSpent);
    }

    function triggerPayout(address player, uint256 dotToUsdRate) external onlyOwner { // Trigger payout manually (admin triggers)
        require(dotToUsdRate > 0, "Invalid DOT/USD rate");
        uint256 usdSpent = insuredSpendingUSD[player];
        require(usdSpent > 0, "No insured spending found");

        uint256 payoutRate = 8000; // Currently default 80% if we don't store per-player-game yet
        uint256 payoutAmountUSD = (usdSpent * payoutRate) / 10000;

        uint256 payoutAmountDOT = (payoutAmountUSD * 1e18) / dotToUsdRate; // // Calculate how much DOT to send and assume 18 decimals for DOT

        require(address(this).balance >= payoutAmountDOT, "Insufficient pool balance for payout");

        insuredSpendingUSD[player] = 0; // Reset player record to avoid double payout

        (bool success, ) = payable(player).call{value: payoutAmountDOT}(""); // Transfer payout
        require(success, "Payout failed");

        claims[nextClaimId] = ClaimInfo({ // Record claim
            player: player,
            usdSpent: usdSpent,
            payoutRate: payoutRate,
            payoutAmountDOT: payoutAmountDOT,
            dotToUsdRate: dotToUsdRate,
            timestamp: block.timestamp
        });
        nextClaimId++;

        emit PayoutTriggered(player, payoutAmountDOT);
    }

    receive() external payable {} // Allow funding the insurance pool by sending DOT directly
}
