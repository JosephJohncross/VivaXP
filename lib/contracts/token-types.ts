export interface PropertyToken {
  id: string
  propertyId: string
  tokenAddress: string
  tokenStandard: "ERC1155" | "ERC721"
  totalSupply: bigint
  availableSupply: bigint
  tokenPrice: bigint
  currency: "USDT" | "CELO" | "ETH"
  metadata: {
    name: string
    description: string
    image: string
    attributes: TokenAttribute[]
  }
  revenueSharing: {
    enabled: boolean
    percentage: number
    distributionFrequency: "monthly" | "quarterly" | "annually"
  }
  governance: {
    enabled: boolean
    votingPower: number
    proposalThreshold: number
  }
  createdAt: number
  launchedAt?: number
  status: "draft" | "pending" | "active" | "sold_out" | "paused"
}

export interface TokenAttribute {
  trait_type: string
  value: string | number
  display_type?: "boost_number" | "boost_percentage" | "number" | "date"
}

export interface TokenHolding {
  id: string
  userId: string
  tokenId: string
  propertyId: string
  amount: bigint
  purchasePrice: bigint
  purchasedAt: number
  currentValue: bigint
  totalReturns: bigint
  stakingInfo?: {
    staked: bigint
    stakingRewards: bigint
    stakingStartDate: number
    lockPeriod: number
  }
}

export interface GovernanceProposal {
  id: string
  propertyId: string
  tokenId: string
  proposer: string
  title: string
  description: string
  type: "maintenance" | "renovation" | "sale" | "management_change" | "other"
  options: string[]
  votingPower: Record<string, bigint>
  votes: Record<string, number> // option index
  status: "active" | "passed" | "rejected" | "executed"
  startTime: number
  endTime: number
  executionTime?: number
  quorum: bigint
  threshold: number // percentage needed to pass
}

export interface RevenueDistribution {
  id: string
  propertyId: string
  tokenId: string
  totalAmount: bigint
  currency: string
  distributionDate: number
  recipients: {
    address: string
    amount: bigint
    tokenBalance: bigint
  }[]
  status: "pending" | "processing" | "completed" | "failed"
  transactionHash?: string
}

export interface TokenLaunch {
  id: string
  propertyId: string
  tokenId: string
  launchType: "public" | "whitelist" | "private"
  startTime: number
  endTime: number
  targetAmount: bigint
  raisedAmount: bigint
  minInvestment: bigint
  maxInvestment?: bigint
  whitelistAddresses?: string[]
  vestingSchedule?: {
    cliff: number // seconds
    duration: number // seconds
    intervals: number
  }
  status: "upcoming" | "active" | "successful" | "failed" | "cancelled"
}
