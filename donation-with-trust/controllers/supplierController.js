import Supplier from '../models/Supplier.js'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError } from '../errors/index.js'

const addSupplier = async (req, res) => {
  const { name, address, description } = req.body
  if (!name || !address || !description) {
    throw BadRequestError('Please provide all the required fields')
  }
  let supplier = await Supplier.findOne({ address: address })
  if (!supplier) {
    supplier = await Supplier.create({ name, address, description })
  }
  res.status(StatusCodes.CREATED).json(supplier)
}

const getSupplier = async (req, res) => {
  const { address } = req.body
  const supplier = await Supplier.find({ address: address })
  res.status(StatusCodes.OK).json(supplier)
}

const getSuppliers = async (req, res) => {
  const { addresses } = req.body
  const suppliers = await Supplier.find({ address: { $in: addresses } })
  res.status(StatusCodes.OK).json(suppliers)
}
export { addSupplier, getSupplier, getSuppliers }
