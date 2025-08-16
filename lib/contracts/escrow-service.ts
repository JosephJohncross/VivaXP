import { ethers } from "ethers"
import { EscrowContract, EscrowStatus, Milestone, MilestoneStatus, Transaction, PaymentMethod } from "./escrow-types"

// Mock escrow contract ABI - in production, this would be the actual smart contract ABI
const ESCROW_ABI = [
  "function createEscrow(address seller, uint256 amount, string propertyId) external payable returns (uint256)",
  "function fundEscrow(uint256 escrowId) external payable",
  "function releaseFunds(uint256 escrowId, uint256 milestoneId) external",
  "function disputeEscrow(uint256 escrowId) external",
  "function resolveDispute(uint256 escrowId, bool favorBuyer) external",
  "function getEscrow(uint256 escrowId) external view returns (tuple)",
  "event EscrowCreated(uint256 indexed escrowId, address buyer, address seller, uint256 amount)",
  "event FundsReleased(uint256 indexed escrowId, uint256 amount)",
  "event DisputeRaised(uint256 indexed escrowId)",
]

export class EscrowService {
  private contract: ethers.Contract | null = null
  private provider: ethers.Provider | null = null

  constructor() {
    if (typeof window !== "undefined" && window.ethereum) {
      this.provider = new ethers.BrowserProvider(window.ethereum)
    }
  }

  private serializeEscrowData(data: EscrowContract): string {
    const serializable = {
      ...data,
      amount: data.amount.toString(),
      milestones: data.milestones.map((m) => ({
        ...m,
        amount: m.amount.toString(),
      })),
    }
    return JSON.stringify(serializable)
  }

  private deserializeEscrowData(data: string): EscrowContract {
    const parsed = JSON.parse(data)
    return {
      ...parsed,
      amount: BigInt(parsed.amount),
      milestones: parsed.milestones.map((m: any) => ({
        ...m,
        amount: BigInt(m.amount),
      })),
    }
  }

  private serializeTransaction(data: Transaction): string {
    const serializable = {
      ...data,
      amount: data.amount.toString(),
    }
    return JSON.stringify(serializable)
  }

  private deserializeTransaction(data: string): Transaction {
    const parsed = JSON.parse(data)
    return {
      ...parsed,
      amount: BigInt(parsed.amount),
    }
  }

  private async ensureContractInitialized() {
    if (!this.contract && this.provider) {
      try {
        // Use a mock contract address for development
        const mockContractAddress = "0x1234567890123456789012345678901234567890"
        const signer = await (this.provider as any).getSigner()
        this.contract = new ethers.Contract(mockContractAddress, ESCROW_ABI, signer)
      } catch (error) {
        console.warn("Could not initialize contract, using mock mode:", error)
        // Continue without contract for mock functionality
      }
    }
  }

  async initializeContract(contractAddress: string) {
    if (!this.provider) throw new Error("No provider available")
    const signer = await (this.provider as any).getSigner()
    this.contract = new ethers.Contract(contractAddress, ESCROW_ABI, signer)
  }

  async createEscrow(
    propertyId: string,
    seller: string,
    amount: bigint,
    currency: "USDT" | "CELO" | "ETH",
    milestones: Omit<Milestone, "id" | "status">[],
  ): Promise<string> {
    await this.ensureContractInitialized()

    try {
      // Mock escrow ID generation
      const escrowId = `escrow_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

      // In production, this would interact with the actual smart contract
      if (this.contract) {
        try {
          const tx = await this.contract.createEscrow(seller, amount, propertyId, {
            value: currency === "ETH" ? amount : 0,
          })
          await tx.wait()
        } catch (error) {
          console.warn("Contract interaction failed, using mock mode:", error)
        }
      }

      // Store escrow data (in production, this would be on-chain)
      const escrowData: EscrowContract = {
        address: escrowId,
        propertyId,
        buyer: this.contract ? (await (this.contract.runner as any)?.getAddress()) || "" : "mock_buyer_address",
        seller,
        amount,
        currency,
        status: "CREATED" as EscrowStatus,
        milestones: milestones.map((m, index) => ({
          id: `milestone_${index + 1}`,
          status: "pending" as MilestoneStatus,
          description: m.description,
          amount: m.amount,
          dueDate: m.dueDate,
          completedAt: m.completedAt,
        })),
        createdAt: Date.now(),
        expiresAt: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30 days
      }

      localStorage.setItem(`escrow_${escrowId}`, this.serializeEscrowData(escrowData))
      return escrowId
    } catch (error) {
      console.error("Error creating escrow:", error)
      throw error
    }
  }

  async fundEscrow(escrowId: string, paymentMethod: PaymentMethod): Promise<Transaction> {
    await this.ensureContractInitialized()

    const escrowData = this.getEscrowData(escrowId)
    if (!escrowData) throw new Error("Escrow not found")

    const transaction: Transaction = {
      id: `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      escrowId,
      type: "deposit",
      amount: escrowData.amount,
      currency: escrowData.currency,
      status: "pending",
      createdAt: Date.now(),
    }

    try {
      if (paymentMethod.type === "crypto") {
        // Handle crypto payment
        if (this.contract) {
          try {
            const tx = await this.contract.fundEscrow(escrowId, {
              value: escrowData.currency === "ETH" ? escrowData.amount : 0,
            })
            await tx.wait()
            transaction.hash = tx.hash
          } catch (error) {
            console.warn("Contract interaction failed, using mock mode:", error)
          }
        }
        transaction.status = "confirmed"
        transaction.confirmedAt = Date.now()

        // Update escrow status
        escrowData.status = "FUNDED" as EscrowStatus
        localStorage.setItem(`escrow_${escrowId}`, this.serializeEscrowData(escrowData))
      } else {
        // Handle fiat payment via Paystack/Flutterwave
        await this.processFiatPayment(escrowData, paymentMethod)
        transaction.status = "confirmed"
        transaction.confirmedAt = Date.now()

        escrowData.status = "FUNDED" as EscrowStatus
        localStorage.setItem(`escrow_${escrowId}`, this.serializeEscrowData(escrowData))
      }

      // Store transaction
      const transactions = this.getTransactions(escrowId)
      transactions.push(transaction)
      localStorage.setItem(
        `transactions_${escrowId}`,
        JSON.stringify(
          transactions.map((t) => ({
            ...t,
            amount: t.amount.toString(),
          })),
        ),
      )

      return transaction
    } catch (error) {
      transaction.status = "failed"
      console.error("Error funding escrow:", error)
      throw error
    }
  }

