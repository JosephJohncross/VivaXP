"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { portfolioService } from "@/lib/services/portfolio-service"
import type { PropertyInvestment, RevenueDistribution } from "@/lib/services/portfolio-service"
import { TrendingUp, Calendar, DollarSign, MoreHorizontal, ArrowUpRight, ArrowDownRight } from "lucide-react"
import Link from "next/link"

export function InvestmentHoldings() {
  const [investments, setInvestments] = useState<PropertyInvestment[]>([])
  const [revenue, setRevenue] = useState<RevenueDistribution[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadHoldingsData()
  }, [])

  const loadHoldingsData = async () => {
    try {
      const [investmentData, revenueData] = await Promise.all([
        portfolioService.getInvestments(),
        portfolioService.getRevenueHistory(),
      ])

      setInvestments(investmentData)
      setRevenue(revenueData)
    } catch (error) {
      console.error("Error loading holdings data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const getOwnershipPercentage = (tokensOwned: number, totalTokens: number) => {
    return ((tokensOwned / totalTokens) * 100).toFixed(2)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getRevenueStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-4 bg-muted rounded w-1/3 mb-4"></div>
              <div className="h-6 bg-muted rounded w-1/2"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <Tabs defaultValue="properties" className="space-y-6">
      <TabsList className="grid w-full grid-cols-2 cyber-card border-border/50">
        <TabsTrigger value="properties" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:border-primary/50 transition-all duration-300">
          Property Holdings
        </TabsTrigger>
        <TabsTrigger value="revenue" className="data-[state=active]:bg-secondary/20 data-[state=active]:text-secondary data-[state=active]:border-secondary/50 transition-all duration-300">
          Revenue History
        </TabsTrigger>
      </TabsList>

      <TabsContent value="properties" className="space-y-4">
        {investments.map((investment) => (
          <Card key={investment.id} className="cyber-card border border-border/50 glow-on-hover hologram-effect transition-all duration-300 hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <img
                    src={investment.image || "/placeholder.svg"}
                    alt={investment.propertyTitle}
                    className="w-16 h-16 rounded-lg object-cover neon-border"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gradient-primary">{investment.propertyTitle}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{investment.location}</p>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="border-secondary/50 text-secondary neon-border">
                        {investment.propertyType}
                      </Badge>
                      <Badge className="gradient-accent text-white neon-border">{investment.status}</Badge>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="hover:bg-primary/10 hover:text-primary transition-all duration-300">
                  <MoreHorizontal className="h-4 w-4 neon-glow" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div className="space-y-1">
                  <p className="font-serif text-xs text-muted-foreground">Investment</p>
                  <p className="font-sans font-semibold text-foreground">
                    ${investment.investmentAmount.toLocaleString()}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="font-serif text-xs text-muted-foreground">Current Value</p>
                  <div className="flex items-center space-x-1">
                    <p className="font-sans font-semibold text-foreground">
                      ${investment.currentValue.toLocaleString()}
                    </p>
                    {investment.currentValue > investment.investmentAmount ? (
                      <ArrowUpRight className="h-3 w-3 text-green-500" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3 text-red-500" />
                    )}
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="font-serif text-xs text-muted-foreground">Monthly Rent</p>
                  <p className="font-sans font-semibold text-foreground">${investment.monthlyRent.toLocaleString()}</p>
                </div>
                <div className="space-y-1">
                  <p className="font-serif text-xs text-muted-foreground">Total Returns</p>
                  <p className="font-sans font-semibold text-primary">${investment.totalReturns.toLocaleString()}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-serif text-sm text-muted-foreground">
                    Ownership: {investment.tokensOwned} / {investment.totalTokens} tokens
                  </span>
                  <span className="font-serif text-sm font-medium text-foreground">
                    {getOwnershipPercentage(investment.tokensOwned, investment.totalTokens)}%
                  </span>
                </div>
                <Progress
                  value={Number.parseFloat(getOwnershipPercentage(investment.tokensOwned, investment.totalTokens))}
                  className="h-2"
                />
              </div>

              <div className="flex justify-between items-center mt-4 pt-4 border-t">
                <div className="flex items-center space-x-4 text-sm font-serif text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="h-4 w-4" />
                    <span>{investment.roi}% ROI</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>Since {new Date(investment.purchaseDate).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="font-serif bg-transparent" asChild>
                    <Link href={`/dashboard/investment/${investment.id}`}>View Details</Link>
                  </Button>
                  <Button
                    size="sm"
                    className="font-serif"
                    onClick={() => console.log(`[v0] Opening token purchase modal for ${investment.id}`)}
                  >
                    Buy More Tokens
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </TabsContent>

      <TabsContent value="revenue" className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="font-serif text-sm font-medium">This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="font-sans text-2xl font-bold">
                $
                {revenue
                  .filter((r) => r.distributionDate > Date.now() - 30 * 24 * 60 * 60 * 1000)
                  .reduce((sum, r) => sum + r.amount, 0)
                  .toLocaleString()}
              </div>
              <p className="font-serif text-xs text-muted-foreground">Revenue received</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="font-serif text-sm font-medium">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="font-sans text-2xl font-bold">
                $
                {revenue
                  .filter((r) => r.status === "pending")
                  .reduce((sum, r) => sum + r.amount, 0)
                  .toLocaleString()}
              </div>
              <p className="font-serif text-xs text-muted-foreground">Awaiting distribution</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="font-serif text-sm font-medium">Total Lifetime</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="font-sans text-2xl font-bold">
                $
                {revenue
                  .filter((r) => r.status === "completed")
                  .reduce((sum, r) => sum + r.amount, 0)
                  .toLocaleString()}
              </div>
              <p className="font-serif text-xs text-muted-foreground">All-time earnings</p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-3">
          {revenue.map((distribution) => (
            <Card key={distribution.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <DollarSign className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-sans font-semibold text-foreground">{distribution.propertyTitle}</h4>
                      <p className="font-serif text-sm text-muted-foreground">
                        {distribution.type.charAt(0).toUpperCase() + distribution.type.slice(1)} payment
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-sans font-semibold text-foreground">
                      ${distribution.amount.toLocaleString()} {distribution.currency}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={`font-serif text-xs ${getRevenueStatusColor(distribution.status)}`}>
                        {distribution.status}
                      </Badge>
                      <span className="font-serif text-xs text-muted-foreground">
                        {new Date(distribution.distributionDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  )
}
