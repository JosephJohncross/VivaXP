"use client"

import type React from "react"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Upload, CheckCircle, Clock, AlertCircle } from "lucide-react"

export default function UpdateProgressPage() {
  const params = useParams()
  const router = useRouter()
  const [selectedMilestone, setSelectedMilestone] = useState("")
  const [progressUpdate, setProgressUpdate] = useState("")
  const [images, setImages] = useState<File[]>([])

  // Mock project data
  const project = {
    id: params.id,
    name: "Skyline Towers",
    location: "Lekki, Lagos",
    currentProgress: 65,
    milestones: [
      { id: "1", name: "Foundation", status: "completed", progress: 100, dueDate: "2024-03-01" },
      { id: "2", name: "Structure", status: "in-progress", progress: 75, dueDate: "2024-08-15" },
      { id: "3", name: "Interior", status: "pending", progress: 0, dueDate: "2024-11-01" },
      { id: "4", name: "Final Inspection", status: "pending", progress: 0, dueDate: "2025-10-15" },
    ],
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Submitting progress update:", {
      milestone: selectedMilestone,
      update: progressUpdate,
      images: images.length,
    })
    alert("Progress updated successfully!")
    router.back()
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "in-progress":
        return <Clock className="w-5 h-5 text-blue-500" />
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "in-progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => router.back()} className="p-2 hover:bg-secondary rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Update Progress: {project.name}
            </h1>
            <p className="text-muted-foreground">{project.location}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Progress Update Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-card rounded-lg border p-6 space-y-6">
              <h2 className="text-xl font-semibold">Submit Progress Update</h2>

              {/* Milestone Selection */}
              <div>
                <label className="block text-sm font-medium mb-2">Select Milestone</label>
                <select
                  value={selectedMilestone}
                  onChange={(e) => setSelectedMilestone(e.target.value)}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                >
                  <option value="">Choose a milestone...</option>
                  {project.milestones.map((milestone) => (
                    <option key={milestone.id} value={milestone.id}>
                      {milestone.name} ({milestone.progress}% complete)
                    </option>
                  ))}
                </select>
              </div>

              {/* Progress Description */}
              <div>
                <label className="block text-sm font-medium mb-2">Progress Description</label>
                <textarea
                  value={progressUpdate}
                  onChange={(e) => setProgressUpdate(e.target.value)}
                  placeholder="Describe the current progress, completed work, and any challenges..."
                  className="w-full p-3 border rounded-lg h-32 focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium mb-2">Progress Photos</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">Upload photos showing current progress</p>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="bg-primary text-primary-foreground px-4 py-2 rounded-lg cursor-pointer hover:bg-primary/90 inline-block"
                  >
                    Choose Files
                  </label>
                  {images.length > 0 && (
                    <p className="text-sm text-muted-foreground mt-2">{images.length} file(s) selected</p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="flex-1 border px-4 py-3 rounded-lg hover:bg-secondary transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-primary text-primary-foreground px-4 py-3 rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Submit Update
                </button>
              </div>
            </form>
          </div>

          {/* Project Overview */}
          <div className="space-y-6">
            <div className="bg-card rounded-lg border p-6">
              <h3 className="text-lg font-semibold mb-4">Current Progress</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Overall</span>
                    <span className="text-primary font-semibold">{project.currentProgress}%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full transition-all duration-300"
                      style={{ width: `${project.currentProgress}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg border p-6">
              <h3 className="text-lg font-semibold mb-4">Milestones</h3>
              <div className="space-y-4">
                {project.milestones.map((milestone) => (
                  <div key={milestone.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(milestone.status)}
                        <span className="font-medium">{milestone.name}</span>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs capitalize ${getStatusColor(milestone.status)}`}>
                        {milestone.status.replace("-", " ")}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Due: {milestone.dueDate}</span>
                      <span className="font-medium">{milestone.progress}%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2 mt-2">
                      <div
                        className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${milestone.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card rounded-lg border p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button
                  onClick={() => router.push(`/dashboard/developer/project/${project.id}`)}
                  className="w-full bg-primary text-primary-foreground p-2 rounded-lg hover:bg-primary/90 text-sm"
                >
                  View Project Details
                </button>
                <button
                  onClick={() => router.push(`/dashboard/developer/project/${project.id}/3d-view`)}
                  className="w-full border p-2 rounded-lg hover:bg-secondary text-sm"
                >
                  View 3D Model
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
