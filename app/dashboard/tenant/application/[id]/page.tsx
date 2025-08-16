"use client"

import Link from "next/link"
import { ArrowLeft, Calendar, DollarSign, FileText, User } from "lucide-react"

export default function ApplicationDetailsPage({ params }: { params: { id: string } }) {
  // Mock application data
  const application = {
    id: params.id,
    property: "Luxury 3BR Penthouse",
    location: "Banana Island, Lagos",
    rent: "$2,800/month",
    status: "Under Review",
    appliedDate: "Nov 15, 2024",
    image: "/luxury-penthouse.png",
    owner: "Sarah Johnson",
    ownerPhone: "+234 987 654 3210",
    description: "Stunning penthouse with panoramic city views, modern amenities, and premium finishes.",
    size: "2,500 sq ft",
    bedrooms: 3,
    bathrooms: 3,
    amenities: ["Rooftop Pool", "Private Elevator", "Concierge", "Gym", "Parking"],
    documents: [
      { name: "Application Form", status: "Submitted", date: "Nov 15, 2024" },
      { name: "Income Verification", status: "Submitted", date: "Nov 15, 2024" },
      { name: "References", status: "Pending", date: "Nov 15, 2024" },
      { name: "Background Check", status: "In Progress", date: "Nov 16, 2024" },
    ],
  }

  const timeline = [
    { date: "Nov 15, 2024", event: "Application Submitted", status: "completed" },
    { date: "Nov 16, 2024", event: "Initial Review Started", status: "completed" },
    { date: "Nov 17, 2024", event: "Background Check Initiated", status: "current" },
    { date: "Nov 20, 2024", event: "Owner Review", status: "pending" },
    { date: "Nov 22, 2024", event: "Final Decision", status: "pending" },
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
            Application Details
          </h1>
          <p className="text-muted-foreground">{application.property}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Property Info */}
            <div className="bg-card rounded-lg border p-6">
              <div className="flex gap-4">
                <img
                  src={application.image || "/placeholder.svg"}
                  alt={application.property}
                  className="w-32 h-32 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h2 className="text-xl font-semibold">{application.property}</h2>
                  <p className="text-muted-foreground">{application.location}</p>
                  <p className="text-sm mt-2">{application.description}</p>
                  <div className="flex gap-4 mt-4 text-sm">
                    <span>Size: {application.size}</span>
                    <span>Bedrooms: {application.bedrooms}</span>
                    <span>Bathrooms: {application.bathrooms}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Application Timeline */}
            <div className="bg-card rounded-lg border p-6">
              <h2 className="text-xl font-semibold mb-4">Application Timeline</h2>
              <div className="space-y-4">
                {timeline.map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div
                      className={`w-4 h-4 rounded-full ${
                        item.status === "completed"
                          ? "bg-green-500"
                          : item.status === "current"
                            ? "bg-primary"
                            : "bg-gray-300"
                      }`}
                    />
                    <div className="flex-1">
                      <p className="font-medium">{item.event}</p>
                      <p className="text-sm text-muted-foreground">{item.date}</p>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        item.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : item.status === "current"
                            ? "bg-primary/10 text-primary"
                            : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Documents */}
            <div className="bg-card rounded-lg border p-6">
              <h2 className="text-xl font-semibold mb-4">Required Documents</h2>
              <div className="space-y-3">
                {application.documents.map((doc, index) => (
                  <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-primary" />
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <p className="text-sm text-muted-foreground">{doc.date}</p>
                      </div>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        doc.status === "Submitted"
                          ? "bg-green-100 text-green-800"
                          : doc.status === "In Progress"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {doc.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Application Status */}
            <div className="bg-card rounded-lg border p-6">
              <h3 className="font-semibold mb-4">Application Status</h3>
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Calendar className="w-8 h-8 text-yellow-600" />
                </div>
                <p className="font-semibold text-lg">{application.status}</p>
                <p className="text-sm text-muted-foreground">Applied on {application.appliedDate}</p>
              </div>
            </div>

            {/* Property Details */}
            <div className="bg-card rounded-lg border p-6">
              <h3 className="font-semibold mb-4">Property Details</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Monthly Rent</p>
                    <p className="font-semibold">{application.rent}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Property Owner</p>
                    <p className="font-semibold">{application.owner}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div className="bg-card rounded-lg border p-6">
              <h3 className="font-semibold mb-4">Amenities</h3>
              <div className="flex flex-wrap gap-2">
                {application.amenities.map((amenity) => (
                  <span key={amenity} className="bg-primary/10 text-primary px-2 py-1 rounded text-sm">
                    {amenity}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="bg-card rounded-lg border p-6">
              <h3 className="font-semibold mb-4">Actions</h3>
              <div className="space-y-2">
                <button
                  onClick={() => {
                    console.log("[v0] Withdrawing application...")
                    alert("Application withdrawn successfully!")
                  }}
                  className="w-full p-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50"
                >
                  Withdraw Application
                </button>
                <button
                  onClick={() => {
                    console.log("[v0] Contacting property owner...")
                    alert("Message sent to property owner!")
                  }}
                  className="w-full p-2 border rounded-lg hover:bg-secondary"
                >
                  Contact Owner
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
