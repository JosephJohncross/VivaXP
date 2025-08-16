export interface EscrowContract {
  address: string
  propertyId: string
  buyer: string
  seller: string
  amount: bigint
  currency: "USDT" | "CELO" | "ETH"
  status: EscrowStatus
  milestones: Milestone[]
  createdAt: number
  expiresAt: number
}

export enum EscrowStatus {
  CREATED = "created",
  FUNDED = "funded",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
  DISPUTED = "disputed",
  CANCELLED = "cancelled",
  REFUNDED = "refunded",
  RESOLVED_IN_FAVOR_OF_BUYER = "RESOLVED_IN_FAVOR_OF_BUYER",
  RESOLVED_IN_FAVOR_OF_SELLER = "RESOLVED_IN_FAVOR_OF_SELLER",
}

export interface Milestone {
  id: string
  description: string
  amount: bigint
  status: MilestoneStatus
  dueDate: number
  completedAt?: number
}

export enum MilestoneStatus {
  PENDING = "pending",
  COMPLETED = "completed",
  DISPUTED = "disputed",
}

export interface PaymentMethod {
  type: "crypto" | "fiat"
  currency: string
  provider?: "paystack" | "flutterwave" | "metamask" | "walletconnect"
  details?: any
}

export interface Transaction {
  id: string
  escrowId: string
  type: "deposit" | "release" | "refund" | "dispute"
  amount: bigint
  currency: string
  status: "pending" | "confirmed" | "failed"
  hash?: string
  createdAt: number
  confirmedAt?: number
}
