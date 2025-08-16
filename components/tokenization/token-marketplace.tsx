"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Coins, TrendingUp, Users, MapPin, Building, ShoppingCart } from "lucide-react"
import { tokenizationService } from "@/lib/services/tokenization-service"
import type { PropertyToken } from "@/lib/contracts/token-types"

export function TokenMarketplace() {
  const [tokens, setTokens] = useState<PropertyToken[]>([])
  const [filteredTokens, setFilteredTokens] = useState<PropertyToken[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedToken, setSelectedToken] = useState<PropertyToken | null>(null)
  const [purchaseAmount, setPurchaseAmount] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [filterBy, setFilterBy] = useState("all")

  useEffect(() => {
    loadTokens()
  }, [])

  useEffect(() => {
    filterAndSortTokens()
  }, [tokens, sortBy, filterBy])

  const loadTokens = async () => {
    try {
      const tokenData = await tokenizationService.getPropertyTokens()
      setTokens(tokenData.filter((token) => token.status === "active"))
    } catch (error) {
      console.error("Error loading tokens:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const filterAndSortTokens = () => {
    let filtered = [...tokens]

    // Apply filters
    if (filterBy !== "all") {
      filtered = filtered.filter((token) => {
        const location = token.metadata.attributes.find((attr) => attr.trait_type === "Location")?.value as string
        return location?.toLowerCase().includes(filterBy.toLowerCase())
      })
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price_low":
          return Number(a.tokenPrice - b.tokenPrice)
        case "price_high":
          return Number(b.tokenPrice - a.tokenPrice)
        case "roi":
          const aROI = (a.metadata.attributes.find((attr) => attr.trait_type === "Expected ROI")?.value as number) || 0
          const bROI = (b.metadata.attributes.find((attr) => attr.trait_type === "Expected ROI")?.value as number) || 0
          return bROI - aROI
        case "newest":
        default:
          return b.createdAt - a.createdAt
      }
    })

    setFilteredTokens(filtered)
  }

  const handlePurchase = async () => {
    if (!selectedToken || !purchaseAmount) return

    try {
      const amount = BigInt(Number.parseInt(purchaseAmount))
      await tokenizationService.purchaseTokens(selectedToken.id, amount, "USDT")

      // Update available supply
      const updatedTokens = tokens.map((token) =>
        token.id === selectedToken.id ? { ...token, availableSupply: token.availableSupply - amount } : token,
      )
      setTokens(updatedTokens)

      setPurchaseAmount("")
      setSelectedToken(null)
    } catch (error) {
      console.error("Purchase error:", error)
    }
  }

  const getLocationFromAttributes = (token: PropertyToken) => {
    return (token.metadata.attributes.find((attr) => attr.trait_type === "Location")?.value as string) || "Unknown"
  }

  const getROIFromAttributes = (token: PropertyToken) => {
    return (token.metadata.attributes.find((attr) => attr.trait_type === "Expected ROI")?.value as number) || 0
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-4 bg-muted rounded w-1/2 mb-2"></div>
              <div className="h-8 bg-muted rounded w-3/4"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-sans text-3xl font-bold">Token Marketplace</h1>
          <p className="font-serif text-muted-foreground">Invest in fractional real estate ownership</p>
        </div>
        <div className="flex space-x-4">
          <Select value={filterBy} onValueChange={setFilterBy}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="lagos">Lagos</SelectItem>
              <SelectItem value="nairobi">Nairobi</SelectItem>
              <SelectItem value="johannesburg">Johannesburg</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price_low">Price: Low to High</SelectItem>
              <SelectItem value="price_high">Price: High to Low</SelectItem>
              <SelectItem value="roi">Highest ROI</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Token Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTokens.map((token) => (
          <Card key={token.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="aspect-video bg-muted rounded-lg mb-4 overflow-hidden">
                <img
                  src={token.metadata.image || "/placeholder.svg"}
                  alt={token.metadata.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-start justify-between">
                <CardTitle className="font-sans text-lg">{token.metadata.name}</CardTitle>
                <Badge variant="outline" className="font-serif">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {getROIFromAttributes(token)}% ROI
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="font-serif text-sm text-muted-foreground line-clamp-2">{token.metadata.description}</p>

              <div className="flex items-center space-x-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="font-serif">{getLocationFromAttributes(token)}</span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <Label className="font-serif text-muted-foreground">Token Price</Label>
                  <p className="font-sans font-bold">${Number(token.tokenPrice).toLocaleString()}</p>
                </div>
                <div>
                  <Label className="font-serif text-muted-foreground">Available</Label>
                  <p className="font-sans font-bold">{Number(token.availableSupply).toLocaleString()}</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Coins className="h-4 w-4 text-primary" />
                  <span className="font-serif text-sm">{token.currency}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="font-serif text-sm">
                    {Number(token.totalSupply - token.availableSupply)} holders
                  </span>
                </div>
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full font-serif" onClick={() => setSelectedToken(token)}>
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Purchase Tokens
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="font-sans">Purchase {token.metadata.name}</DialogTitle>
                  </DialogHeader>
                  {selectedToken && (
                    <div className="space-y-6">
                      <div className="bg-muted/50 rounded-lg p-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="font-serif text-sm">Token Price</Label>
                            <p className="font-sans text-lg font-bold">
                              ${Number(selectedToken.tokenPrice).toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <Label className="font-serif text-sm">Available</Label>
                            <p className="font-sans text-lg font-bold">
                              {Number(selectedToken.availableSupply).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="amount" className="font-serif">
                          Number of Tokens
                        </Label>
                        <Input
                          id="amount"
                          type="number"
                          placeholder="Enter amount"
                          value={purchaseAmount}
                          onChange={(e) => setPurchaseAmount(e.target.value)}
                          min="1"
                          max={Number(selectedToken.availableSupply)}
                        />
                      </div>

                      {purchaseAmount && (
                        <div className="bg-primary/10 rounded-lg p-4">
                          <div className="flex justify-between items-center">
                            <span className="font-serif">Total Cost:</span>
                            <span className="font-sans text-xl font-bold">
                              ${(Number(selectedToken.tokenPrice) * Number.parseInt(purchaseAmount)).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      )}

                      <Button
                        onClick={handlePurchase}
                        disabled={!purchaseAmount || Number.parseInt(purchaseAmount) <= 0}
                        className="w-full font-serif"
                      >
                        Complete Purchase
                      </Button>
                    </div>
                  )}
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTokens.length === 0 && (
        <div className="text-center py-12">
          <Building className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-sans text-lg font-semibold mb-2">No tokens found</h3>
          <p className="font-serif text-muted-foreground">
            Try adjusting your filters or check back later for new listings.
          </p>
        </div>
      )}
    </div>
  )
}
