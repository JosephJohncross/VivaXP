"use client"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Bed, Bath, Square, TrendingUp, Shield } from "lucide-react"
import { useState } from "react"
import { EscrowCreationDialog } from "@/components/payments/escrow-creation-dialog"

const featuredProperties = [
  {
    id: 1,
    title: "Modern Apartment Complex",
    location: "Victoria Island, Lagos",
    price: "$250,000",
    monthlyRent: "$2,500",
    tokenPrice: "$1,000",
    image: "/modern-lagos-apartments.png",
    beds: 3,
    baths: 2,
    sqft: 1200,
    type: "Apartment",
    verified: true,
    roi: "12%",
    availableTokens: 250,
  },
  {
    id: 2,
    title: "Commercial Office Building",
    location: "Westlands, Nairobi",
    price: "$500,000",
    monthlyRent: "$5,000",
    tokenPrice: "$2,500",
    image: "/placeholder-owj86.png",
    beds: null,
    baths: 4,
    sqft: 3500,
    type: "Commercial",
    verified: true,
    roi: "15%",
    availableTokens: 200,
  },
  {
    id: 3,
    title: "Luxury Villa Estate",
    location: "Sandton, Johannesburg",
    price: "$750,000",
    monthlyRent: "$7,500",
    tokenPrice: "$5,000",
    image: "/luxury-villa-johannesburg.png",
    beds: 5,
    baths: 4,
    sqft: 4200,
    type: "Villa",
    verified: true,
    roi: "10%",
    availableTokens: 150,
  },
]

export function FeaturedProperties() {
  const [selectedProperty, setSelectedProperty] = useState<(typeof featuredProperties)[0] | null>(null)
  const [isEscrowDialogOpen, setIsEscrowDialogOpen] = useState(false)

  const handleInvestClick = (property: (typeof featuredProperties)[0]) => {
    setSelectedProperty(property)
    setIsEscrowDialogOpen(true)
  }

  return (
    <>
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gradient-primary mb-4">Featured Properties</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover verified properties with transparent ownership and investment opportunities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property) => (
              <Card key={property.id} className="overflow-hidden cyber-card border border-border/50 glow-on-hover hologram-effect transition-all duration-300 hover:scale-105">
                <div className="relative">
                  <img
                    src={property.image || "/placeholder.svg"}
                    alt={property.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge variant="secondary" className="bg-secondary/20 text-secondary border-secondary/50 neon-border">
                      {property.type}
                    </Badge>
                    {property.verified && (
                      <Badge className="gradient-primary text-white neon-border">
                        <Shield className="h-3 w-3 mr-1 neon-glow" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge variant="outline" className="bg-background/90 border-accent/50 text-accent neon-border">
                      <TrendingUp className="h-3 w-3 mr-1 neon-glow" />
                      {property.roi} ROI
                    </Badge>
                  </div>
                </div>

                <CardHeader>
                  <h3 className="text-xl font-semibold text-gradient-secondary">{property.title}</h3>
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-1 text-accent neon-glow" />
                    <span className="text-sm">{property.location}</span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    {property.beds && (
                      <div className="flex items-center">
                        <Bed className="h-4 w-4 mr-1 text-primary neon-glow" />
                        <span>{property.beds} beds</span>
                      </div>
                    )}
                    <div className="flex items-center">
                      <Bath className="h-4 w-4 mr-1 text-secondary neon-glow" />
                      <span>{property.baths} baths</span>
                    </div>
                    <div className="flex items-center">
                      <Square className="h-4 w-4 mr-1 text-accent neon-glow" />
                      <span>{property.sqft} sqft</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Full Price:</span>
                      <span className="font-semibold text-gradient-primary">{property.price}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Monthly Rent:</span>
                      <span className="font-semibold text-gradient-secondary">{property.monthlyRent}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Token Price:</span>
                      <span className="font-semibold text-gradient-accent">{property.tokenPrice}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Available Tokens:</span>
                      <span className="font-semibold text-gradient-primary">{property.availableTokens}</span>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="flex gap-2">
                  <Button variant="outline" className="flex-1 bg-transparent border-secondary/50 hover:border-secondary hover:bg-secondary/10 transition-all duration-300">
                    View Details
                  </Button>
                  <Button className="flex-1 gradient-primary hover:opacity-90 transition-all duration-300" onClick={() => handleInvestClick(property)}>
                    Invest Now
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" variant="outline" className="font-serif bg-transparent">
              View All Properties
            </Button>
          </div>
        </div>
      </section>

      <EscrowCreationDialog
        open={isEscrowDialogOpen}
        onOpenChange={setIsEscrowDialogOpen}
        propertyId={selectedProperty?.id.toString()}
        propertyTitle={selectedProperty?.title}
        sellerAddress="0x1234567890123456789012345678901234567890" // Mock seller address
      />
    </>
  )
}
