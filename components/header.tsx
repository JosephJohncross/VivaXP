"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Menu, X, Home, Building, Zap, Users } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { LoginDialog } from "@/components/auth/login-dialog"
import { UserMenu } from "@/components/auth/user-menu"
import { TextToSpeech } from "@/components/ui/text-to-speech"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const { user, isLoading } = useAuth()

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 cyber-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary text-white glow-effect group-hover:pulse-glow">
                <Zap className="h-5 w-5 neon-glow" />
              </div>
              <span className="font-sans text-xl font-bold text-gradient-primary neon-glow">VidaXP</span>
            </Link>

            <nav className="hidden md:flex items-center space-x-6">
              <Link
                href="/"
                className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary transition-all duration-300 hover:neon-glow"
              >
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Link>
              <Link
                href="/listings"
                className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-primary transition-all duration-300 hover:neon-glow"
              >
                <Building className="h-4 w-4" />
                <span>Properties</span>
              </Link>
              <Link
                href="/select-role"
                className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-accent transition-all duration-300 hover:neon-glow"
              >
                <Users className="h-4 w-4" />
                <span>Get Started</span>
              </Link>
            </nav>

            <div className="hidden lg:flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground neon-glow" />
                <Input
                  placeholder="Search properties..."
                  className="w-64 pl-10 font-serif cyber-card border-primary/30 focus:neon-border"
                />
              </div>
              <TextToSpeech 
                text="Welcome to VidaXP - Your Web3 Real Estate Platform. Navigate through our cyberpunk-themed interface to discover tokenized real estate investments, manage your portfolio, and explore the future of property ownership."
                variant="ghost"
                size="icon"
                showControls={true}
                className="hidden md:flex"
              />
              {isLoading ? (
                <Button disabled className="font-serif">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                    Loading...
                  </div>
                </Button>
              ) : user ? (
                <UserMenu />
              ) : (
                <Button
                  onClick={() => setIsLoginOpen(true)}
                  className="font-serif gradient-primary text-white glow-effect border-0 hover:pulse-glow"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Connect Wallet
                </Button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center space-x-2 md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
              >
                {isMenuOpen ? <X className="h-6 w-6 neon-glow" /> : <Menu className="h-6 w-6 neon-glow" />}
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="md:hidden border-t border-border bg-background/95 backdrop-blur cyber-card">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <Link
                  href="/"
                  className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-muted rounded-lg transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center gap-2">
                    <Home className="h-4 w-4" />
                    Home
                  </div>
                </Link>
                <Link
                  href="/listings"
                  className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-primary hover:bg-muted rounded-lg transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4" />
                    Properties
                  </div>
                </Link>
                <Link
                  href="/select-role"
                  className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-accent hover:bg-muted rounded-lg transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Get Started
                  </div>
                </Link>
                <div className="px-3 py-2">
                  <Input placeholder="Search properties..." className="w-full mb-3 cyber-card" />
                  {isLoading ? (
                    <Button disabled className="w-full">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                        Loading...
                      </div>
                    </Button>
                  ) : user ? (
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-foreground neon-glow">
                        Welcome, {user.name || user.email?.split("@")[0] || "User"}
                      </div>
                      <UserMenu />
                    </div>
                  ) : (
                    <Button
                      onClick={() => {
                        setIsLoginOpen(true)
                        setIsMenuOpen(false)
                      }}
                      className="w-full gradient-primary text-white glow-effect border-0"
                    >
                      <Zap className="w-4 h-4 mr-2" />
                      Connect Wallet
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      <LoginDialog open={isLoginOpen} onOpenChange={setIsLoginOpen} />
    </>
  )
}
