import { ethers } from 'ethers'

const weiToEth = (wei) => {
  const MULTIPLE = 1000000000000000000n
  return wei / MULTIPLE
}

const provider = new ethers.JsonRpcProvider(
  'https://sepolia.infura.io/v3/d7e2af7b249f4c79a0b4630cceba1baa'
)

const abi = [
  {
    inputs: [
      { internalType: 'address', name: '_trustUSD', type: 'address' },
      { internalType: 'uint256', name: '_maxTotalDonations', type: 'uint256' },
      { internalType: 'address', name: 'regulator', type: 'address' },
      {
        internalType: 'uint256[]',
        name: 'allowancePercentage',
        type: 'uint256[]',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  { inputs: [], name: 'AccessControlBadConfirmation', type: 'error' },
  {
    inputs: [
      { internalType: 'address', name: 'account', type: 'address' },
      { internalType: 'bytes32', name: 'neededRole', type: 'bytes32' },
    ],
    name: 'AccessControlUnauthorizedAccount',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'bytes32', name: 'role', type: 'bytes32' },
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'previousAdminRole',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'newAdminRole',
        type: 'bytes32',
      },
    ],
    name: 'RoleAdminChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'bytes32', name: 'role', type: 'bytes32' },
      {
        indexed: true,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
    ],
    name: 'RoleGranted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'bytes32', name: 'role', type: 'bytes32' },
      {
        indexed: true,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
    ],
    name: 'RoleRevoked',
    type: 'event',
  },
  {
    inputs: [],
    name: 'DEFAULT_ADMIN_ROLE',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'REGULATOR_ROLE',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'segment', type: 'uint256' },
      { internalType: 'address', name: 'newRecipient', type: 'address' },
    ],
    name: 'addAllowedRecipient',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    name: 'allowedAmounts',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: '', type: 'uint256' },
      { internalType: 'uint256', name: '', type: 'uint256' },
    ],
    name: 'allowedRecipients',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'segment', type: 'uint256' },
      { internalType: 'uint256', name: 'key', type: 'uint256' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'distributeFunds',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }],
    name: 'donate',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'bytes32', name: 'role', type: 'bytes32' }],
    name: 'getRoleAdmin',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'bytes32', name: 'role', type: 'bytes32' },
      { internalType: 'address', name: 'account', type: 'address' },
    ],
    name: 'grantRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'bytes32', name: 'role', type: 'bytes32' },
      { internalType: 'address', name: 'account', type: 'address' },
    ],
    name: 'hasRole',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'maxTotalDonations',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'bytes32', name: 'role', type: 'bytes32' },
      { internalType: 'address', name: 'callerConfirmation', type: 'address' },
    ],
    name: 'renounceRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'bytes32', name: 'role', type: 'bytes32' },
      { internalType: 'address', name: 'account', type: 'address' },
    ],
    name: 'revokeRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    name: 'segmentLength',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'bytes4', name: 'interfaceId', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalDonations',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'trustUSD',
    outputs: [{ internalType: 'contract IERC20', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
]

// returns the allocated amounts and allowed recipients
// and the max total donations and total donations received
const fetchCampaignData = async (address) => {
  const contract = new ethers.Contract(address, abi, provider)

  const getAllocatedAmount = async (index) => {
    return contract.allowedAmounts(index)
  }

  const getAllowedRecipient = async (segment, key) => {
    return contract.allowedRecipients(segment, key)
  }

  const getSegmentLength = async (index) => {
    return contract.segmentLength(index)
  }
  let allocatedAmounts = []
  let allocatedLength = 0
  while (true) {
    try {
      const allocatedAmount = weiToEth(
        await getAllocatedAmount(allocatedLength)
      )
      if (allocatedAmount === 0n) {
        break
      }
      allocatedAmounts.push(allocatedAmount)
      allocatedLength += 1
    } catch (error) {
      break
    }
  }

  const indexes = [...Array(allocatedLength).keys()]
  const segmentLength = await Promise.all(
    indexes.map(async (index) => {
      return await getSegmentLength(index)
    })
  )

  const allowedRecipients = []
  for (let i = 0; i < allocatedLength; i++) {
    const segmentRecipients = []
    for (let j = 0; j < segmentLength[i]; j++) {
      const allowedRecipient = await getAllowedRecipient(i, j)
      segmentRecipients.push(allowedRecipient)
    }
    allowedRecipients.push(segmentRecipients)
  }

  let maxTotalDonations = await contract.maxTotalDonations()
  maxTotalDonations = weiToEth(maxTotalDonations)
  let totalDonations = await contract.totalDonations()
  totalDonations = weiToEth(totalDonations)
  return {
    allocatedAmounts: allocatedAmounts,
    allowedRecipients: allowedRecipients,
    maxTotalDonations: maxTotalDonations,
    totalDonations: totalDonations,
  }
}

export { fetchCampaignData }
