export interface PropertyInvestment {
  id: string
  propertyId: string
  propertyTitle: string
  propertyType: "Apartment" | "Commercial" | "Villa" | "House"
  location: string
  image: string
  tokensOwned: number
  totalTokens: number
  investmentAmount: number
  currentValue: number
  monthlyRent: number
  totalReturns: number
  roi: number
  purchaseDate: number
  status: "active" | "completed" | "pending"
}

export interface RevenueDistribution {
  id: string
  propertyId: string
  propertyTitle: string
  amount: number
  currency: string
  distributionDate: number
  type: "rental" | "sale" | "dividend"
  status: "pending" | "completed" | "failed"
}

export interface PortfolioSummary {
  totalInvestment: number
  currentValue: number
  totalReturns: number
  monthlyIncome: number
  propertiesOwned: number
  tokensOwned: number
  averageROI: number
  portfolioGrowth: number
}

export interface InvestmentOpportunity {
  id: string
  propertyTitle: string
  location: string
  image: string
  tokenPrice: number
  availableTokens: number
  expectedROI: number
  propertyType: string
  riskLevel: "Low" | "Medium" | "High"
  minimumInvestment: number
}

class PortfolioService {
  // Mock data - in production, this would come from APIs/blockchain
  private mockInvestments: PropertyInvestment[] = [
    {
      id: "inv_1",
      propertyId: "1",
      propertyTitle: "Modern Apartment Complex",
      propertyType: "Apartment",
      location: "Victoria Island, Lagos",
      image: "/modern-lagos-apartments.png",
      tokensOwned: 25,
      totalTokens: 250,
      investmentAmount: 25000,
      currentValue: 27500,
      monthlyRent: 250,
      totalReturns: 3750,
      roi: 15,
      purchaseDate: Date.now() - 180 * 24 * 60 * 60 * 1000, // 6 months ago
      status: "active",
    },
    {
      id: "inv_2",
      propertyId: "2",
      propertyTitle: "Commercial Office Building",
      propertyType: "Commercial",
      location: "Westlands, Nairobi",
      image: "/placeholder-owj86.png",
      tokensOwned: 10,
      totalTokens: 200,
      investmentAmount: 25000,
      currentValue: 26800,
      monthlyRent: 250,
      totalReturns: 2300,
      roi: 9.2,
      purchaseDate: Date.now() - 120 * 24 * 60 * 60 * 1000, // 4 months ago
      status: "active",
    },
    {
      id: "inv_3",
      propertyId: "3",
      propertyTitle: "Luxury Villa Estate",
      propertyType: "Villa",
      location: "Sandton, Johannesburg",
      image: "/luxury-villa-johannesburg.png",
      tokensOwned: 5,
      totalTokens: 150,
      investmentAmount: 25000,
      currentValue: 25750,
      monthlyRent: 250,
      totalReturns: 1500,
      roi: 6,
      purchaseDate: Date.now() - 90 * 24 * 60 * 60 * 1000, // 3 months ago
      status: "active",
    },
  ]

  private mockRevenue: RevenueDistribution[] = [
    {
      id: "rev_1",
      propertyId: "1",
      propertyTitle: "Modern Apartment Complex",
      amount: 250,
      currency: "USD",
      distributionDate: Date.now() - 30 * 24 * 60 * 60 * 1000,
      type: "rental",
      status: "completed",
    },
    {
      id: "rev_2",
      propertyId: "2",
      propertyTitle: "Commercial Office Building",
      amount: 250,
      currency: "USD",
      distributionDate: Date.now() - 30 * 24 * 60 * 60 * 1000,
      type: "rental",
      status: "completed",
    },
    {
      id: "rev_3",
      propertyId: "3",
      propertyTitle: "Luxury Villa Estate",
      amount: 250,
      currency: "USD",
      distributionDate: Date.now() - 30 * 24 * 60 * 60 * 1000,
      type: "rental",
      status: "completed",
    },
    {
      id: "rev_4",
      propertyId: "1",
      propertyTitle: "Modern Apartment Complex",
      amount: 250,
      currency: "USD",
      distributionDate: Date.now() - 7 * 24 * 60 * 60 * 1000,
      type: "rental",
      status: "pending",
    },
  ]

