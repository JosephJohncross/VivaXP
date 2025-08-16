"use client"

import { ReactNode, useState, useEffect } from "react"
import { WagmiProvider, createConfig, http } from "wagmi"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { mainnet, polygon, celo } from "wagmi/chains"
import { metaMask, walletConnect, coinbaseWallet } from "wagmi/connectors"
import { AuthProvider } from "@/contexts/auth-context"

// Create QueryClient inside the component to avoid serialization issues
function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: (failureCount, error) => {
          // Don't retry on certain errors
          if (error?.message?.includes("EventEmitter2") || error?.message?.includes("Analytics SDK")) {
            return false
          }
          return failureCount < 3
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
      },
    },
  })
}

let browserQueryClient: QueryClient | undefined = undefined

function getQueryClient() {
  if (typeof window === "undefined") {
    // Server: always make a new query client
    return makeQueryClient()
  } else {
    // Browser: make a new query client if we don't already have one
    if (!browserQueryClient) browserQueryClient = makeQueryClient()
    return browserQueryClient
  }
}

interface ClientProvidersProps {
  children: ReactNode
}

// Create wagmi config only on client side to avoid SSR issues
function createClientWagmiConfig() {
  const projectId = "demo-project-id"
  
  return createConfig({
    chains: [mainnet, polygon, celo],
    connectors: [
      metaMask(),
      walletConnect({ 
        projectId,
        metadata: {
          name: "PropChain",
          description: "Web3 Real Estate Platform",
          url: typeof window !== "undefined" ? window.location.origin : "https://propchain.app",
          icons: ["https://propchain.app/icon.png"]
        },
        showQrModal: true
      }),
      coinbaseWallet({ 
        appName: "PropChain",
        appLogoUrl: "https://propchain.app/icon.png"
      })
    ],
    transports: {
      [mainnet.id]: http(),
      [polygon.id]: http(),
      [celo.id]: http(),
    },
    ssr: true,
  })
}

export function ClientProviders({ children }: ClientProvidersProps) {
  const [mounted, setMounted] = useState(false)
  const [wagmiConfig, setWagmiConfig] = useState<any>(null)
  const queryClient = getQueryClient()

  useEffect(() => {
    // Only create wagmi config on client side
    if (typeof window !== "undefined" && !wagmiConfig) {
      setWagmiConfig(createClientWagmiConfig())
      setMounted(true)
    }
  }, [wagmiConfig])

  // Show loading state during hydration
  if (!mounted || !wagmiConfig) {
    return (
      <QueryClientProvider client={queryClient}>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </QueryClientProvider>
    )
  }

  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={wagmiConfig}>
        <AuthProvider>{children}</AuthProvider>
      </WagmiProvider>
    </QueryClientProvider>
  )
}
