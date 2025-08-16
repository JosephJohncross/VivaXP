import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Coins, Shield, TrendingUp, Users, ArrowRight } from "lucide-react"

const investmentFeatures = [
  {
    icon: Coins,
    title: "Fractional Ownership",
    description:
      "Own a piece of premium real estate with as little as $100. Our ERC-1155 tokens represent verified property shares.",
    benefit: "Low entry barrier",
  },
  {
    icon: Shield,
    title: "Secure Escrow",
    description:
      "Smart contracts manage all transactions with multi-signature security. Your funds are protected until conditions are met.",
    benefit: "100% secure",
  },
  {
    icon: TrendingUp,
    title: "Passive Income",
    description:
      "Earn monthly rental income proportional to your token holdings. Track your ROI in real-time through our dashboard.",
    benefit: "8-15% annual returns",
  },
  {
    icon: Users,
    title: "Community Governance",
    description:
      "Token holders vote on major property decisions. Participate in the future of your investments through DAO governance.",
    benefit: "Democratic control",
  },
]

export function InvestmentSection() {
  return (
    <section className="py-16 lg:py-24 bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gradient-secondary mb-4">
            Tokenized Real Estate Investment
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Experience the future of property investment with blockchain technology. Transparent, secure, and accessible
            to everyone.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {investmentFeatures.map((feature, index) => (
            <Card key={index} className="text-center cyber-card border border-border/50 glow-on-hover hologram-effect transition-all duration-300 hover:scale-105">
              <CardHeader>
                <div className="mx-auto w-12 h-12 gradient-primary rounded-lg flex items-center justify-center mb-4 pulse-glow">
                  <feature.icon className="h-6 w-6 text-white neon-glow" />
                </div>
                <CardTitle className="text-lg text-gradient-primary">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">{feature.description}</p>
                <div className="inline-flex items-center text-sm font-medium text-gradient-accent">
                  <span>{feature.benefit}</span>
                  <ArrowRight className="h-4 w-4 ml-1 neon-glow" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Investment Process */}
        <div className="cyber-card rounded-lg p-8 mb-12 border border-border/50 glow-on-hover">
          <h3 className="text-2xl font-bold text-center text-gradient-accent mb-8">How It Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4 pulse-glow neon-border">
                1
              </div>
              <h4 className="font-semibold text-gradient-primary mb-2">Browse & Select</h4>
              <p className="text-sm text-muted-foreground">
                Explore verified properties and choose your investment amount
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 gradient-secondary rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4 pulse-glow neon-border">
                2
              </div>
              <h4 className="font-semibold text-gradient-secondary mb-2">Secure Purchase</h4>
              <p className="text-sm text-muted-foreground">
                Complete KYC and purchase tokens through our secure escrow system
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 gradient-accent rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4 pulse-glow neon-border">
                3
              </div>
              <h4 className="font-semibold text-gradient-accent mb-2">Earn Returns</h4>
              <p className="text-sm text-muted-foreground">
                Receive monthly rental income and track your portfolio growth
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Button size="lg" className="font-serif text-lg px-8 py-3">
            Start Investing Today
          </Button>
          <p className="font-serif text-sm text-muted-foreground mt-4">
            Minimum investment: $100 • No hidden fees • Instant liquidity
          </p>
        </div>
      </div>
    </section>
  )
}
