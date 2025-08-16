"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Wallet, Mail, User, Building, TrendingUp, Home } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"

interface RegistrationFlowProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function RegistrationFlow({ open, onOpenChange }: RegistrationFlowProps) {
  const [step, setStep] = useState(1)
  const [userType, setUserType] = useState<string>("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    userType: "",
    agreeToTerms: false,
  })
  const { connectWallet, loginWithEmail, setUserData } = useAuth()
  const router = useRouter()

  const handleUserTypeSelect = (type: string) => {
    setUserType(type)
    setFormData({ ...formData, userType: type })
    setStep(2)
  }

  const handleWalletConnect = async () => {
    try {
      await connectWallet()
      setStep(3)
    } catch (error) {
      console.error("Wallet connection failed:", error)
    }
  }

  const handleEmailSignup = async () => {
    try {
      await loginWithEmail(formData.email, "temp-password") // In real app, this would be proper signup
      setStep(3)
    } catch (error) {
      console.error("Email signup failed:", error)
    }
  }

  const handleComplete = async () => {
    console.log("[v0] Completing registration for user type:", userType)

    try {
      // Create a mock user object with the registration data
      const userData = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        userType: userType,
        isVerified: false,
        walletAddress: null, // Will be set if wallet was connected
        authMethod: "email" as const,
      }

      setUserData(userData)

      // Small delay to ensure auth context is updated
      await new Promise((resolve) => setTimeout(resolve, 200))

      const dashboardRoutes = {
        investor: "/dashboard",
        renter: "/dashboard/tenant",
        developer: "/dashboard/developer",
        landlord: "/dashboard/property-owner",
      }

      const route = dashboardRoutes[userType as keyof typeof dashboardRoutes] || "/dashboard"
      console.log("[v0] Redirecting", userType, "to:", route)

      onOpenChange(false)

      // Use router.push instead of window.location.href for better navigation
      router.push(route)
    } catch (error) {
      console.error("[v0] Error completing registration:", error)
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-gradient">Welcome to VidaXP</CardTitle>
          <CardDescription>
            {step === 1 && "Choose your role to get started"}
            {step === 2 && "Connect your account"}
            {step === 3 && "Complete your profile"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className="h-20 flex-col space-y-2 bg-transparent"
                  onClick={() => handleUserTypeSelect("investor")}
                >
                  <TrendingUp className="h-6 w-6" />
                  <span>Investor</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-20 flex-col space-y-2 bg-transparent"
                  onClick={() => handleUserTypeSelect("renter")}
                >
                  <Home className="h-6 w-6" />
                  <span>Renter</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-20 flex-col space-y-2 bg-transparent"
                  onClick={() => handleUserTypeSelect("developer")}
                >
                  <Building className="h-6 w-6" />
                  <span>Developer</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-20 flex-col space-y-2 bg-transparent"
                  onClick={() => handleUserTypeSelect("landlord")}
                >
                  <User className="h-6 w-6" />
                  <span>Landlord</span>
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <Tabs defaultValue="wallet" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="wallet">Wallet</TabsTrigger>
                <TabsTrigger value="email">Email</TabsTrigger>
              </TabsList>
              <TabsContent value="wallet" className="space-y-4">
                <div className="text-center space-y-4">
                  <Wallet className="h-12 w-12 mx-auto text-primary" />
                  <p className="text-sm text-muted-foreground">
                    Connect your crypto wallet to get started with Web3 features
                  </p>
                  <Button onClick={handleWalletConnect} className="w-full gradient-primary text-white">
                    Connect Wallet
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="email" className="space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <Button onClick={handleEmailSignup} className="w-full gradient-secondary text-white">
                    <Mail className="h-4 w-4 mr-2" />
                    Continue with Email
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    A crypto wallet will be created for you automatically
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) => setFormData({ ...formData, agreeToTerms: checked as boolean })}
                />
                <Label htmlFor="terms" className="text-sm">
                  I agree to the Terms of Service and Privacy Policy
                </Label>
              </div>
              <Button
                onClick={handleComplete}
                disabled={!formData.agreeToTerms}
                className="w-full gradient-primary text-white"
              >
                Complete Registration
              </Button>
            </div>
          )}

          {step > 1 && (
            <Button variant="ghost" onClick={() => setStep(step - 1)} className="w-full mt-4">
              Back
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
