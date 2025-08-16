"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Users, Zap, Rocket, TrendingUp, DollarSign, Building } from "lucide-react"

export default function DeveloperDashboard() {
  const [showNewProjectModal, setShowNewProjectModal] = useState(false)
  const [showTokenLaunchModal, setShowTokenLaunchModal] = useState(false)
  const router = useRouter()

  const mockProjects = [
    {
      id: "1",
      name: "Skyline Towers",
      location: "Lekki, Lagos",
      type: "Residential Complex",
      status: "Under Construction",
      progress: 65,
      totalUnits: 120,
      soldUnits: 78,
      totalValue: "$15M",
      image: "/modern-building-construction.png",
    },
    {
      id: "2",
      name: "Green Valley Estate",
      location: "Abuja",
      type: "Mixed Development",
      status: "Planning",
      progress: 15,
      totalUnits: 200,
      soldUnits: 0,
      totalValue: "$25M",
      image: "/modern-estate-plans.png",
    },
  ]

  const handleNewProject = () => {
    console.log("[v0] Opening new project form")
    router.push("/dashboard/developer/create-project")
  }

  const handleTokenLaunch = () => {
    console.log("[v0] Opening token launch wizard")
    setShowTokenLaunchModal(true)
  }

  const handleFindInvestors = () => {
    console.log("[v0] Redirecting to investor matching")
    alert("Connecting you with potential investors...")
  }

  return (
    <div className="min-h-screen bg-background cyber-grid">
      {/* Animated background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/8 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/8 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-secondary/8 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      <div className="relative z-10 container mx-auto px-3 sm:px-4 lg:px-8 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-2 sm:gap-3 mb-4">
            <Users className="w-6 h-6 sm:w-8 sm:h-8 text-primary neon-glow" />
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gradient-primary">Developer Dashboard</h1>
            <Zap className="w-4 h-4 sm:w-6 sm:h-6 text-secondary neon-glow" />
          </div>
          <p className="text-sm sm:text-base text-muted-foreground">Manage your development projects and track progress</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <button
            onClick={handleNewProject}
            className="w-full gradient-primary p-3 sm:p-4 rounded-lg hover:opacity-90 transition-all duration-300 hover:scale-105 cyber-card border border-primary/50 flex items-center justify-center gap-2"
          >
            <Building className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-sm sm:text-base">Create New Project</span>
          </button>
          <button
            onClick={handleFindInvestors}
            className="w-full border border-secondary/50 text-secondary p-3 sm:p-4 rounded-lg hover:bg-secondary/10 hover:border-secondary transition-all duration-300 hover:scale-105 cyber-card flex items-center justify-center gap-2"
          >
            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-sm sm:text-base">Find Investors</span>
          </button>
          <button
            onClick={handleTokenLaunch}
            className="w-full gradient-accent p-3 sm:p-4 rounded-lg hover:opacity-90 transition-all duration-300 hover:scale-105 cyber-card border border-accent/50 flex items-center justify-center gap-2"
          >
            <Rocket className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-sm sm:text-base">Launch Token Sale</span>
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="cyber-card p-4 sm:p-6 rounded-lg border border-border/50 glow-on-hover hologram-effect">
            <div className="flex items-center gap-2 mb-2">
              <Building className="w-4 h-4 sm:w-5 sm:h-5 text-primary neon-glow" />
              <h3 className="text-xs sm:text-sm font-medium text-muted-foreground">Active Projects</h3>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-gradient-primary">2</p>
            <p className="text-xs text-green-400">+1 this quarter</p>
          </div>
          <div className="cyber-card p-6 rounded-lg border border-border/50 glow-on-hover hologram-effect">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-5 h-5 text-secondary neon-glow" />
              <h3 className="text-sm font-medium text-muted-foreground">Total Value</h3>
            </div>
            <p className="text-2xl font-bold text-gradient-secondary">$85M</p>
            <p className="text-xs text-green-400">+15% from last year</p>
          </div>
          <div className="cyber-card p-6 rounded-lg border border-border/50 glow-on-hover hologram-effect">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-accent neon-glow" />
              <h3 className="text-sm font-medium text-muted-foreground">Units Sold</h3>
            </div>
            <p className="text-2xl font-bold text-gradient-accent">234</p>
            <p className="text-xs text-green-600">78% of total</p>
          </div>
          <div className="bg-card p-6 rounded-lg border">
            <h3 className="text-sm font-medium text-muted-foreground">Avg. Progress</h3>
            <p className="text-2xl font-bold text-primary">42%</p>
            <p className="text-xs text-blue-600">On schedule</p>
          </div>
        </div>

        {/* Projects */}
        <div className="bg-card rounded-lg border p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Development Projects</h2>
            <button
              onClick={handleNewProject}
              className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
            >
              New Project
            </button>
          </div>

          <div className="space-y-6">
            {mockProjects.map((project) => (
              <div key={project.id} className="border rounded-lg p-6">
                <div className="flex gap-6">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.name}
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold">{project.name}</h3>
                        <p className="text-muted-foreground">{project.location}</p>
                        <p className="text-sm bg-secondary px-2 py-1 rounded inline-block mt-1">{project.type}</p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded text-sm ${
                          project.status === "Under Construction"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {project.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Progress</p>
                        <p className="font-semibold">{project.progress}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Total Units</p>
                        <p className="font-semibold">{project.totalUnits}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Units Sold</p>
                        <p className="font-semibold">{project.soldUnits}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Total Value</p>
                        <p className="font-semibold">{project.totalValue}</p>
                      </div>
                    </div>

                    <div className="w-full bg-secondary rounded-full h-2 mb-4">
                      <div
                        className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          console.log(`[v0] Viewing details for project ${project.id}`)
                          router.push(`/dashboard/developer/project/${project.id}`)
                        }}
                        className="bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90 text-sm"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => {
                          console.log(`[v0] Updating progress for project ${project.id}`)
                          router.push(`/dashboard/developer/project/${project.id}/update-progress`)
                        }}
                        className="border px-4 py-2 rounded hover:bg-secondary text-sm"
                      >
                        Update Progress
                      </button>
                      <button
                        onClick={() => {
                          console.log(`[v0] Generating financial report for project ${project.id}`)
                          router.push(`/dashboard/developer/project/${project.id}/financial-report`)
                        }}
                        className="border px-4 py-2 rounded hover:bg-secondary text-sm"
                      >
                        Financial Report
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {showNewProjectModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-card p-6 rounded-lg max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold mb-4">Create New Project</h3>
              <div className="space-y-4 mb-4">
                <input className="w-full p-2 border rounded-lg" placeholder="Project Name" />
                <input className="w-full p-2 border rounded-lg" placeholder="Location" />
                <select className="w-full p-2 border rounded-lg">
                  <option>Residential</option>
                  <option>Commercial</option>
                  <option>Mixed Use</option>
                </select>
                <input className="w-full p-2 border rounded-lg" placeholder="Total Value ($)" />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowNewProjectModal(false)}
                  className="flex-1 border px-4 py-2 rounded-lg hover:bg-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    console.log("[v0] Creating new project...")
                    alert("Project created successfully!")
                    setShowNewProjectModal(false)
                  }}
                  className="flex-1 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        )}

        {showTokenLaunchModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-card p-6 rounded-lg max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold mb-4">Launch Token Sale</h3>
              <div className="space-y-4 mb-4">
                <select className="w-full p-2 border rounded-lg">
                  <option>Skyline Towers</option>
                  <option>Green Valley Estate</option>
                </select>
                <input className="w-full p-2 border rounded-lg" placeholder="Token Supply" />
                <input className="w-full p-2 border rounded-lg" placeholder="Price per Token ($)" />
                <input className="w-full p-2 border rounded-lg" placeholder="Minimum Investment ($)" />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowTokenLaunchModal(false)}
                  className="flex-1 border px-4 py-2 rounded-lg hover:bg-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    console.log("[v0] Launching token sale...")
                    alert("Token sale launched successfully!")
                    setShowTokenLaunchModal(false)
                  }}
                  className="flex-1 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90"
                >
                  Launch
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
