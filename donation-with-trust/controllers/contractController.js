import { StatusCodes } from 'http-status-codes'
import { BadRequestError } from '../errors/index.js'
import { exec } from 'child_process'
import fs from 'fs'

const verifyContract = async (req, res) => {
  const {
    deployedContractAddress,
    trustUSDAddress,
    totalAmount,
    regulatorAddress,
    segmentPercentages,
  } = req.body
  if (
    !deployedContractAddress ||
    !trustUSDAddress ||
    !totalAmount ||
    !regulatorAddress ||
    !segmentPercentages
  ) {
    throw BadRequestError('Please provide all the required fields')
  }
  const formattedArgs = [
    `${deployedContractAddress}`,
    `${totalAmount}`,
    `${regulatorAddress}`,
    JSON.stringify(segmentPercentages),
  ].join(',\n')

  const exportString = `module.exports = [\n    ${formattedArgs}\n];\n`
  fs.writeFileSync('scripts/arguments.cjs', exportString, 'utf8')

  const verifyCommand = `npx hardhat verify --network sepholia --constructor-args scripts/arguments.cjs ${deployedContractAddress}`
  exec(verifyCommand, (error, stdout, stderr) => {
    if (error) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ success: false, error: error.message })
      return
    }
    if (stderr) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ success: false, error: stderr })
      return
    }
  })
  res.status(StatusCodes.OK).json({ success: true })
}

export { verifyContract }
