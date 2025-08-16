"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { portfolioService } from "@/lib/services/portfolio-service"
import type { InvestmentOpportunity } from "@/lib/services/portfolio-service"
import { TrendingUp, MapPin, DollarSign, Shield, AlertTriangle, Target } from "lucide-react"
import Link from "next/link"

export function InvestmentOpportunities() {
  const [opportunities, setOpportunities] = useState<InvestmentOpportunity[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadOpportunities()
  }, [])

  const loadOpportunities = async () => {
    try {
      const data = await portfolioService.getInvestmentOpportunities()
      setOpportunities(data)
    } catch (error) {
      console.error("Error loading opportunities:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low":
        return "bg-green-100 text-green-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "High":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case "Low":
        return <Shield className="h-3 w-3" />
      case "Medium":
        return <Target className="h-3 w-3" />
      case "High":
        return <AlertTriangle className="h-3 w-3" />
      default:
        return <Shield className="h-3 w-3" />
    }
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-32 bg-muted rounded mb-4"></div>
              <div className="h-4 bg-muted rounded w-2/3 mb-2"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gradient-accent">Investment Opportunities</h2>
          <p className="text-muted-foreground">Discover new tokenized real estate investments</p>
        </div>
        <Button variant="outline" className="border-accent/50 text-accent hover:border-accent hover:bg-accent/10 transition-all duration-300">
          View All Opportunities
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {opportunities.map((opportunity) => (
          <Card key={opportunity.id} className="overflow-hidden cyber-card border border-border/50 glow-on-hover hologram-effect transition-all duration-300 hover:scale-105">
            <div className="relative">
              <img
                src={opportunity.image || "/placeholder.svg"}
                alt={opportunity.propertyTitle}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <Badge variant="secondary" className="gradient-secondary text-white neon-border">
                  {opportunity.propertyType}
                </Badge>
                <Badge className="gradient-accent text-white neon-border">
                  {getRiskIcon(opportunity.riskLevel)}
                  <span className="ml-1">{opportunity.riskLevel} Risk</span>
                </Badge>
              </div>
              <div className="absolute top-4 right-4">
                <Badge variant="outline" className="bg-background/90 border-primary/50 text-primary neon-border">
                  <TrendingUp className="h-3 w-3 mr-1 neon-glow" />
                  {opportunity.expectedROI}% ROI
                </Badge>
              </div>
            </div>

            <CardHeader>
              <CardTitle className="text-lg text-gradient-primary">{opportunity.propertyTitle}</CardTitle>
              <div className="flex items-center text-muted-foreground">
                <MapPin className="h-4 w-4 mr-1 neon-glow" />
                <span className="text-sm">{opportunity.location}</span>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-1">
                  <p className="font-serif text-muted-foreground">Token Price</p>
                  <p className="font-sans font-semibold text-foreground">${opportunity.tokenPrice.toLocaleString()}</p>
                </div>
                <div className="space-y-1">
                  <p className="font-serif text-muted-foreground">Available</p>
                  <p className="font-sans font-semibold text-foreground">{opportunity.availableTokens} tokens</p>
                </div>
                <div className="space-y-1">
                  <p className="font-serif text-muted-foreground">Min. Investment</p>
                  <p className="font-sans font-semibold text-foreground">
                    ${opportunity.minimumInvestment.toLocaleString()}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="font-serif text-muted-foreground">Expected ROI</p>
                  <p className="font-sans font-semibold text-primary">{opportunity.expectedROI}%</p>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button variant="outline" className="flex-1 border-secondary/50 text-secondary hover:border-secondary hover:bg-secondary/10 transition-all duration-300" asChild>
                  <Link href={`/dashboard/opportunity/${opportunity.id}`}>Learn More</Link>
                </Button>
                <Button
                  className="flex-1 gradient-primary text-white glow-effect border-0 hover:pulse-glow"
                  onClick={() => console.log(`[v0] Opening investment modal for ${opportunity.id}`)}
                >
                  <DollarSign className="h-4 w-4 mr-2 neon-glow" />
                  Invest Now
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
