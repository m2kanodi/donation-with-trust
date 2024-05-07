import Donation from '../models/Donation.js'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError } from '../errors/index.js'

const addDonation = async (req, res) => {
  const { address: address } = req.body
  if (!address) {
    throw BadRequestError('Please provide a address')
  }
  let donation = await Donation.findOne({ address: address })
  if (!donation) {
    donation = await Donation.create({ address: address })
  }
  res.status(StatusCodes.CREATED).json(donation)
}

const getDonations = async (req, res) => {
  const donations = (await Donation.find()).map((donation) => {
    if (donation == null) {
      return []
    }
    return donation.address
  })
  res.status(StatusCodes.OK).json(donations)
}

export { addDonation, getDonations }
