import axios from 'axios'

const databaseInterface = axios.create({
  baseURL: '/api/v1',
})

const getAllDonationAddresses = async () => {
  const response = await databaseInterface.get('/donation/get')
  // response body in this scenario is an array of addresses
  return response.data
  return response.data
}

const getSupplier = async (address) => {
  const response = await databaseInterface.post('/supplier/get', { address })
  // response body has the following structure:
  // {
  //   name: 'string',
  //   address: 'string',
  //   description: 'string'
  // }
  return response.body
}
export { getAllDonationAddresses, getSupplier }
