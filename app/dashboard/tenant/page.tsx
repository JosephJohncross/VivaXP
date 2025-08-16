"use client"

import { useState } from "react"
import Link from "next/link"
import { Home, Zap, Wrench, CreditCard, Search } from "lucide-react"

export default function TenantDashboard() {
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [showMaintenanceModal, setShowMaintenanceModal] = useState(false)

  const mockRentals = [
    {
      id: "1",
      property: "Modern 2BR Apartment",
      location: "Victoria Island, Lagos",
      rent: "$1,200/month",
      leaseEnd: "Dec 2024",
      status: "Active",
      image: "/modern-apartment.png",
    },
  ]

  const mockApplications = [
    {
      id: "1",
      property: "Luxury 3BR Penthouse",
      location: "Banana Island, Lagos",
      rent: "$2,800/month",
      status: "Under Review",
      appliedDate: "Nov 15, 2024",
    },
    {
      id: "2",
      property: "Cozy Studio Apartment",
      location: "Lekki Phase 1, Lagos",
      rent: "$800/month",
      status: "Approved",
      appliedDate: "Nov 10, 2024",
    },
  ]

  const handlePayRent = () => {
    console.log("[v0] Opening payment modal for rent")
    setShowPaymentModal(true)
  }

  const handleContactOwner = () => {
    console.log("[v0] Opening contact owner dialog")
    alert("Contacting property owner... Message sent!")
  }

  const handleMaintenanceRequest = () => {
    console.log("[v0] Opening maintenance request form")
    setShowMaintenanceModal(true)
  }

  return (
    <div className="min-h-screen bg-background cyber-grid">
      {/* Animated background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-secondary/8 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/8 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-accent/8 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Home className="w-8 h-8 text-secondary neon-glow" />
            <h1 className="text-3xl font-bold text-gradient-secondary">Tenant Dashboard</h1>
            <Zap className="w-6 h-6 text-primary neon-glow" />
          </div>
          <p className="text-muted-foreground">Manage your rentals and applications</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Link href="/listings">
            <button className="w-full gradient-secondary p-4 rounded-lg hover:opacity-90 transition-all duration-300 hover:scale-105 cyber-card border border-secondary/50 flex items-center justify-center gap-2">
              <Search className="w-5 h-5" />
              Browse Properties
            </button>
          </Link>
          <button
            onClick={handleMaintenanceRequest}
            className="w-full border border-accent/50 text-accent p-4 rounded-lg hover:bg-accent/10 hover:border-accent transition-all duration-300 hover:scale-105 cyber-card flex items-center justify-center gap-2"
          >
            <Wrench className="w-5 h-5" />
            Request Maintenance
          </button>
          <button
            onClick={handlePayRent}
            className="w-full gradient-primary p-4 rounded-lg hover:opacity-90 transition-all duration-300 hover:scale-105 cyber-card border border-primary/50 flex items-center justify-center gap-2"
          >
            <CreditCard className="w-5 h-5" />
            Pay Rent
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="cyber-card p-6 rounded-lg border border-border/50 glow-on-hover hologram-effect">
            <h3 className="text-sm font-medium text-muted-foreground">Current Rentals</h3>
            <p className="text-2xl font-bold text-gradient-primary">1</p>
          </div>
          <div className="cyber-card p-6 rounded-lg border border-border/50 glow-on-hover hologram-effect">
            <h3 className="text-sm font-medium text-muted-foreground">Monthly Rent</h3>
            <p className="text-2xl font-bold text-gradient-secondary">$1,200</p>
          </div>
          <div className="cyber-card p-6 rounded-lg border border-border/50 glow-on-hover hologram-effect">
            <h3 className="text-sm font-medium text-muted-foreground">Applications</h3>
            <p className="text-2xl font-bold text-gradient-accent">2</p>
          </div>
        </div>

        {/* Current Rentals */}
        <div className="bg-card rounded-lg border p-6 mb-8">
          <h2 className="text-xl font-semibold mb-6">Current Rentals</h2>
          <div className="space-y-4">
            {mockRentals.map((rental) => (
              <div key={rental.id} className="border rounded-lg p-4 flex gap-4">
                <img
                  src={rental.image || "/placeholder.svg"}
                  alt={rental.property}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{rental.property}</h3>
                  <p className="text-muted-foreground text-sm">{rental.location}</p>
                  <div className="flex gap-4 mt-2 text-sm">
                    <span>Rent: {rental.rent}</span>
                    <span>Lease ends: {rental.leaseEnd}</span>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded">{rental.status}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Link href={`/dashboard/tenant/rental/${rental.id}`}>
                    <button className="bg-secondary text-secondary-foreground px-3 py-1 rounded text-sm hover:bg-secondary/90">
                      View Details
                    </button>
                  </Link>
                  <button
                    onClick={handlePayRent}
                    className="bg-primary text-primary-foreground px-3 py-1 rounded text-sm hover:bg-primary/90"
                  >
                    Pay Rent
                  </button>
                  <button onClick={handleContactOwner} className="border px-3 py-1 rounded text-sm hover:bg-secondary">
                    Contact Owner
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Applications */}
        <div className="bg-card rounded-lg border p-6">
          <h2 className="text-xl font-semibold mb-6">Recent Applications</h2>
          <div className="space-y-4">
            {mockApplications.map((app) => (
              <div key={app.id} className="border rounded-lg p-4 flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{app.property}</h3>
                  <p className="text-muted-foreground text-sm">{app.location}</p>
                  <p className="text-sm">Applied: {app.appliedDate}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{app.rent}</p>
                  <span
                    className={`text-sm px-2 py-1 rounded ${
                      app.status === "Approved" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {app.status}
                  </span>
                  <div className="mt-2">
                    <Link href={`/dashboard/tenant/application/${app.id}`}>
                      <button className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded hover:bg-primary/90">
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {showPaymentModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-card p-6 rounded-lg max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold mb-4">Pay Rent</h3>
              <p className="text-muted-foreground mb-4">Select payment method for $1,200</p>
              <div className="space-y-2 mb-4">
                <button className="w-full p-3 border rounded-lg hover:bg-secondary">Credit Card</button>
                <button className="w-full p-3 border rounded-lg hover:bg-secondary">Crypto (USDT)</button>
                <button className="w-full p-3 border rounded-lg hover:bg-secondary">Bank Transfer</button>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="flex-1 border px-4 py-2 rounded-lg hover:bg-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    console.log("[v0] Processing payment...")
                    alert("Payment processed successfully!")
                    setShowPaymentModal(false)
                  }}
                  className="flex-1 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90"
                >
                  Pay Now
                </button>
              </div>
            </div>
          </div>
        )}

        {showMaintenanceModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-card p-6 rounded-lg max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold mb-4">Maintenance Request</h3>
              <div className="space-y-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Issue Type</label>
                  <select className="w-full p-2 border rounded-lg">
                    <option>Plumbing</option>
                    <option>Electrical</option>
                    <option>HVAC</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    className="w-full p-2 border rounded-lg"
                    rows={3}
                    placeholder="Describe the issue..."
                  ></textarea>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowMaintenanceModal(false)}
                  className="flex-1 border px-4 py-2 rounded-lg hover:bg-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    console.log("[v0] Submitting maintenance request...")
                    alert("Maintenance request submitted!")
                    setShowMaintenanceModal(false)
                  }}
                  className="flex-1 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
