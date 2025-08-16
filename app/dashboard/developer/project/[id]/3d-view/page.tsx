"use client"

import { useState, useRef, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, RotateCcw, ZoomIn, ZoomOut, Move3D, Eye, Settings } from "lucide-react"

export default function Project3DView() {
  const params = useParams()
  const router = useRouter()
  const [viewMode, setViewMode] = useState("exterior")
  const [isLoading, setIsLoading] = useState(true)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Mock project data
  const project = {
    id: params.id,
    name: "Skyline Towers",
    location: "Lekki, Lagos",
    type: "Residential Complex",
  }

  useEffect(() => {
    // Simulate 3D model loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  const handleViewChange = (mode: string) => {
    setViewMode(mode)
    console.log(`[v0] Switching to ${mode} view`)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button onClick={() => router.back()} className="p-2 hover:bg-secondary rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                3D View: {project.name}
              </h1>
              <p className="text-muted-foreground">
                {project.location} • {project.type}
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <button className="p-2 hover:bg-secondary rounded-lg transition-colors" title="Reset View">
              <RotateCcw className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-secondary rounded-lg transition-colors" title="Zoom In">
              <ZoomIn className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-secondary rounded-lg transition-colors" title="Zoom Out">
              <ZoomOut className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-secondary rounded-lg transition-colors" title="Settings">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* 3D Viewer */}
          <div className="lg:col-span-3">
            <div className="bg-card rounded-lg border p-6 h-[600px] relative">
              {isLoading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Loading 3D Model...</p>
                  </div>
                </div>
              ) : (
                <div className="relative h-full bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-lg overflow-hidden">
                  {/* Mock 3D View */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      {/* Building representation */}
                      <div className="relative transform-gpu perspective-1000">
                        <div className="w-64 h-80 bg-gradient-to-t from-gray-400 to-gray-200 dark:from-gray-700 dark:to-gray-500 rounded-lg shadow-2xl transform rotate-y-12 rotate-x-6">
                          {/* Windows */}
                          <div className="grid grid-cols-6 gap-2 p-4 h-full">
                            {Array.from({ length: 48 }).map((_, i) => (
                              <div key={i} className="bg-blue-200 dark:bg-blue-800 rounded-sm opacity-80" />
                            ))}
                          </div>
                        </div>
                        {/* Shadow */}
                        <div className="absolute -bottom-4 left-8 w-64 h-8 bg-black/20 rounded-full blur-md transform scale-x-150"></div>
                      </div>
                    </div>
                  </div>

                  {/* View Controls Overlay */}
                  <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm rounded-lg p-2">
                    <p className="text-sm font-medium mb-2">View Mode</p>
                    <div className="flex gap-1">
                      {["exterior", "interior", "floor-plan"].map((mode) => (
                        <button
                          key={mode}
                          onClick={() => handleViewChange(mode)}
                          className={`px-3 py-1 rounded text-xs capitalize transition-colors ${
                            viewMode === mode ? "bg-primary text-primary-foreground" : "hover:bg-secondary"
                          }`}
                        >
                          {mode.replace("-", " ")}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Progress Indicator */}
                  <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-sm rounded-lg p-3">
                    <p className="text-sm font-medium mb-1">Construction Progress</p>
                    <div className="w-32 bg-secondary rounded-full h-2">
                      <div className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full w-16"></div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">65% Complete</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Controls Panel */}
          <div className="space-y-6">
            <div className="bg-card rounded-lg border p-6">
              <h3 className="text-lg font-semibold mb-4">View Options</h3>
              <div className="space-y-3">
                <button
                  onClick={() => handleViewChange("exterior")}
                  className={`w-full p-3 rounded-lg text-left transition-colors ${
                    viewMode === "exterior" ? "bg-primary text-primary-foreground" : "hover:bg-secondary"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    <span>Exterior View</span>
                  </div>
                </button>
                <button
                  onClick={() => handleViewChange("interior")}
                  className={`w-full p-3 rounded-lg text-left transition-colors ${
                    viewMode === "interior" ? "bg-primary text-primary-foreground" : "hover:bg-secondary"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Move3D className="w-4 h-4" />
                    <span>Interior View</span>
                  </div>
                </button>
                <button
                  onClick={() => handleViewChange("floor-plan")}
                  className={`w-full p-3 rounded-lg text-left transition-colors ${
                    viewMode === "floor-plan" ? "bg-primary text-primary-foreground" : "hover:bg-secondary"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Settings className="w-4 h-4" />
                    <span>Floor Plan</span>
                  </div>
                </button>
              </div>
            </div>

            <div className="bg-card rounded-lg border p-6">
              <h3 className="text-lg font-semibold mb-4">Project Info</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-muted-foreground">Status</p>
                  <p className="font-medium">Under Construction</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Progress</p>
                  <p className="font-medium">65%</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Total Units</p>
                  <p className="font-medium">120</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Floors</p>
                  <p className="font-medium">25</p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg border p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button
                  onClick={() => router.push(`/dashboard/developer/project/${project.id}`)}
                  className="w-full bg-primary text-primary-foreground p-2 rounded-lg hover:bg-primary/90 text-sm"
                >
                  View Details
                </button>
                <button
                  onClick={() => router.push(`/dashboard/developer/project/${project.id}/update-progress`)}
                  className="w-full border p-2 rounded-lg hover:bg-secondary text-sm"
                >
                  Update Progress
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
