"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, PieChart, Pie, Cell } from "recharts"
import { portfolioService } from "@/lib/services/portfolio-service"
import type { PortfolioSummary } from "@/lib/services/portfolio-service"
import { TrendingUp, DollarSign, Building, Coins, Download, ArrowUpRight, ArrowDownRight } from "lucide-react"

const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))"]

export function PortfolioOverview() {
  const [summary, setSummary] = useState<PortfolioSummary | null>(null)
  const [performanceData, setPerformanceData] = useState<any[]>([])
  const [distributionData, setDistributionData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadPortfolioData()
  }, [])

  const loadPortfolioData = async () => {
    try {
      const [summaryData, performance, distribution] = await Promise.all([
        portfolioService.getPortfolioSummary(),
        portfolioService.getPortfolioPerformanceData(),
        portfolioService.getPropertyDistribution(),
      ])

      setSummary(summaryData)
      setPerformanceData(performance)
      setDistributionData(distribution)
    } catch (error) {
      console.error("Error loading portfolio data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleExportReport = async () => {
    try {
      const reportUrl = await portfolioService.exportPortfolioReport()
      const link = document.createElement("a")
      link.href = reportUrl
      link.download = `portfolio-report-${new Date().toISOString().split("T")[0]}.json`
      link.click()
    } catch (error) {
      console.error("Error exporting report:", error)
    }
  }

  if (isLoading || !summary) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-4 bg-muted rounded w-1/2 mb-2"></div>
              <div className="h-8 bg-muted rounded w-3/4"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card className="cyber-card border border-border/50 glow-on-hover hologram-effect transition-all duration-300 hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-gradient-primary">Portfolio Value</CardTitle>
            <DollarSign className="h-4 w-4 text-primary neon-glow" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold text-gradient-primary">${summary.currentValue.toLocaleString()}</div>
            <div className="flex items-center text-xs">
              {summary.portfolioGrowth >= 0 ? (
                <ArrowUpRight className="h-3 w-3 text-primary neon-glow mr-1" />
              ) : (
                <ArrowDownRight className="h-3 w-3 text-destructive neon-glow mr-1" />
              )}
              <span className={summary.portfolioGrowth >= 0 ? "text-primary" : "text-destructive"}>
                {summary.portfolioGrowth.toFixed(1)}%
              </span>
              <span className="text-muted-foreground ml-1 hidden sm:inline">from cost basis</span>
            </div>
          </CardContent>
        </Card>

        <Card className="cyber-card border border-border/50 glow-on-hover hologram-effect transition-all duration-300 hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gradient-secondary">Monthly Income</CardTitle>
            <TrendingUp className="h-4 w-4 text-secondary neon-glow" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gradient-secondary">${summary.monthlyIncome.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{summary.averageROI.toFixed(1)}% average ROI</p>
          </CardContent>
        </Card>

        <Card className="cyber-card border border-border/50 glow-on-hover hologram-effect transition-all duration-300 hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gradient-accent">Properties Owned</CardTitle>
            <Building className="h-4 w-4 text-accent neon-glow" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gradient-accent">{summary.propertiesOwned}</div>
            <p className="text-xs text-muted-foreground">{summary.tokensOwned} tokens total</p>
          </CardContent>
        </Card>

        <Card className="cyber-card border border-border/50 glow-on-hover hologram-effect transition-all duration-300 hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gradient-primary">Total Returns</CardTitle>
            <Coins className="h-4 w-4 text-primary neon-glow" />
          </CardHeader>
          <CardContent>
            <div className="font-sans text-2xl font-bold">${summary.totalReturns.toLocaleString()}</div>
            <p className="font-serif text-xs text-muted-foreground">Lifetime earnings</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <Card className="cyber-card border border-border/50 glow-on-hover hologram-effect">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg text-gradient-primary">Portfolio Performance</CardTitle>
            <Button variant="outline" size="sm" onClick={handleExportReport} className="border-primary/50 text-primary hover:border-primary hover:bg-primary/10 transition-all duration-300">
              <Download className="h-4 w-4 mr-2 neon-glow" />
              <span className="hidden sm:inline">Export Report</span>
              <span className="sm:hidden">Export</span>
            </Button>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                value: { label: "Portfolio Value", color: "hsl(var(--chart-1))" },
                returns: { label: "Monthly Returns", color: "hsl(var(--chart-2))" },
              }}
              className="h-[250px] sm:h-[300px]"
            >
              <LineChart data={performanceData}>
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="hsl(var(--chart-1))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--chart-1))" }}
                />
                <Line
                  type="monotone"
                  dataKey="returns"
                  stroke="hsl(var(--chart-2))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--chart-2))" }}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="cyber-card border border-border/50 glow-on-hover hologram-effect">
          <CardHeader>
            <CardTitle className="text-lg text-gradient-secondary">Property Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                apartment: { label: "Apartment", color: "hsl(var(--chart-1))" },
                commercial: { label: "Commercial", color: "hsl(var(--chart-2))" },
                villa: { label: "Villa", color: "hsl(var(--chart-3))" },
              }}
              className="h-[250px] sm:h-[300px]"
            >
              <PieChart>
                <Pie
                  data={distributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {distributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
            <div className="flex justify-center space-x-4 mt-4">
              {distributionData.map((entry, index) => (
                <div key={entry.type} className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                  <span className="font-serif text-sm text-muted-foreground">
                    {entry.type} ({entry.value}%)
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
