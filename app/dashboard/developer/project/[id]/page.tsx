"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Eye, Download, TrendingUp, DollarSign, Calendar } from "lucide-react"

export default function ProjectDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")

  // Mock project data - in real app, fetch based on params.id
  const project = {
    id: params.id,
    name: "Skyline Towers",
    location: "Lekki, Lagos",
    type: "Residential Complex",
    status: "Under Construction",
    progress: 65,
    totalUnits: 120,
    soldUnits: 78,
    totalValue: "$15M",
    startDate: "2024-01-15",
    expectedCompletion: "2025-12-31",
    description: "A luxury residential complex featuring modern amenities and smart home technology.",
    image: "/modern-building-construction.png",
    financials: {
      totalInvestment: 15000000,
      currentSpent: 9750000,
      projectedRevenue: 22000000,
      currentRevenue: 11700000,
    },
    milestones: [
      { name: "Foundation", status: "completed", date: "2024-03-01" },
      { name: "Structure", status: "in-progress", date: "2024-08-15" },
      { name: "Interior", status: "pending", date: "2024-11-01" },
      { name: "Final Inspection", status: "pending", date: "2025-10-15" },
    ],
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => router.back()} className="p-2 hover:bg-secondary rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {project.name}
            </h1>
            <p className="text-muted-foreground">
              {project.location} • {project.type}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => router.push(`/dashboard/developer/project/${project.id}/3d-view`)}
              className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90"
            >
              <Eye className="w-4 h-4" />
              3D View
            </button>
            <button
              onClick={() => router.push(`/dashboard/developer/project/${project.id}/financial-report`)}
              className="flex items-center gap-2 border px-4 py-2 rounded-lg hover:bg-secondary"
            >
              <Download className="w-4 h-4" />
              Financial Report
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-8 bg-secondary p-1 rounded-lg w-fit">
          {["overview", "progress", "financials"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-md capitalize transition-colors ${
                activeTab === tab ? "bg-primary text-primary-foreground" : "hover:bg-background"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-card rounded-lg border p-6">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.name}
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">Project Description</h3>
                <p className="text-muted-foreground">{project.description}</p>
              </div>

              <div className="bg-card rounded-lg border p-6">
                <h3 className="text-xl font-semibold mb-4">Project Milestones</h3>
                <div className="space-y-4">
                  {project.milestones.map((milestone, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div
                        className={`w-4 h-4 rounded-full ${
                          milestone.status === "completed"
                            ? "bg-green-500"
                            : milestone.status === "in-progress"
                              ? "bg-blue-500"
                              : "bg-gray-300"
                        }`}
                      />
                      <div className="flex-1">
                        <p className="font-medium">{milestone.name}</p>
                        <p className="text-sm text-muted-foreground">{milestone.date}</p>
                      </div>
                      <span
                        className={`px-2 py-1 rounded text-xs capitalize ${
                          milestone.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : milestone.status === "in-progress"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {milestone.status.replace("-", " ")}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-card rounded-lg border p-6">
                <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-semibold">{project.progress}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Units</span>
                    <span className="font-semibold">{project.totalUnits}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Units Sold</span>
                    <span className="font-semibold">{project.soldUnits}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Value</span>
                    <span className="font-semibold">{project.totalValue}</span>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-lg border p-6">
                <h3 className="text-lg font-semibold mb-4">Timeline</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Start Date</p>
                      <p className="text-sm text-muted-foreground">{project.startDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Expected Completion</p>
                      <p className="text-sm text-muted-foreground">{project.expectedCompletion}</p>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => router.push(`/dashboard/developer/project/${project.id}/update-progress`)}
                className="w-full bg-primary text-primary-foreground p-3 rounded-lg hover:bg-primary/90 transition-colors"
              >
                Update Progress
              </button>
            </div>
          </div>
        )}

        {activeTab === "progress" && (
          <div className="bg-card rounded-lg border p-6">
            <h3 className="text-xl font-semibold mb-6">Development Progress</h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Overall Progress</span>
                  <span className="text-primary font-semibold">{project.progress}%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full transition-all duration-300"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>

              {project.milestones.map((milestone, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">{milestone.name}</h4>
                    <span
                      className={`px-2 py-1 rounded text-xs capitalize ${
                        milestone.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : milestone.status === "in-progress"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {milestone.status.replace("-", " ")}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">Target Date: {milestone.date}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "financials" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-card rounded-lg border p-6">
              <div className="flex items-center gap-2 mb-4">
                <DollarSign className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold">Investment Overview</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Investment</span>
                  <span className="font-semibold">${(project.financials.totalInvestment / 1000000).toFixed(1)}M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount Spent</span>
                  <span className="font-semibold">${(project.financials.currentSpent / 1000000).toFixed(1)}M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Remaining Budget</span>
                  <span className="font-semibold text-primary">
                    ${((project.financials.totalInvestment - project.financials.currentSpent) / 1000000).toFixed(1)}M
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg border p-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-green-500" />
                <h3 className="text-lg font-semibold">Revenue Overview</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Projected Revenue</span>
                  <span className="font-semibold">${(project.financials.projectedRevenue / 1000000).toFixed(1)}M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Current Revenue</span>
                  <span className="font-semibold">${(project.financials.currentRevenue / 1000000).toFixed(1)}M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Expected Profit</span>
                  <span className="font-semibold text-green-600">
                    ${((project.financials.projectedRevenue - project.financials.totalInvestment) / 1000000).toFixed(1)}
                    M
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