  async releaseMilestoneFunds(escrowId: string, milestoneId: string): Promise<Transaction> {
    await this.ensureContractInitialized()

    const escrowData = this.getEscrowData(escrowId)
    if (!escrowData) throw new Error("Escrow not found")

    const milestone = escrowData.milestones.find((m) => m.id === milestoneId)
    if (!milestone) throw new Error("Milestone not found")

    const transaction: Transaction = {
      id: `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      escrowId,
      type: "release",
      amount: milestone.amount,
      currency: escrowData.currency,
      status: "pending",
      createdAt: Date.now(),
    }

    try {
      if (this.contract) {
        const tx = await this.contract.releaseFunds(escrowId, milestoneId)
        await tx.wait()
        transaction.hash = tx.hash
      }

      transaction.status = "confirmed"
      transaction.confirmedAt = Date.now()

      // Update milestone status
      milestone.status = "completed" as MilestoneStatus
      milestone.completedAt = Date.now()

      // Check if all milestones are completed
      const allCompleted = escrowData.milestones.every((m) => m.status === "completed")
      if (allCompleted) {
        escrowData.status = "COMPLETED" as EscrowStatus
      }

      localStorage.setItem(`escrow_${escrowId}`, this.serializeEscrowData(escrowData))

      // Store transaction
      const transactions = this.getTransactions(escrowId)
      transactions.push(transaction)
      localStorage.setItem(
        `transactions_${escrowId}`,
        JSON.stringify(
          transactions.map((t) => ({
            ...t,
            amount: t.amount.toString(),
          })),
        ),
      )

      return transaction
    } catch (error) {
      transaction.status = "failed"
      console.error("Error releasing funds:", error)
      throw error
    }
  }

  async raiseDispute(escrowId: string, reason: string): Promise<void> {
    await this.ensureContractInitialized()

    const escrowData = this.getEscrowData(escrowId)
    if (!escrowData) throw new Error("Escrow not found")

    try {
      if (this.contract) {
        try {
          const tx = await this.contract.disputeEscrow(escrowId)
          await tx.wait()
        } catch (error) {
          console.warn("Contract interaction failed, using mock mode:", error)
        }
      }

      escrowData.status = "DISPUTED" as EscrowStatus
      localStorage.setItem(`escrow_${escrowId}`, this.serializeEscrowData(escrowData))

      // Store dispute information
      const dispute = {
        escrowId,
        reason,
        raisedBy: this.contract ? (await (this.contract.runner as any)?.getAddress()) || "" : "mock_user_address",
        raisedAt: Date.now(),
        status: "open",
      }
      localStorage.setItem(`dispute_${escrowId}`, JSON.stringify(dispute))
    } catch (error) {
      console.error("Error raising dispute:", error)
      throw error
    }
  }

  async resolveDispute(escrowId: string, favorBuyer: boolean): Promise<void> {
    const escrowData = this.getEscrowData(escrowId)
    if (!escrowData) throw new Error("Escrow not found")

    try {
      if (this.contract) {
        const tx = await this.contract.resolveDispute(escrowId, favorBuyer)
        await tx.wait()
      }

      escrowData.status = favorBuyer ? EscrowStatus.RESOLVED_IN_FAVOR_OF_BUYER : EscrowStatus.RESOLVED_IN_FAVOR_OF_SELLER
      localStorage.setItem(`escrow_${escrowId}`, this.serializeEscrowData(escrowData))
    } catch (error) {
      console.error("Error resolving dispute:", error)
      throw error
    }
  }

  private async processFiatPayment(escrow: EscrowContract, paymentMethod: PaymentMethod): Promise<void> {
    // Mock fiat payment processing
    // In production, this would integrate with Paystack/Flutterwave APIs
    console.log(`Processing fiat payment for ${escrow.amount} via ${paymentMethod.provider}`)

    // Simulate payment processing delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock successful payment
    return Promise.resolve()
  }

  getEscrowData(escrowId: string): EscrowContract | null {
    const data = localStorage.getItem(`escrow_${escrowId}`)
    return data ? this.deserializeEscrowData(data) : null
  }

  getTransactions(escrowId: string): Transaction[] {
    const data = localStorage.getItem(`transactions_${escrowId}`)
    if (!data) return []

    const parsed = JSON.parse(data)
    return parsed.map((t: any) => ({
      ...t,
      amount: BigInt(t.amount),
    }))
  }

  getAllEscrows(): EscrowContract[] {
    const escrows: EscrowContract[] = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key?.startsWith("escrow_")) {
        const data = localStorage.getItem(key)
        if (data) {
          escrows.push(this.deserializeEscrowData(data))
        }
      }
    }
    return escrows
  }
}

export const escrowService = new EscrowService()
