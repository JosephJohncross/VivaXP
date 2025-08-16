import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/contexts/auth-context"
import { WagmiProvider } from "@/components/providers/wagmi-provider"
import { Toaster } from "@/components/ui/toaster"
import { FloatingAIAssistant } from "@/components/ui/floating-ai-assistant"
import { ClientProviders } from "@/components/providers/client-providers"
import { ThemeProvider } from "@/components/theme-provider"
import { ErrorBoundary } from "@/components/error-boundary"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
  fallback: ['system-ui', 'arial'],
})

export const metadata: Metadata = {
  title: "VidaXP - Web3 Real Estate Platform",
  description: "Tokenized real estate investments with secure escrow transactions",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`} suppressHydrationWarning>
      <body>
        <ErrorBoundary>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <ClientProviders>{children}</ClientProviders>
            <FloatingAIAssistant />
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
