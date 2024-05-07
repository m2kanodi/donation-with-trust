const ethers = require("ethers")

async function handleButtonClick(amount) {

  const TRUST_TRACE_ADDRESS = "0x34a60D98966B88B90A275b039DB2fBC2fFCf50A8";

  // Check if MetaMask is installed
  if (typeof window.ethereum !== 'undefined') {
    // Request account access
    await window.ethereum.request({ method: 'eth_requestAccounts' });

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    // Your contract's ABI
    const tokenAbi = [
      {
        "inputs": [
          { "internalType": "address", "name": "spender", "type": "address" },
          { "internalType": "uint256", "name": "value", "type": "uint256" }
        ],
        "name": "approve",
        "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ];

    const tokenAddress = "0x32dFb7521Fa685fA2d0BA5dD9462B56a2c6EA5C5";
    const tokenContract = new ethers.Contract(tokenAddress, tokenAbi, signer);
    const approveTx = await tokenContract.approve(TRUST_TRACE_ADDRESS, ethers.parseUnits(amount, 18));

    await approveTx.wait();

    console.log("Approval confirmed");
    console.log("Approval tx:", approveTx.hash);

    const trustTraceABI = [
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "donate",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ]

    const trustTraceContract = new ethers.Contract(TRUST_TRACE_ADDRESS, trustTraceABI, signer);
    const donateTx = await trustTraceContract.donate(ethers.parseUnits(amount, 18));
    await donateTx.wait();

  } else {
    console.error("MetaMask not found");
  }
}


export default handleButtonClick;