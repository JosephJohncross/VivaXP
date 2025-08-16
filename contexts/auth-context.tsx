"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { useAccount, useConnect, useDisconnect } from "wagmi"

interface User {
  id: string
  address?: string
  email?: string
  name?: string
  phone?: string
  userType?: string
  avatar?: string
  authMethod: "wallet" | "email"
  isVerified: boolean
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isConnected: boolean
  login: (method: "wallet" | "email", credentials?: { email: string; password: string }) => Promise<void>
  loginWithEmail: (email: string, password: string) => Promise<void>
  logout: () => void
  connectWallet: () => void
  disconnectWallet: () => void
  setUserData: (userData: User) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const { address, isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()

  useEffect(() => {
    const initAuth = async () => {
      try {
        console.log("[v0] Initializing auth context...")
        let savedUser = null
        try {
          savedUser = localStorage.getItem("vidaxp_user")
          console.log("[v0] Checking localStorage for saved user:", !!savedUser)
        } catch (storageError) {
          console.warn("[v0] localStorage access failed:", storageError)
        }

        if (savedUser) {
          const parsedUser = JSON.parse(savedUser)
          console.log("[v0] Loading saved user:", parsedUser)
          setUser(parsedUser)
        }

        if (isConnected && address && !savedUser) {
          console.log("[v0] Creating wallet user for address:", address)
          const walletUser: User = {
            id: address,
            address,
            authMethod: "wallet",
            isVerified: false,
          }
          setUser(walletUser)
          try {
            localStorage.setItem("vidaxp_user", JSON.stringify(walletUser))
          } catch (storageError) {
            console.warn("[v0] localStorage write failed:", storageError)
          }
        }
      } catch (error) {
        console.error("[v0] Auth initialization error:", error)
      } finally {
        console.log("[v0] Auth initialization complete, isLoading set to false")
        setIsLoading(false)
      }
    }

    initAuth()
  }, [isConnected, address])

  const setUserData = (userData: User) => {
    console.log("[v0] Setting user data:", userData)
    setUser(userData)
    try {
      localStorage.setItem("vidaxp_user", JSON.stringify(userData))
    } catch (storageError) {
      console.warn("[v0] localStorage write failed:", storageError)
    }
  }

  const login = async (method: "wallet" | "email", credentials?: { email: string; password: string }) => {
    setIsLoading(true)
    try {
      if (method === "wallet") {
        const connector = connectors[0]
        if (connector) {
          connect({ connector })
        }
      } else if (method === "email" && credentials) {
        const emailUser: User = {
          id: credentials.email,
          email: credentials.email,
          name: credentials.email.split("@")[0],
          authMethod: "email",
          isVerified: true,
        }
        setUser(emailUser)
        localStorage.setItem("vidaxp_user", JSON.stringify(emailUser))
      }
    } catch (error) {
      console.error("Login error:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const loginWithEmail = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      const emailUser: User = {
        id: email,
        email: email,
        name: email.split("@")[0],
        authMethod: "email",
        isVerified: true,
      }
      setUser(emailUser)
      localStorage.setItem("vidaxp_user", JSON.stringify(emailUser))
      console.log("[v0] Email login successful for:", email)
    } catch (error) {
      console.error("Email login error:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    try {
      localStorage.removeItem("vidaxp_user")
    } catch (storageError) {
      console.warn("[v0] localStorage removal failed:", storageError)
    }
    if (isConnected) {
      disconnect()
    }
  }

  const connectWallet = async () => {
    try {
      const connector = connectors[0]
      if (connector) {
        await connect({ connector })
        console.log("[v0] Wallet connection successful")
      }
    } catch (error) {
      console.error("[v0] Wallet connection failed:", error)
      throw error
    }
  }

  const disconnectWallet = () => {
    disconnect()
    logout()
  }

  const value: AuthContextType = {
    user,
    isLoading,
    isConnected,
    login,
    loginWithEmail,
    logout,
    connectWallet,
    disconnectWallet,
    setUserData,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
