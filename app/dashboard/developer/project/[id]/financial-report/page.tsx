"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Download, TrendingUp, TrendingDown, DollarSign, PieChart, BarChart3, Calendar } from "lucide-react"

export default function FinancialReportPage() {
  const params = useParams()
  const router = useRouter()
  const [reportPeriod, setReportPeriod] = useState("current-quarter")

  // Mock financial data
  const project = {
    id: params.id,
    name: "Skyline Towers",
    location: "Lekki, Lagos",
    financials: {
      totalInvestment: 15000000,
      currentSpent: 9750000,
      projectedRevenue: 22000000,
      currentRevenue: 11700000,
      monthlyExpenses: [
        { month: "Jan", amount: 850000 },
        { month: "Feb", amount: 920000 },
        { month: "Mar", amount: 1100000 },
        { month: "Apr", amount: 980000 },
        { month: "May", amount: 1200000 },
        { month: "Jun", amount: 1050000 },
      ],
      expenseBreakdown: [
        { category: "Materials", amount: 4500000, percentage: 46 },
        { category: "Labor", amount: 2800000, percentage: 29 },
        { category: "Equipment", amount: 1200000, percentage: 12 },
        { category: "Permits & Legal", amount: 650000, percentage: 7 },
        { category: "Other", amount: 600000, percentage: 6 },
      ],
      revenueStreams: [
        { source: "Pre-sales", amount: 8500000, percentage: 73 },
        { source: "Token Sales", amount: 2200000, percentage: 19 },
        { source: "Rental Income", amount: 1000000, percentage: 8 },
      ],
    },
  }

  const handleDownloadReport = () => {
    console.log("[v0] Downloading financial report for", project.name)
    alert("Financial report downloaded successfully!")
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const profitMargin = (
    ((project.financials.projectedRevenue - project.financials.totalInvestment) / project.financials.projectedRevenue) *
    100
  ).toFixed(1)
  const spentPercentage = ((project.financials.currentSpent / project.financials.totalInvestment) * 100).toFixed(1)

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button onClick={() => router.back()} className="p-2 hover:bg-secondary rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Financial Report: {project.name}
              </h1>
              <p className="text-muted-foreground">{project.location}</p>
            </div>
          </div>

          <div className="flex gap-4">
            <select
              value={reportPeriod}
              onChange={(e) => setReportPeriod(e.target.value)}
              className="p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="current-quarter">Current Quarter</option>
              <option value="ytd">Year to Date</option>
              <option value="all-time">All Time</option>
            </select>
            <button
              onClick={handleDownloadReport}
              className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90"
            >
              <Download className="w-4 h-4" />
              Download Report
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-card rounded-lg border p-6">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-5 h-5 text-primary" />
              <h3 className="text-sm font-medium text-muted-foreground">Total Investment</h3>
            </div>
            <p className="text-2xl font-bold">{formatCurrency(project.financials.totalInvestment)}</p>
            <p className="text-xs text-muted-foreground mt-1">Initial funding</p>
          </div>

          <div className="bg-card rounded-lg border p-6">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="w-5 h-5 text-red-500" />
              <h3 className="text-sm font-medium text-muted-foreground">Amount Spent</h3>
            </div>
            <p className="text-2xl font-bold">{formatCurrency(project.financials.currentSpent)}</p>
            <p className="text-xs text-red-600 mt-1">{spentPercentage}% of budget</p>
          </div>

          <div className="bg-card rounded-lg border p-6">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              <h3 className="text-sm font-medium text-muted-foreground">Current Revenue</h3>
            </div>
            <p className="text-2xl font-bold">{formatCurrency(project.financials.currentRevenue)}</p>
            <p className="text-xs text-green-600 mt-1">53% of projected</p>
          </div>

          <div className="bg-card rounded-lg border p-6">
            <div className="flex items-center gap-2 mb-2">
              <PieChart className="w-5 h-5 text-blue-500" />
              <h3 className="text-sm font-medium text-muted-foreground">Profit Margin</h3>
            </div>
            <p className="text-2xl font-bold">{profitMargin}%</p>
            <p className="text-xs text-blue-600 mt-1">Projected</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Monthly Expenses Chart */}
          <div className="bg-card rounded-lg border p-6">
            <div className="flex items-center gap-2 mb-6">
              <BarChart3 className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Monthly Expenses</h3>
            </div>
            <div className="space-y-4">
              {project.financials.monthlyExpenses.map((expense, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{expense.month}</span>
                  <div className="flex items-center gap-4 flex-1 ml-4">
                    <div className="flex-1 bg-secondary rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full"
                        style={{ width: `${(expense.amount / 1200000) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold w-20 text-right">{formatCurrency(expense.amount)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Expense Breakdown */}
          <div className="bg-card rounded-lg border p-6">
            <div className="flex items-center gap-2 mb-6">
              <PieChart className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Expense Breakdown</h3>
            </div>
            <div className="space-y-4">
              {project.financials.expenseBreakdown.map((expense, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{expense.category}</span>
                  <div className="flex items-center gap-4 flex-1 ml-4">
                    <div className="flex-1 bg-secondary rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full"
                        style={{ width: `${expense.percentage}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold w-16 text-right">{expense.percentage}%</span>
                    <span className="text-sm text-muted-foreground w-20 text-right">
                      {formatCurrency(expense.amount)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Revenue Streams */}
          <div className="bg-card rounded-lg border p-6">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-5 h-5 text-green-500" />
              <h3 className="text-lg font-semibold">Revenue Streams</h3>
            </div>
            <div className="space-y-4">
              {project.financials.revenueStreams.map((revenue, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{revenue.source}</span>
                  <div className="flex items-center gap-4 flex-1 ml-4">
                    <div className="flex-1 bg-secondary rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full"
                        style={{ width: `${revenue.percentage}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold w-16 text-right">{revenue.percentage}%</span>
                    <span className="text-sm text-muted-foreground w-20 text-right">
                      {formatCurrency(revenue.amount)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Financial Summary */}
          <div className="bg-card rounded-lg border p-6">
            <div className="flex items-center gap-2 mb-6">
              <Calendar className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Financial Summary</h3>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Total Investment</span>
                <span className="font-semibold">{formatCurrency(project.financials.totalInvestment)}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Current Spent</span>
                <span className="font-semibold text-red-600">{formatCurrency(project.financials.currentSpent)}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Remaining Budget</span>
                <span className="font-semibold text-primary">
                  {formatCurrency(project.financials.totalInvestment - project.financials.currentSpent)}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Current Revenue</span>
                <span className="font-semibold text-green-600">
                  {formatCurrency(project.financials.currentRevenue)}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Projected Revenue</span>
                <span className="font-semibold">{formatCurrency(project.financials.projectedRevenue)}</span>
              </div>
              <div className="flex justify-between py-2 pt-4 border-t-2">
                <span className="font-medium">Expected Profit</span>
                <span className="font-bold text-green-600">
                  {formatCurrency(project.financials.projectedRevenue - project.financials.totalInvestment)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
