import { ethers } from 'ethers'

const getProvider = () => {
  // If the user has MetaMask installed, we can use it.
  if (window.ethereum) {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    return provider
  } else {
    // If the user doesn't have MetaMask, we can fall back to Infura:
    // It has only read-only methods and cannot sign transactions.
    const provider = ethers.getDefaultProvider()
  }
}

const getContract = (provider, abi, address) => {
  const contract = new ethers.Contract(address, abi, provider)
  return contract
}

const readContractData = async (contract) => {
  const data = await contract.getData()
  return data
}

export { getProvider, getContract, readContractData }
