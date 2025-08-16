"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Calendar, DollarSign, FileText, Wrench } from "lucide-react"

export default function RentalDetailsPage({ params }: { params: { id: string } }) {
  const [showContactModal, setShowContactModal] = useState(false)

  // Mock rental data
  const rental = {
    id: params.id,
    property: "Modern 2BR Apartment",
    location: "Victoria Island, Lagos",
    rent: "$1,200/month",
    leaseStart: "Jan 1, 2024",
    leaseEnd: "Dec 31, 2024",
    status: "Active",
    image: "/modern-apartment.png",
    owner: "John Smith",
    ownerPhone: "+234 123 456 7890",
    ownerEmail: "john@example.com",
    amenities: ["Swimming Pool", "Gym", "24/7 Security", "Parking", "Generator"],
    address: "15 Admiralty Way, Lekki Phase 1, Lagos",
    size: "1,200 sq ft",
    bedrooms: 2,
    bathrooms: 2,
  }

  const paymentHistory = [
    { date: "Nov 1, 2024", amount: "$1,200", status: "Paid", method: "Bank Transfer" },
    { date: "Oct 1, 2024", amount: "$1,200", status: "Paid", method: "Crypto (USDT)" },
    { date: "Sep 1, 2024", amount: "$1,200", status: "Paid", method: "Credit Card" },
  ]

  const maintenanceRequests = [
    { date: "Nov 10, 2024", issue: "Leaky faucet", status: "Completed", priority: "Medium" },
    { date: "Oct 15, 2024", issue: "AC not cooling", status: "In Progress", priority: "High" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/dashboard/tenant" className="flex items-center gap-2 text-primary hover:underline mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {rental.property}
          </h1>
          <p className="text-muted-foreground">{rental.location}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Property Image */}
            <div className="bg-card rounded-lg border overflow-hidden">
              <img
                src={rental.image || "/placeholder.svg"}
                alt={rental.property}
                className="w-full h-64 object-cover"
              />
            </div>

            {/* Property Details */}
            <div className="bg-card rounded-lg border p-6">
              <h2 className="text-xl font-semibold mb-4">Property Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Address</p>
                  <p className="font-medium">{rental.address}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Size</p>
                  <p className="font-medium">{rental.size}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Bedrooms</p>
                  <p className="font-medium">{rental.bedrooms}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Bathrooms</p>
                  <p className="font-medium">{rental.bathrooms}</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-muted-foreground mb-2">Amenities</p>
                <div className="flex flex-wrap gap-2">
                  {rental.amenities.map((amenity) => (
                    <span key={amenity} className="bg-primary/10 text-primary px-2 py-1 rounded text-sm">
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Payment History */}
            <div className="bg-card rounded-lg border p-6">
              <h2 className="text-xl font-semibold mb-4">Payment History</h2>
              <div className="space-y-3">
                {paymentHistory.map((payment, index) => (
                  <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{payment.date}</p>
                      <p className="text-sm text-muted-foreground">{payment.method}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{payment.amount}</p>
                      <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">{payment.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Maintenance Requests */}
            <div className="bg-card rounded-lg border p-6">
              <h2 className="text-xl font-semibold mb-4">Maintenance Requests</h2>
              <div className="space-y-3">
                {maintenanceRequests.map((request, index) => (
                  <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{request.issue}</p>
                      <p className="text-sm text-muted-foreground">{request.date}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                        {request.priority}
                      </span>
                      <p className="text-sm mt-1">{request.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Lease Info */}
            <div className="bg-card rounded-lg border p-6">
              <h3 className="font-semibold mb-4">Lease Information</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Monthly Rent</p>
                    <p className="font-semibold">{rental.rent}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Lease Period</p>
                    <p className="font-semibold">
                      {rental.leaseStart} - {rental.leaseEnd}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Owner Info */}
            <div className="bg-card rounded-lg border p-6">
              <h3 className="font-semibold mb-4">Property Owner</h3>
              <div className="space-y-2">
                <p className="font-medium">{rental.owner}</p>
                <p className="text-sm text-muted-foreground">{rental.ownerPhone}</p>
                <p className="text-sm text-muted-foreground">{rental.ownerEmail}</p>
              </div>
              <button
                onClick={() => setShowContactModal(true)}
                className="w-full mt-4 bg-primary text-primary-foreground p-2 rounded-lg hover:bg-primary/90"
              >
                Contact Owner
              </button>
            </div>

            {/* Quick Actions */}
            <div className="bg-card rounded-lg border p-6">
              <h3 className="font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Link href="/dashboard/tenant/payment">
                  <button className="w-full flex items-center gap-2 p-2 border rounded-lg hover:bg-secondary">
                    <DollarSign className="w-4 h-4" />
                    Pay Rent
                  </button>
                </Link>
                <Link href="/dashboard/tenant/maintenance">
                  <button className="w-full flex items-center gap-2 p-2 border rounded-lg hover:bg-secondary">
                    <Wrench className="w-4 h-4" />
                    Request Maintenance
                  </button>
                </Link>
                <Link href="/dashboard/tenant/documents">
                  <button className="w-full flex items-center gap-2 p-2 border rounded-lg hover:bg-secondary">
                    <FileText className="w-4 h-4" />
                    View Documents
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Modal */}
        {showContactModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-card p-6 rounded-lg max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold mb-4">Contact Property Owner</h3>
              <div className="space-y-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Subject</label>
                  <input type="text" className="w-full p-2 border rounded-lg" placeholder="Enter subject..." />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    className="w-full p-2 border rounded-lg"
                    rows={4}
                    placeholder="Type your message..."
                  ></textarea>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowContactModal(false)}
                  className="flex-1 border px-4 py-2 rounded-lg hover:bg-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    console.log("[v0] Sending message to property owner...")
                    alert("Message sent to property owner!")
                    setShowContactModal(false)
                  }}
                  className="flex-1 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90"
                >
                  Send Message
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
