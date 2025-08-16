"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TextToSpeech } from "@/components/ui/text-to-speech"
import { TrendingUp, Home, Users, Building2, Wallet, ArrowRight, Zap, Shield, Globe } from "lucide-react"
import { useRouter } from "next/navigation"

const userTypes = [
  {
    id: "investor",
    title: "Crypto Investor",
    description: "Invest in tokenized real estate and earn passive income through blockchain technology",
    icon: TrendingUp,
    features: ["Portfolio Tracking", "ROI Analytics", "Token Staking", "DAO Governance"],
    route: "/dashboard",
    gradient: "gradient-primary",
    glowColor: "rgba(16, 185, 129, 0.6)",
  },
  {
    id: "tenant",
    title: "Digital Tenant",
    description: "Find and rent properties with crypto payments and smart contract security",
    icon: Home,
    features: ["Property Search", "Crypto Payments", "Smart Contracts", "Rental History"],
    route: "/dashboard/tenant",
    gradient: "gradient-secondary",
    glowColor: "rgba(0, 209, 255, 0.6)",
  },
  {
    id: "owner",
    title: "Property Owner",
    description: "Tokenize your properties and manage rentals through blockchain infrastructure",
    icon: Building2,
    features: ["Property Tokenization", "Revenue Tracking", "Tenant Management", "Smart Escrow"],
    route: "/dashboard/property-owner",
    gradient: "gradient-accent",
    glowColor: "rgba(245, 0, 87, 0.6)",
  },
  {
    id: "developer",
    title: "Real Estate Developer",
    description: "Launch property projects with Web3 funding and decentralized governance",
    icon: Users,
    features: ["Project Funding", "Token Launches", "Community Building", "Development Tools"],
    route: "/dashboard/developer",
    gradient: "gradient-primary",
    glowColor: "rgba(16, 185, 129, 0.6)",
  },
]

export default function SelectRolePage() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const router = useRouter()

  const handleRoleSelect = async (userType: (typeof userTypes)[0]) => {
    setSelectedRole(userType.id)
    setIsConnecting(true)

    // Simulate connection process
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const userData = {
      id: `user_${Date.now()}`,
      email: `${userType.id}@vidaxp.demo`,
      name: `Demo ${userType.title}`,
      userType: userType.id,
      isVerified: true,
      walletAddress: `0x${Math.random().toString(16).substr(2, 40)}`,
      createdAt: new Date().toISOString(),
    }

    // Store user data in localStorage
    localStorage.setItem("vidaxp_user", JSON.stringify(userData))

    console.log(`[v0] User authenticated:`, userData)
    console.log(`[v0] Redirecting ${userType.id} to ${userType.route}`)

    // Small delay to ensure localStorage is written
    await new Promise((resolve) => setTimeout(resolve, 100))

    router.push(userType.route)
  }

  return (
    <div className="min-h-screen bg-background cyber-grid">
      {/* Animated background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-accent/10 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-6">
            <Zap className="w-8 h-8 text-primary neon-glow" />
            <h1 className="text-4xl md:text-6xl font-bold text-gradient-primary">VidaXP</h1>
            <Shield className="w-8 h-8 text-secondary neon-glow" />
          </div>

          <div className="flex items-center justify-center gap-4 mb-4">
            <h2 className="text-2xl md:text-4xl font-bold">
              Choose Your <span className="text-gradient-neon">Web3 Journey</span>
            </h2>
            <TextToSpeech 
              text="Choose Your Web3 Journey - Enter the future of real estate with blockchain technology. Select your role to access personalized features and start your decentralized property experience. Choose from Crypto Investor, Property Owner, Tenant, or Real Estate Developer."
              variant="ghost"
              size="icon"
              showControls={true}
            />
          </div>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Enter the future of real estate with blockchain technology. Select your role to access personalized features
            and start your decentralized property experience.
          </p>

          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-primary" />
              <span>Decentralized</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-secondary" />
              <span>Secure</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-accent" />
              <span>Instant</span>
            </div>
          </div>
        </div>

        {/* Role Selection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {userTypes.map((userType) => {
            const Icon = userType.icon
            const isSelected = selectedRole === userType.id
            const isLoading = isConnecting && isSelected

            return (
              <Card
                key={userType.id}
                className={`
                  relative overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105
                  ${isSelected ? "neon-border" : "border-border hover:border-primary/50"}
                  cyber-card glow-on-hover hologram-effect
                `}
                onClick={() => !isConnecting && handleRoleSelect(userType)}
                style={{
                  boxShadow: isSelected ? `0 0 30px ${userType.glowColor}` : undefined,
                }}
              >
                <CardHeader className="text-center pb-4">
                  <div
                    className={`w-16 h-16 mx-auto mb-4 rounded-full ${userType.gradient} flex items-center justify-center ${isSelected ? "pulse-glow" : ""}`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  <CardTitle className="text-xl mb-2 flex items-center justify-center gap-2">
                    {userType.title}
                    {isSelected && (
                      <Badge variant="secondary" className="text-xs">
                        {isLoading ? "Connecting..." : "Selected"}
                      </Badge>
                    )}
                  </CardTitle>

                  <CardDescription className="text-sm">{userType.description}</CardDescription>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="space-y-2 mb-6">
                    {userType.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary neon-glow" />
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    className={`w-full ${userType.gradient} hover:opacity-90 transition-all duration-300`}
                    disabled={isConnecting}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Connecting...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Wallet className="w-4 h-4" />
                        Connect & Enter
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    )}
                  </Button>
                </CardContent>

                {/* Animated border effect */}
                {isSelected && (
                  <div className="absolute inset-0 rounded-lg border-2 border-primary/50 animate-pulse pointer-events-none" />
                )}
              </Card>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-4">
            New to Web3? Don't worry - we'll guide you through the setup process.
          </p>

          <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground">
            <span>🔒 Secure Wallet Integration</span>
            <span>⚡ Instant Transactions</span>
            <span>🌐 Global Access</span>
          </div>
        </div>
      </div>
    </div>
  )
}
