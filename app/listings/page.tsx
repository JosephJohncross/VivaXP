"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TextToSpeech } from "@/components/ui/text-to-speech"
import { Search, MapPin, Bed, Bath, Square, TrendingUp } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

interface Property {
  id: string
  title: string
  location: string
  price: number
  monthlyRent?: number
  installmentPrice?: number
  tokenPrice?: number
  totalTokens?: number
  availableTokens?: number
  bedrooms: number
  bathrooms: number
  area: number
  roi?: number
  image: string
  verified: boolean
  propertyType: "residential" | "commercial" | "mixed"
  listingType: "rent" | "sale" | "installment" | "tokenized"
}

const mockProperties: Property[] = [
  {
    id: "1",
    title: "Modern 3BR Apartment",
    location: "Victoria Island, Lagos",
    price: 0,
    monthlyRent: 2500,
    bedrooms: 3,
    bathrooms: 2,
    area: 1200,
    image: "/modern-apartment.png",
    verified: true,
    propertyType: "residential",
    listingType: "rent",
  },
  {
    id: "2",
    title: "Executive Office Space",
    location: "Westlands, Nairobi",
    price: 0,
    monthlyRent: 5000,
    bedrooms: 0,
    bathrooms: 2,
    area: 2000,
    image: "/modern-glass-office.png",
    verified: true,
    propertyType: "commercial",
    listingType: "rent",
  },
  {
    id: "3",
    title: "Luxury Villa",
    location: "East Legon, Accra",
    price: 450000,
    bedrooms: 4,
    bathrooms: 3,
    area: 2500,
    image: "/modern-apartment-building.png",
    verified: true,
    propertyType: "residential",
    listingType: "sale",
  },
  {
    id: "4",
    title: "Commercial Building",
    location: "Sandton, Johannesburg",
    price: 1200000,
    installmentPrice: 120000,
    bedrooms: 0,
    bathrooms: 8,
    area: 5000,
    image: "/modern-building-construction.png",
    verified: true,
    propertyType: "commercial",
    listingType: "installment",
  },
  {
    id: "5",
    title: "Luxury Beachfront Resort",
    location: "Mombasa, Kenya",
    price: 2500000,
    tokenPrice: 100,
    totalTokens: 25000,
    availableTokens: 15000,
    bedrooms: 0,
    bathrooms: 0,
    area: 5000,
    roi: 12.5,
    image: "/kenyan-beachfront-resort.png",
    verified: true,
    propertyType: "commercial",
    listingType: "tokenized",
  },
  {
    id: "6",
    title: "Student Housing Complex",
    location: "Cape Town, South Africa",
    price: 1800000,
    tokenPrice: 75,
    totalTokens: 24000,
    availableTokens: 8000,
    bedrooms: 120,
    bathrooms: 60,
    area: 8000,
    roi: 15.2,
    image: "/south-african-student-housing.png",
    verified: true,
    propertyType: "residential",
    listingType: "tokenized",
  },
]

