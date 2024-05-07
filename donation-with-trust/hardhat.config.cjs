require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  networks: {
    sepholia: {
      url: "https://sepolia.infura.io/v3/d7e2af7b249f4c79a0b4630cceba1baa", // Replace with the actual RPC URL
      accounts: ["bd13b0cea0fc7e943298a9187a97db7f24801c0571118e4da8f59bf68e7f9cb5",
        "26ccdf51a32ba6074f63645eb04ad4c3c10bcbcd64f1cfe61c36cf5a5cba4f4a",
        "1018c66aa6dfcfbea31045345b4ad7989297fc153d5d4365d839d3833c6b77f3"],    // Replace with your account's private key
      chainId: 11155111,                         // Replace with the actual chain ID
    },
  },
  etherscan: {
    apiKey: {
      sepolia: 'AUB4VQZPZGS17DQCE21WASBRRSIEC9DFCJ'
    }
  }

};
