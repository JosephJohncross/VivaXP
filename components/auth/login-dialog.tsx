"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/contexts/auth-context"
import { Wallet, Mail, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { RegistrationFlow } from "./registration-flow"

const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

type EmailFormData = z.infer<typeof emailSchema>

interface LoginDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function LoginDialog({ open, onOpenChange }: LoginDialogProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("wallet")
  const [showRegistration, setShowRegistration] = useState(false)
  const { login } = useAuth()
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
  })

  const handleWalletLogin = async () => {
    setIsLoading(true)
    try {
      await login("wallet")
      onOpenChange(false)
      toast({
        title: "Wallet Connected",
        description: "Successfully connected to your wallet",
      })
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Failed to connect wallet. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleEmailLogin = async (data: EmailFormData) => {
    setIsLoading(true)
    try {
      await login("email", data)
      onOpenChange(false)
      reset()
      toast({
        title: "Login Successful",
        description: "Welcome back to VidaXP",
      })
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignupClick = () => {
    onOpenChange(false)
    setShowRegistration(true)
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-sans text-2xl text-center text-gradient">Welcome to VidaXP</DialogTitle>
            <DialogDescription className="font-serif text-center">
              Connect your wallet or sign in with email to get started
            </DialogDescription>
          </DialogHeader>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="wallet" className="font-serif">
                <Wallet className="h-4 w-4 mr-2" />
                Wallet
              </TabsTrigger>
              <TabsTrigger value="email" className="font-serif">
                <Mail className="h-4 w-4 mr-2" />
                Email
              </TabsTrigger>
            </TabsList>

            <TabsContent value="wallet" className="space-y-4">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto glow-effect">
                  <Wallet className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="font-sans font-semibold text-foreground mb-2">Connect Your Wallet</h3>
                  <p className="font-serif text-sm text-muted-foreground">
                    Use your Web3 wallet to securely access your account and manage investments
                  </p>
                </div>
                <Button
                  onClick={handleWalletLogin}
                  disabled={isLoading}
                  className="w-full font-serif gradient-primary text-white border-0 glow-effect"
                  size="lg"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Connecting...
                    </>
                  ) : (
                    <>
                      <Wallet className="h-4 w-4 mr-2" />
                      Connect Wallet
                    </>
                  )}
                </Button>
                <p className="font-serif text-xs text-muted-foreground">
                  Supports MetaMask, WalletConnect, and Coinbase Wallet
                </p>
              </div>
            </TabsContent>

            <TabsContent value="email" className="space-y-4">
              <form onSubmit={handleSubmit(handleEmailLogin)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="font-serif">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="font-serif"
                    {...register("email")}
                  />
                  {errors.email && <p className="text-sm text-destructive font-serif">{errors.email.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="font-serif">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className="font-serif"
                    {...register("password")}
                  />
                  {errors.password && <p className="text-sm text-destructive font-serif">{errors.password.message}</p>}
                </div>
                <Button type="submit" disabled={isLoading} className="w-full font-serif" size="lg">
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Signing In...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>

              <Separator />

              <div className="text-center">
                <p className="font-serif text-sm text-muted-foreground">
                  Don't have an account?{" "}
                  <Button variant="link" className="p-0 h-auto font-serif text-primary" onClick={handleSignupClick}>
                    Sign up here
                  </Button>
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      <RegistrationFlow open={showRegistration} onOpenChange={setShowRegistration} />
    </>
  )
}
