import axios from 'axios'

const contractInterface = axios.create({
  baseURL: '/api/v1',
})

const verifyContract = async (contractInformation) => {
  // Contract Information must have the following information:
  // {
  // deployedContractAddress: '0x123456789...',
  // trustUSDAddress: '0x123456789...',
  // totalAmount: 1000000,
  // regulatorAddress: '0x123456789...',
  // segmentPercentages: [10, 20, 30, 40]
  // }
  const response = await contractInterface.post(
    '/contract/verify',
    contractInformation
  )
  return response.data.success
}

export { verifyContract }
