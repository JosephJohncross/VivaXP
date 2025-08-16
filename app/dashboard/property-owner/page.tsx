"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Building2, Zap, TrendingUp, Users, DollarSign, Plus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PropertyOwnerDashboard() {
  const mockProperties = [
    {
      id: "1",
      title: "Lagos Luxury Apartment",
      location: "Victoria Island, Lagos",
      type: "Apartment",
      status: "Active",
      monthlyRent: "$2,500",
      occupancy: "95%",
      tenants: 12,
      revenue: "$28,500",
      image: "/modern-apartment-building.png",
    },
    {
      id: "2",
      title: "Accra Office Complex",
      location: "East Legon, Accra",
      type: "Commercial",
      status: "Pending Verification",
      monthlyRent: "$5,000",
      occupancy: "80%",
      tenants: 8,
      revenue: "$40,000",
      image: "/modern-glass-office.png",
    },
  ]

  return (
    <div className="min-h-screen bg-background cyber-grid">
      {/* Animated background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent/8 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/8 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-secondary/8 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      <div className="relative z-10 container mx-auto px-3 sm:px-4 lg:px-8 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-2 sm:gap-3 mb-4">
            <Building2 className="w-6 h-6 sm:w-8 sm:h-8 text-accent neon-glow" />
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gradient-accent">Property Owner Dashboard</h1>
            <Zap className="w-4 h-4 sm:w-6 sm:h-6 text-primary neon-glow" />
          </div>
          <p className="text-sm sm:text-base text-muted-foreground">Manage your properties and track performance</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="cyber-card p-4 sm:p-6 rounded-lg border border-border/50 glow-on-hover hologram-effect">
            <div className="flex items-center gap-2 mb-2">
              <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary neon-glow" />
              <h3 className="text-xs sm:text-sm font-medium text-muted-foreground">Total Properties</h3>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-gradient-primary">12</p>
            <p className="text-xs text-green-400">+2 this month</p>
          </div>
          <div className="cyber-card p-6 rounded-lg border border-border/50 glow-on-hover hologram-effect">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-5 h-5 text-secondary neon-glow" />
              <h3 className="text-sm font-medium text-muted-foreground">Monthly Revenue</h3>
            </div>
            <p className="text-2xl font-bold text-gradient-secondary">$68,500</p>
            <p className="text-xs text-green-400">+12% from last month</p>
          </div>
          <div className="cyber-card p-6 rounded-lg border border-border/50 glow-on-hover hologram-effect">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-accent neon-glow" />
              <h3 className="text-sm font-medium text-muted-foreground">Occupancy Rate</h3>
            </div>
            <p className="text-2xl font-bold text-gradient-accent">87%</p>
            <p className="text-xs text-green-400">+5% from last month</p>
          </div>
          <div className="cyber-card p-6 rounded-lg border border-border/50 glow-on-hover hologram-effect">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-5 h-5 text-primary neon-glow" />
              <h3 className="text-sm font-medium text-muted-foreground">Active Tenants</h3>
            </div>
            <p className="text-2xl font-bold text-gradient-primary">156</p>
            <p className="text-xs text-green-400">+8 this month</p>
          </div>
        </div>

        {/* Properties List */}
        <div className="bg-card rounded-lg border p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h2 className="text-lg sm:text-xl font-semibold">Your Properties</h2>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <Link href="/dashboard/property-owner/listings" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full sm:w-auto">
                  <span className="hidden sm:inline">Manage Listings</span>
                  <span className="sm:hidden">Manage</span>
                </Button>
              </Link>
              <Link href="/dashboard/property-owner/add-property" className="w-full sm:w-auto">
                <Button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors w-full sm:w-auto">
                  <Plus className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Add New Property</span>
                  <span className="sm:hidden">Add Property</span>
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {mockProperties.map((property) => (
              <div key={property.id} className="border rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow">
                <img
                  src={property.image || "/placeholder.svg"}
                  alt={property.title}
                  className="w-full h-40 sm:h-48 object-cover rounded-lg mb-4"
                />
                <div className="space-y-2">
                  <h3 className="font-semibold text-base sm:text-lg truncate">{property.title}</h3>
                  <p className="text-muted-foreground text-xs sm:text-sm truncate">{property.location}</p>
                  <div className="flex flex-wrap justify-between items-center gap-2">
                    <span className="text-xs sm:text-sm bg-secondary px-2 py-1 rounded">{property.type}</span>
                    <span
                      className={`text-xs sm:text-sm px-2 py-1 rounded ${
                        property.status === "Active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {property.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Monthly Rent</p>
                      <p className="font-semibold">{property.monthlyRent}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Occupancy</p>
                      <p className="font-semibold">{property.occupancy}</p>
                    </div>
                  </div>

                  {/* Action buttons for each property */}
                  <div className="flex flex-col sm:flex-row gap-2 mt-4">
                    <Link href={`/dashboard/property-owner/property/${property.id}`} className="w-full sm:w-auto">
                      <Button variant="outline" size="sm" className="w-full sm:w-auto">
                        <span className="hidden sm:inline">View Details</span>
                        <span className="sm:hidden">Details</span>
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => console.log(`[v0] Editing property ${property.id}`)}
                      className="w-full sm:w-auto"
                    >
                      Edit
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
