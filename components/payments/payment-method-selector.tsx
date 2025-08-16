"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Wallet, CreditCard, Smartphone, Shield, CheckCircle } from "lucide-react"
import type { PaymentMethod } from "@/lib/contracts/escrow-types"

interface PaymentMethodSelectorProps {
  amount: string
  currency: string
  onMethodSelect: (method: PaymentMethod) => void
  selectedMethod?: PaymentMethod
}

const cryptoMethods = [
  {
    type: "crypto" as const,
    currency: "USDT",
    provider: "metamask" as const,
    name: "USDT (Tether)",
    icon: Wallet,
    description: "Stable cryptocurrency pegged to USD",
    fees: "0.1%",
    processingTime: "2-5 minutes",
  },
  {
    type: "crypto" as const,
    currency: "CELO",
    provider: "metamask" as const,
    name: "CELO",
    icon: Wallet,
    description: "Mobile-first cryptocurrency",
    fees: "0.05%",
    processingTime: "1-3 minutes",
  },
  {
    type: "crypto" as const,
    currency: "ETH",
    provider: "metamask" as const,
    name: "Ethereum (ETH)",
    icon: Wallet,
    description: "Native Ethereum cryptocurrency",
    fees: "Gas fees apply",
    processingTime: "2-10 minutes",
  },
]

const fiatMethods = [
  {
    type: "fiat" as const,
    currency: "NGN",
    provider: "paystack" as const,
    name: "Bank Card",
    icon: CreditCard,
    description: "Visa, Mastercard, Verve cards",
    fees: "1.5%",
    processingTime: "Instant",
  },
  {
    type: "fiat" as const,
    currency: "NGN",
    provider: "paystack" as const,
    name: "Bank Transfer",
    icon: CreditCard,
    description: "Direct bank account transfer",
    fees: "0.5%",
    processingTime: "5-10 minutes",
  },
  {
    type: "fiat" as const,
    currency: "KES",
    provider: "flutterwave" as const,
    name: "M-Pesa",
    icon: Smartphone,
    description: "Mobile money payment",
    fees: "1%",
    processingTime: "Instant",
  },
]

export function PaymentMethodSelector({
  amount,
  currency,
  onMethodSelect,
  selectedMethod,
}: PaymentMethodSelectorProps) {
  const [activeTab, setActiveTab] = useState<"crypto" | "fiat">("crypto")

  const handleMethodSelect = (method: Omit<PaymentMethod, "details">) => {
    onMethodSelect(method)
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="font-sans text-2xl font-bold text-foreground mb-2">Choose Payment Method</h3>
        <p className="font-serif text-muted-foreground">
          Select how you'd like to pay {amount} {currency}
        </p>
      </div>

      {/* Payment Type Tabs */}
      <div className="flex rounded-lg bg-muted p-1">
        <button
          onClick={() => setActiveTab("crypto")}
          className={`flex-1 rounded-md py-2 px-4 text-sm font-medium transition-colors ${
            activeTab === "crypto"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Wallet className="h-4 w-4 mr-2 inline" />
          Cryptocurrency
        </button>
        <button
          onClick={() => setActiveTab("fiat")}
          className={`flex-1 rounded-md py-2 px-4 text-sm font-medium transition-colors ${
            activeTab === "fiat"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <CreditCard className="h-4 w-4 mr-2 inline" />
          Traditional Payment
        </button>
      </div>

      {/* Crypto Methods */}
      {activeTab === "crypto" && (
        <div className="space-y-4">
          <div className="flex items-center space-x-2 mb-4">
            <Shield className="h-5 w-5 text-primary" />
            <span className="font-serif text-sm text-muted-foreground">
              Secured by smart contracts • Instant settlement
            </span>
          </div>
          {cryptoMethods.map((method, index) => (
            <Card
              key={index}
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedMethod?.currency === method.currency && selectedMethod?.type === method.type
                  ? "ring-2 ring-primary"
                  : ""
              }`}
              onClick={() => handleMethodSelect(method)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <method.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-sans font-semibold text-foreground">{method.name}</h4>
                      <p className="font-serif text-sm text-muted-foreground">{method.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="font-serif mb-1">
                      {method.fees}
                    </Badge>
                    <p className="font-serif text-xs text-muted-foreground">{method.processingTime}</p>
                  </div>
                </div>
                {selectedMethod?.currency === method.currency && selectedMethod?.type === method.type && (
                  <div className="mt-3 pt-3 border-t border-border">
                    <div className="flex items-center text-primary">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      <span className="font-serif text-sm">Selected payment method</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Fiat Methods */}
      {activeTab === "fiat" && (
        <div className="space-y-4">
          <div className="flex items-center space-x-2 mb-4">
            <Shield className="h-5 w-5 text-primary" />
            <span className="font-serif text-sm text-muted-foreground">
              Secured by escrow • Buyer protection included
            </span>
          </div>
          {fiatMethods.map((method, index) => (
            <Card
              key={index}
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedMethod?.provider === method.provider &&
                selectedMethod?.currency === method.currency &&
                selectedMethod?.type === method.type
                  ? "ring-2 ring-primary"
                  : ""
              }`}
              onClick={() => handleMethodSelect(method)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <method.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-sans font-semibold text-foreground">{method.name}</h4>
                      <p className="font-serif text-sm text-muted-foreground">{method.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="font-serif mb-1">
                      {method.fees}
                    </Badge>
                    <p className="font-serif text-xs text-muted-foreground">{method.processingTime}</p>
                  </div>
                </div>
                {selectedMethod?.provider === method.provider &&
                  selectedMethod?.currency === method.currency &&
                  selectedMethod?.type === method.type && (
                    <div className="mt-3 pt-3 border-t border-border">
                      <div className="flex items-center text-primary">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        <span className="font-serif text-sm">Selected payment method</span>
                      </div>
                    </div>
                  )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Separator />

      <div className="bg-card rounded-lg p-4">
        <h4 className="font-sans font-semibold text-foreground mb-2">Payment Security</h4>
        <ul className="space-y-2 font-serif text-sm text-muted-foreground">
          <li className="flex items-center">
            <CheckCircle className="h-4 w-4 text-primary mr-2" />
            Funds held in secure escrow until conditions are met
          </li>
          <li className="flex items-center">
            <CheckCircle className="h-4 w-4 text-primary mr-2" />
            Multi-signature smart contract protection
          </li>
          <li className="flex items-center">
            <CheckCircle className="h-4 w-4 text-primary mr-2" />
            Dispute resolution system available
          </li>
          <li className="flex items-center">
            <CheckCircle className="h-4 w-4 text-primary mr-2" />
            Full refund protection for verified issues
          </li>
        </ul>
      </div>
    </div>
  )
}
