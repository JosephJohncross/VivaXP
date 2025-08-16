"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Building2, Zap, TrendingUp, Users, DollarSign, Plus } from "lucide-react"

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

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Building2 className="w-8 h-8 text-accent neon-glow" />
            <h1 className="text-3xl font-bold text-gradient-accent">Property Owner Dashboard</h1>
            <Zap className="w-6 h-6 text-primary neon-glow" />
          </div>
          <p className="text-muted-foreground">Manage your properties and track performance</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="cyber-card p-6 rounded-lg border border-border/50 glow-on-hover hologram-effect">
            <div className="flex items-center gap-2 mb-2">
              <Building2 className="w-5 h-5 text-primary neon-glow" />
              <h3 className="text-sm font-medium text-muted-foreground">Total Properties</h3>
            </div>
            <p className="text-2xl font-bold text-gradient-primary">12</p>
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
        <div className="bg-card rounded-lg border p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Your Properties</h2>
            <div className="flex gap-2">
              <Link href="/dashboard/property-owner/listings">
                <Button variant="outline">Manage Listings</Button>
              </Link>
              <Link href="/dashboard/property-owner/add-property">
                <Button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                  Add New Property
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockProperties.map((property) => (
              <div key={property.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <img
                  src={property.image || "/placeholder.svg"}
                  alt={property.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">{property.title}</h3>
                  <p className="text-muted-foreground text-sm">{property.location}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm bg-secondary px-2 py-1 rounded">{property.type}</span>
                    <span
                      className={`text-sm px-2 py-1 rounded ${
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
                  <div className="flex gap-2 mt-4">
                    <Link href={`/dashboard/property-owner/property/${property.id}`}>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => console.log(`[v0] Editing property ${property.id}`)}
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
