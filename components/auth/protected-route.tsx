"use client"

import type React from "react"

import { useAuth } from "@/contexts/auth-context"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

interface ProtectedRouteProps {
  children: React.ReactNode
  requireVerification?: boolean
}

export function ProtectedRoute({ children, requireVerification = false }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  console.log("[v0] ProtectedRoute - isLoading:", isLoading, "user:", user ? "authenticated" : "not authenticated")

  useEffect(() => {
    console.log("[v0] ProtectedRoute useEffect - isLoading:", isLoading, "user:", !!user)

    if (!isLoading && !user) {
      console.log("[v0] ProtectedRoute - No user found, redirecting to home")
      router.push("/")
    }

    if (!isLoading && user && requireVerification && !user.isVerified) {
      console.log("[v0] ProtectedRoute - User not verified, redirecting to verify")
      router.push("/verify")
    }
  }, [user, isLoading, requireVerification, router])

  if (isLoading) {
    console.log("[v0] ProtectedRoute - Still loading, showing spinner")
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
          <p className="font-serif text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    console.log("[v0] ProtectedRoute - No user, returning null")
    return null
  }

  if (requireVerification && !user.isVerified) {
    console.log("[v0] ProtectedRoute - User not verified, returning null")
    return null
  }

  console.log("[v0] ProtectedRoute - User authenticated, rendering children")
  return <>{children}</>
}