  private mockOpportunities: InvestmentOpportunity[] = [
    {
      id: "opp_1",
      propertyTitle: "Beachfront Resort Complex",
      location: "Diani Beach, Kenya",
      image: "/kenyan-beachfront-resort.png",
      tokenPrice: 2000,
      availableTokens: 500,
      expectedROI: 18,
      propertyType: "Resort",
      riskLevel: "Medium",
      minimumInvestment: 2000,
    },
    {
      id: "opp_2",
      propertyTitle: "Tech Hub Office Space",
      location: "Ikoyi, Lagos",
      image: "/placeholder-r652k.png",
      tokenPrice: 1500,
      availableTokens: 300,
      expectedROI: 14,
      propertyType: "Commercial",
      riskLevel: "Low",
      minimumInvestment: 1500,
    },
    {
      id: "opp_3",
      propertyTitle: "Student Housing Complex",
      location: "Stellenbosch, South Africa",
      image: "/south-african-student-housing.png",
      tokenPrice: 800,
      availableTokens: 750,
      expectedROI: 16,
      propertyType: "Residential",
      riskLevel: "Medium",
      minimumInvestment: 800,
    },
  ]

  async getPortfolioSummary(): Promise<PortfolioSummary> {
    const investments = this.mockInvestments

    const totalInvestment = investments.reduce((sum, inv) => sum + inv.investmentAmount, 0)
    const currentValue = investments.reduce((sum, inv) => sum + inv.currentValue, 0)
    const totalReturns = investments.reduce((sum, inv) => sum + inv.totalReturns, 0)
    const monthlyIncome = investments.reduce((sum, inv) => sum + inv.monthlyRent, 0)
    const propertiesOwned = investments.length
    const tokensOwned = investments.reduce((sum, inv) => sum + inv.tokensOwned, 0)
    const averageROI = investments.reduce((sum, inv) => sum + inv.roi, 0) / investments.length
    const portfolioGrowth = ((currentValue - totalInvestment) / totalInvestment) * 100

    return {
      totalInvestment,
      currentValue,
      totalReturns,
      monthlyIncome,
      propertiesOwned,
      tokensOwned,
      averageROI,
      portfolioGrowth,
    }
  }

  async getInvestments(): Promise<PropertyInvestment[]> {
    return this.mockInvestments
  }

  async getRevenueHistory(): Promise<RevenueDistribution[]> {
    return this.mockRevenue.sort((a, b) => b.distributionDate - a.distributionDate)
  }

  async getInvestmentOpportunities(): Promise<InvestmentOpportunity[]> {
    return this.mockOpportunities
  }

  async getPortfolioPerformanceData() {
    // Mock performance data for charts
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
    return months.map((month, index) => ({
      month,
      value: 70000 + index * 2500 + Math.random() * 1000,
      returns: 500 + index * 150 + Math.random() * 100,
      properties: Math.min(3, index + 1),
    }))
  }

  async getPropertyDistribution() {
    return [
      { type: "Apartment", value: 35, count: 1 },
      { type: "Commercial", value: 35, count: 1 },
      { type: "Villa", value: 30, count: 1 },
    ]
  }

  async exportPortfolioReport(): Promise<string> {
    // Mock export functionality
    const summary = await this.getPortfolioSummary()
    const investments = await this.getInvestments()

    const report = {
      generatedAt: new Date().toISOString(),
      summary,
      investments,
      totalPages: 1,
    }

    // In production, this would generate a PDF or CSV
    return `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(report, null, 2))}`
  }
}

export const portfolioService = new PortfolioService()
