"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, FileText, CheckCircle, Clock, X } from "lucide-react"
import { verificationService } from "@/lib/services/verification-service"

interface DocumentUploadProps {
  propertyId?: string
  type: "property" | "kyc"
  onUploadComplete?: () => void
}

export function DocumentUpload({ propertyId, type, onUploadComplete }: DocumentUploadProps) {
  const [files, setFiles] = useState<File[]>([])
  const [uploading, setUploading] = useState(false)
  const [documentTypes, setDocumentTypes] = useState<Record<string, string>>({})

  const propertyDocumentTypes = [
    { value: "title_deed", label: "Title Deed" },
    { value: "survey_plan", label: "Survey Plan" },
    { value: "building_permit", label: "Building Permit" },
    { value: "tax_receipt", label: "Tax Receipt" },
    { value: "insurance", label: "Insurance Certificate" },
    { value: "inspection_report", label: "Inspection Report" },
  ]

  const kycDocumentTypes = [
    { value: "passport", label: "Passport" },
    { value: "national_id", label: "National ID" },
    { value: "drivers_license", label: "Driver's License" },
    { value: "utility_bill", label: "Utility Bill" },
    { value: "bank_statement", label: "Bank Statement" },
  ]

  const availableTypes = type === "property" ? propertyDocumentTypes : kycDocumentTypes

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || [])
    setFiles((prev) => [...prev, ...selectedFiles])
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
    setDocumentTypes((prev) => {
      const updated = { ...prev }
      delete updated[index.toString()]
      return updated
    })
  }

  const setDocumentType = (fileIndex: number, docType: string) => {
    setDocumentTypes((prev) => ({
      ...prev,
      [fileIndex.toString()]: docType,
    }))
  }

  const handleUpload = async () => {
    if (files.length === 0) return

    setUploading(true)
    try {
      if (type === "property" && propertyId) {
        await verificationService.submitPropertyVerification(propertyId, files)
      } else if (type === "kyc") {
        // For KYC, we'd also need personal info - this is simplified
        const personalInfo = {
          fullName: "Current User",
          dateOfBirth: "1990-01-01",
          nationality: "Nigerian",
          address: "123 Main St",
          phoneNumber: "+234-123-456-7890",
        }
        await verificationService.submitKYC(personalInfo, files)
      }

      setFiles([])
      setDocumentTypes({})
      onUploadComplete?.()
    } catch (error) {
      console.error("Upload error:", error)
    } finally {
      setUploading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-sans text-xl">Upload {type === "property" ? "Property" : "KYC"} Documents</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* File Upload Area */}
        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
          <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <div className="space-y-2">
            <p className="font-serif text-lg">Drop files here or click to browse</p>
            <p className="font-serif text-sm text-muted-foreground">Supported formats: PDF, JPG, PNG (Max 10MB each)</p>
          </div>
          <Input type="file" multiple accept=".pdf,.jpg,.jpeg,.png" onChange={handleFileSelect} className="mt-4" />
        </div>

        {/* Selected Files */}
        {files.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-sans text-lg font-semibold">Selected Documents</h3>
            {files.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-serif font-medium">{file.name}</p>
                    <p className="font-serif text-sm text-muted-foreground">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Select
                    value={documentTypes[index.toString()] || ""}
                    onValueChange={(value) => setDocumentType(index, value)}
                  >
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Select document type" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableTypes.map((docType) => (
                        <SelectItem key={docType.value} value={docType.value}>
                          {docType.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(index)}
                    className="text-destructive hover:text-destructive"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Upload Button */}
        {files.length > 0 && (
          <Button
            onClick={handleUpload}
            disabled={uploading || files.some((_, index) => !documentTypes[index.toString()])}
            className="w-full font-serif"
          >
            {uploading ? (
              <>
                <Clock className="h-4 w-4 mr-2 animate-spin" />
                Uploading Documents...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                Upload {files.length} Document{files.length > 1 ? "s" : ""}
              </>
            )}
          </Button>
        )}

        {/* Required Documents Info */}
        <div className="bg-muted/50 rounded-lg p-4">
          <h4 className="font-sans font-semibold mb-2">Required Documents:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {availableTypes.slice(0, 4).map((docType) => (
              <div key={docType.value} className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span className="font-serif text-sm">{docType.label}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
