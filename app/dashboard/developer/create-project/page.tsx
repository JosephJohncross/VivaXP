"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Upload, MapPin, DollarSign, Calendar, Users, Building, Coins } from "lucide-react"

export default function CreateProjectPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Basic Information
    name: "",
    description: "",
    location: "",
    projectType: "",

    // Financial Details
    totalInvestment: "",
    expectedRevenue: "",
    tokenSupply: "",
    tokenPrice: "",
    minimumInvestment: "",

    // Project Details
    totalUnits: "",
    floors: "",
    startDate: "",
    expectedCompletion: "",

    // Tokenization
    enableTokenization: false,
    tokenSymbol: "",
    revenueSharing: "",

    // Documents
    images: [] as File[],
    documents: [] as File[],
  })

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = (field: string, files: FileList | null) => {
    if (files) {
      handleInputChange(field, Array.from(files))
    }
  }

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Creating new project:", formData)
    alert("Project created successfully!")
    router.push("/dashboard/developer")
  }

  const steps = [
    { number: 1, title: "Basic Information", icon: Building },
    { number: 2, title: "Financial Details", icon: DollarSign },
    { number: 3, title: "Project Specifications", icon: Users },
    { number: 4, title: "Tokenization & Launch", icon: Coins },
  ]

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
              Create New Project
            </h1>
            <p className="text-muted-foreground">Launch your next real estate development</p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <div key={step.number} className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-colors ${
                      currentStep >= step.number
                        ? "bg-primary border-primary text-primary-foreground"
                        : "border-gray-300 text-gray-400"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="ml-2 hidden md:block">
                    <p
                      className={`text-sm font-medium ${currentStep >= step.number ? "text-primary" : "text-gray-400"}`}
                    >
                      Step {step.number}
                    </p>
                    <p className={`text-xs ${currentStep >= step.number ? "text-foreground" : "text-gray-400"}`}>
                      {step.title}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-8 h-0.5 ml-4 ${currentStep > step.number ? "bg-primary" : "bg-gray-300"}`} />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div className="bg-card rounded-lg border p-8 space-y-6">
              <h2 className="text-2xl font-semibold mb-6">Basic Information</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Project Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="e.g., Skyline Towers"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Project Type *</label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => handleInputChange("projectType", e.target.value)}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  >
                    <option value="">Select project type</option>
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                    <option value="mixed-use">Mixed Use</option>
                    <option value="industrial">Industrial</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Location *</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="e.g., Lekki, Lagos, Nigeria"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Project Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  className="w-full p-3 border rounded-lg h-32 focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Describe your project, its unique features, and target market..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Project Images</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Upload renderings, site photos, or architectural plans
                  </p>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleFileUpload("images", e.target.files)}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="bg-primary text-primary-foreground px-4 py-2 rounded-lg cursor-pointer hover:bg-primary/90 inline-block"
                  >
                    Choose Images
                  </label>
                  {formData.images.length > 0 && (
                    <p className="text-sm text-muted-foreground mt-2">{formData.images.length} file(s) selected</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Financial Details */}
          {currentStep === 2 && (
            <div className="bg-card rounded-lg border p-8 space-y-6">
              <h2 className="text-2xl font-semibold mb-6">Financial Details</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Total Investment Required *</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      value={formData.totalInvestment}
                      onChange={(e) => handleInputChange("totalInvestment", e.target.value)}
                      className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="15000000"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Expected Revenue *</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      value={formData.expectedRevenue}
                      onChange={(e) => handleInputChange("expectedRevenue", e.target.value)}
                      className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="22000000"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Start Date *</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => handleInputChange("startDate", e.target.value)}
                      className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Expected Completion *</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="date"
                      value={formData.expectedCompletion}
                      onChange={(e) => handleInputChange("expectedCompletion", e.target.value)}
                      className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Project Specifications */}
          {currentStep === 3 && (
            <div className="bg-card rounded-lg border p-8 space-y-6">
              <h2 className="text-2xl font-semibold mb-6">Project Specifications</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Total Units *</label>
                  <div className="relative">
                    <Building className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      value={formData.totalUnits}
                      onChange={(e) => handleInputChange("totalUnits", e.target.value)}
                      className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="120"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Number of Floors</label>
                  <div className="relative">
                    <Building className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      value={formData.floors}
                      onChange={(e) => handleInputChange("floors", e.target.value)}
                      className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="25"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Project Documents</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Upload permits, architectural plans, legal documents
                  </p>
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => handleFileUpload("documents", e.target.files)}
                    className="hidden"
                    id="document-upload"
                  />
                  <label
                    htmlFor="document-upload"
                    className="bg-primary text-primary-foreground px-4 py-2 rounded-lg cursor-pointer hover:bg-primary/90 inline-block"
                  >
                    Choose Documents
                  </label>
                  {formData.documents.length > 0 && (
                    <p className="text-sm text-muted-foreground mt-2">{formData.documents.length} file(s) selected</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Tokenization & Launch */}
          {currentStep === 4 && (
            <div className="bg-card rounded-lg border p-8 space-y-6">
              <h2 className="text-2xl font-semibold mb-6">Tokenization & Launch</h2>

              <div className="flex items-center space-x-3 mb-6">
                <input
                  type="checkbox"
                  id="enableTokenization"
                  checked={formData.enableTokenization}
                  onChange={(e) => handleInputChange("enableTokenization", e.target.checked)}
                  className="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label htmlFor="enableTokenization" className="text-sm font-medium">
                  Enable tokenization for this project
                </label>
              </div>

              {formData.enableTokenization && (
                <div className="space-y-6 border-l-4 border-primary pl-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Token Symbol *</label>
                      <input
                        type="text"
                        value={formData.tokenSymbol}
                        onChange={(e) => handleInputChange("tokenSymbol", e.target.value.toUpperCase())}
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="SKY"
                        maxLength={5}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Token Supply *</label>
                      <input
                        type="number"
                        value={formData.tokenSupply}
                        onChange={(e) => handleInputChange("tokenSupply", e.target.value)}
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="1000000"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Token Price (USD) *</label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <input
                          type="number"
                          step="0.01"
                          value={formData.tokenPrice}
                          onChange={(e) => handleInputChange("tokenPrice", e.target.value)}
                          className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="15.00"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Minimum Investment (USD) *</label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <input
                          type="number"
                          value={formData.minimumInvestment}
                          onChange={(e) => handleInputChange("minimumInvestment", e.target.value)}
                          className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="1000"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Revenue Sharing (%)</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={formData.revenueSharing}
                      onChange={(e) => handleInputChange("revenueSharing", e.target.value)}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="70"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Percentage of rental income shared with token holders
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              type="button"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="px-6 py-3 border rounded-lg hover:bg-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            {currentStep < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                Create Project
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
