"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent } from "@/components/ui/card"

export default function PropertyListings() {
  const [properties, setProperties] = useState([
    {
      id: "1",
      title: "Lagos Luxury Apartment",
      location: "Victoria Island, Lagos",
      type: "Apartment",
      listingType: "For Rent",
      status: "Active",
      isListed: true,
      price: "$2,500/month",
      views: 245,
      inquiries: 12,
      image: "/modern-apartment-building.png",
    },
    {
      id: "2",
      title: "Accra Office Complex",
      location: "East Legon, Accra",
      type: "Commercial",
      listingType: "For Sale",
      status: "Pending Verification",
      isListed: false,
      price: "$850,000",
      views: 89,
      inquiries: 5,
      image: "/modern-glass-office.png",
    },
    {
      id: "3",
      title: "Nairobi Residential Complex",
      location: "Westlands, Nairobi",
      type: "Apartment",
      listingType: "Tokenized Investment",
      status: "Active",
      isListed: true,
      price: "$500 per token",
      views: 156,
      inquiries: 23,
      image: "/modern-apartment.png",
    },
  ])

  const toggleListingStatus = (propertyId: string) => {
    setProperties((prev) =>
      prev.map((property) => (property.id === propertyId ? { ...property, isListed: !property.isListed } : property)),
    )
    console.log(`[v0] Toggled listing status for property ${propertyId}`)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Property Listings Management
          </h1>
          <p className="text-muted-foreground mt-2">Manage your property listings and visibility</p>
        </div>

        <div className="grid gap-6">
          {properties.map((property) => (
            <Card key={property.id} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <img
                    src={property.image || "/placeholder.svg"}
                    alt={property.title}
                    className="w-full md:w-48 h-32 object-cover rounded-lg"
                  />

                  <div className="flex-1 space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold">{property.title}</h3>
                        <p className="text-muted-foreground">{property.location}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm">Listed</span>
                        <Switch checked={property.isListed} onCheckedChange={() => toggleListingStatus(property.id)} />
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">{property.type}</Badge>
                      <Badge variant="outline">{property.listingType}</Badge>
                      <Badge variant={property.status === "Active" ? "default" : "secondary"}>{property.status}</Badge>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Price</p>
                        <p className="font-semibold">{property.price}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Views</p>
                        <p className="font-semibold">{property.views}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Inquiries</p>
                        <p className="font-semibold">{property.inquiries}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Status</p>
                        <p className={`font-semibold ${property.isListed ? "text-green-600" : "text-red-600"}`}>
                          {property.isListed ? "Live" : "Hidden"}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Link href={`/dashboard/property-owner/property/${property.id}`}>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </Link>
                      <Button variant="outline" size="sm">
                        Edit Listing
                      </Button>
                      <Button variant="outline" size="sm">
                        View Analytics
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
