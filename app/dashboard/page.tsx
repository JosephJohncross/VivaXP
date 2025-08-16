import { ProtectedRoute } from "@/components/auth/protected-route"
import { PortfolioOverview } from "@/components/dashboard/portfolio-overview"
import { InvestmentHoldings } from "@/components/dashboard/investment-holdings"
import { InvestmentOpportunities } from "@/components/dashboard/investment-opportunities"
import { TextToSpeech } from "@/components/ui/text-to-speech"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, Zap } from "lucide-react"

export default function DashboardPage() {
  console.log("[v0] Dashboard page rendering")

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background cyber-grid">
        {/* Animated background effects */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/8 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/8 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-accent/8 rounded-full blur-3xl animate-pulse delay-2000" />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-8 h-8 text-primary neon-glow" />
              <h1 className="text-3xl font-bold text-gradient-primary">Investment Dashboard</h1>
              <Zap className="w-6 h-6 text-secondary neon-glow" />
              <TextToSpeech 
                text="Investment Dashboard - Track your real estate investments and portfolio performance. View your portfolio overview, investment holdings, and discover new investment opportunities in tokenized real estate."
                variant="ghost"
                size="icon"
                showControls={false}
              />
            </div>
            <p className="text-muted-foreground">
              Track your real estate investments and portfolio performance
            </p>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 cyber-card border-border/50">
              <TabsTrigger value="overview" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:border-primary/50 transition-all duration-300">
                Portfolio Overview
              </TabsTrigger>
              <TabsTrigger value="holdings" className="data-[state=active]:bg-secondary/20 data-[state=active]:text-secondary data-[state=active]:border-secondary/50 transition-all duration-300">
                My Holdings
              </TabsTrigger>
              <TabsTrigger value="opportunities" className="data-[state=active]:bg-accent/20 data-[state=active]:text-accent data-[state=active]:border-accent/50 transition-all duration-300">
                Opportunities
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <PortfolioOverview />
            </TabsContent>

            <TabsContent value="holdings">
              <InvestmentHoldings />
            </TabsContent>

            <TabsContent value="opportunities">
              <InvestmentOpportunities />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ProtectedRoute>
  )
}