export default function ListingsPage() {
  const router = useRouter()
  const [properties, setProperties] = useState<Property[]>(mockProperties)
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(mockProperties)
  const [searchTerm, setSearchTerm] = useState("")
  const [priceRange, setPriceRange] = useState("all")
  const [propertyType, setPropertyType] = useState("all")
  const [listingType, setListingType] = useState("all")
  const [sortBy, setSortBy] = useState("price-low")

  useEffect(() => {
    const filtered = properties.filter((property) => {
      const matchesSearch =
        property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.location.toLowerCase().includes(searchTerm.toLowerCase())

      const propertyPrice = property.listingType === "rent" ? (property.monthlyRent || 0) * 12 : property.price
      const matchesPrice =
        priceRange === "all" ||
        (priceRange === "under-100k" && propertyPrice < 100000) ||
        (priceRange === "100k-500k" && propertyPrice >= 100000 && propertyPrice < 500000) ||
        (priceRange === "500k-1m" && propertyPrice >= 500000 && propertyPrice < 1000000) ||
        (priceRange === "over-1m" && propertyPrice >= 1000000)

      const matchesPropertyType = propertyType === "all" || property.propertyType === propertyType
      const matchesListingType = listingType === "all" || property.listingType === listingType

      return matchesSearch && matchesPrice && matchesPropertyType && matchesListingType
    })

    filtered.sort((a, b) => {
      const priceA = a.listingType === "rent" ? a.monthlyRent || 0 : a.price
      const priceB = b.listingType === "rent" ? b.monthlyRent || 0 : b.price

      switch (sortBy) {
        case "price-low":
          return priceA - priceB
        case "price-high":
          return priceB - priceA
        case "roi-high":
          return (b.roi || 0) - (a.roi || 0)
        case "roi-low":
          return (a.roi || 0) - (b.roi || 0)
        default:
          return 0
      }
    })

    setFilteredProperties(filtered)
  }, [properties, searchTerm, priceRange, propertyType, listingType, sortBy])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const handlePropertyAction = (property: Property) => {
    console.log(`[v0] ${property.listingType} action for property:`, property.title)

    switch (property.listingType) {
      case "rent":
        // Redirect to tenant dashboard or rental process
        router.push("/dashboard/tenant")
        break
      case "sale":
      case "installment":
        // Handle purchase process
        alert(
          `Initiating ${property.listingType === "installment" ? "installment purchase" : "purchase"} for ${property.title}`,
        )
        break
      case "tokenized":
        // Redirect to investor dashboard
        router.push("/dashboard")
        break
      default:
        console.log("[v0] Unknown listing type")
    }
  }

  const getActionButtonText = (property: Property) => {
    switch (property.listingType) {
      case "rent":
        return "Rent Now"
      case "sale":
        return "Buy Now"
      case "installment":
        return "Buy with Installments"
      case "tokenized":
        return "Invest Now"
      default:
        return "View Details"
    }
  }

  const getListingTypeBadge = (listingType: string) => {
    switch (listingType) {
      case "rent":
        return "bg-blue-500"
      case "sale":
        return "bg-green-500"
      case "installment":
        return "bg-orange-500"
      case "tokenized":
        return "bg-purple-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="min-h-screen bg-background relative">
      {/* Animated background orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="cyber-grid"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-accent/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 cyber-card border-b border-border/50 py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-4 mb-4">
            <h1 className="text-4xl font-bold text-center text-gradient-primary">Property Listings</h1>
            <TextToSpeech 
              text="Property Listings - Discover real estate opportunities across Africa. Rent, buy, or invest in verified properties. Use the filters to find properties by location, price range, property type, and more."
              variant="ghost"
              size="icon"
              showControls={false}
            />
          </div>
          <p className="text-xl text-muted-foreground text-center max-w-2xl mx-auto">
            Discover real estate opportunities across Africa. Rent, buy, or invest in verified properties.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="cyber-card rounded-lg p-6 border border-border/50 glow-on-hover mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground neon-glow" />
              <Input
                placeholder="Search properties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 cyber-card border-primary/30 focus:neon-border"
              />
            </div>

            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger>
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="under-100k">Under $100K</SelectItem>
                <SelectItem value="100k-500k">$100K - $500K</SelectItem>
                <SelectItem value="500k-1m">$500K - $1M</SelectItem>
                <SelectItem value="over-1m">Over $1M</SelectItem>
              </SelectContent>
            </Select>

            <Select value={propertyType} onValueChange={setPropertyType}>
              <SelectTrigger>
                <SelectValue placeholder="Property Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="residential">Residential</SelectItem>
                <SelectItem value="commercial">Commercial</SelectItem>
                <SelectItem value="mixed">Mixed-Use</SelectItem>
              </SelectContent>
            </Select>

            <Select value={listingType} onValueChange={setListingType}>
              <SelectTrigger>
                <SelectValue placeholder="Listing Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Listings</SelectItem>
                <SelectItem value="rent">For Rent</SelectItem>
                <SelectItem value="sale">For Sale</SelectItem>
                <SelectItem value="installment">Installments</SelectItem>
                <SelectItem value="tokenized">Tokenized</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="roi-high">ROI: High to Low</SelectItem>
                <SelectItem value="roi-low">ROI: Low to High</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredProperties.length} of {properties.length} properties
          </p>
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <Card key={property.id} className="overflow-hidden cyber-card border border-border/50 glow-on-hover hologram-effect transition-all duration-300 hover:scale-105">
              <div className="relative">
                <Image
                  src={property.image || "/placeholder.svg"}
                  alt={property.title}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                />
                {property.verified && <Badge className="absolute top-2 right-2 gradient-primary text-white neon-border">Verified</Badge>}
                <Badge
                  className="absolute top-2 left-2 capitalize border-secondary/50 text-secondary neon-border"
                  variant="outline"
                >
                  {property.propertyType}
                </Badge>
                <Badge
                  className="absolute bottom-2 left-2 capitalize gradient-accent text-white neon-border"
                >
                  {property.listingType === "installment" ? "Installments" : property.listingType}
                </Badge>
              </div>

              <CardHeader>
                <CardTitle className="text-lg text-gradient-primary">{property.title}</CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <MapPin className="h-4 w-4 neon-glow" />
                  {property.location}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    {property.listingType === "rent" ? (
                      <div>
                        <span className="text-2xl font-bold text-primary">
                          {formatPrice(property.monthlyRent || 0)}
                        </span>
                        <span className="text-sm text-muted-foreground">/month</span>
                      </div>
                    ) : property.listingType === "installment" ? (
                      <div>
                        <span className="text-2xl font-bold text-primary">{formatPrice(property.price)}</span>
                        <div className="text-sm text-muted-foreground">
                          {formatPrice(property.installmentPrice || 0)}/month
                        </div>
                      </div>
                    ) : (
                      <span className="text-2xl font-bold text-primary">{formatPrice(property.price)}</span>
                    )}

                    {property.roi && (
                      <div className="flex items-center gap-1 text-green-600">
                        <TrendingUp className="h-4 w-4" />
                        <span className="font-semibold">{property.roi}% ROI</span>
                      </div>
                    )}
                  </div>

                  {property.bedrooms > 0 && (
                    <div className="flex gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Bed className="h-4 w-4" />
                        {property.bedrooms} beds
                      </div>
                      <div className="flex items-center gap-1">
                        <Bath className="h-4 w-4" />
                        {property.bathrooms} baths
                      </div>
                      <div className="flex items-center gap-1">
                        <Square className="h-4 w-4" />
                        {property.area.toLocaleString()} sqft
                      </div>
                    </div>
                  )}

                  {property.listingType === "tokenized" && property.tokenPrice && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Token Price:</span>
                        <span className="font-semibold">${property.tokenPrice}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Available Tokens:</span>
                        <span className="font-semibold">{property.availableTokens?.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{
                            width: `${((property.totalTokens! - property.availableTokens!) / property.totalTokens!) * 100}%`,
                          }}
                        ></div>
                      </div>
                      <div className="text-xs text-muted-foreground text-center">
                        {Math.round(
                          ((property.totalTokens! - property.availableTokens!) / property.totalTokens!) * 100,
                        )}
                        % funded
                      </div>
                    </div>
                  )}

                  <Button className="w-full gradient-primary text-white glow-effect border-0 hover:pulse-glow" onClick={() => handlePropertyAction(property)}>
                    {getActionButtonText(property)}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProperties.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No properties found matching your criteria.</p>
            <Button
              variant="outline"
              className="mt-4 bg-transparent"
              onClick={() => {
                setSearchTerm("")
                setPriceRange("all")
                setPropertyType("all")
                setListingType("all")
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
