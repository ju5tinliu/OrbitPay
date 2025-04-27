async function handleConvertButtonClick() {
    const playerId = document.getElementById('playerIdInput').value;
    const userWalletAddress = document.getElementById('walletInput').value;
    const amountToConvert = parseInt(document.getElementById('amountInput').value, 10);
  
    if (!playerId || !userWalletAddress || !amountToConvert) {
      alert('Please fill in all fields!');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:3003/convert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          playerId,
          userWalletAddress,
          amountToConvert
        })
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert(`Conversion successful! Transaction Hash: ${data.transactionHash}`);
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error('API request failed:', error);
      alert('Failed to connect to server.');
    }
  }
  