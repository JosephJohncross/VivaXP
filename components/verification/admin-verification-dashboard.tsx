"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { CheckCircle, XCircle, Clock, FileText, User, Building, Eye } from "lucide-react"
import { verificationService } from "@/lib/services/verification-service"
import type { PropertyVerification, UserKYC } from "@/lib/services/verification-service"

export function AdminVerificationDashboard() {
  const [propertyVerifications, setPropertyVerifications] = useState<PropertyVerification[]>([])
  const [userKYCs, setUserKYCs] = useState<UserKYC[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedVerification, setSelectedVerification] = useState<PropertyVerification | null>(null)
  const [selectedKYC, setSelectedKYC] = useState<UserKYC | null>(null)
  const [reviewComments, setReviewComments] = useState("")

  useEffect(() => {
    loadVerificationData()
  }, [])

  const loadVerificationData = async () => {
    try {
      const [properties, kycs] = await Promise.all([
        verificationService.getPropertyVerifications(),
        verificationService.getUserKYCs(),
      ])
      setPropertyVerifications(properties)
      setUserKYCs(kycs)
    } catch (error) {
      console.error("Error loading verification data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleApproveVerification = async (id: string, type: "property" | "kyc") => {
    try {
      if (type === "property") {
        await verificationService.approveVerification(id, reviewComments)
      } else {
        // Handle KYC approval
        console.log("Approving KYC:", id)
      }
      setReviewComments("")
      loadVerificationData()
    } catch (error) {
      console.error("Error approving verification:", error)
    }
  }

  const handleRejectVerification = async (id: string, type: "property" | "kyc") => {
    if (!reviewComments.trim()) {
      alert("Please provide rejection comments")
      return
    }

    try {
      if (type === "property") {
        await verificationService.rejectVerification(id, reviewComments)
      } else {
        // Handle KYC rejection
        console.log("Rejecting KYC:", id)
      }
      setReviewComments("")
      loadVerificationData()
    } catch (error) {
      console.error("Error rejecting verification:", error)
    }
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { variant: "secondary" as const, icon: Clock, color: "text-yellow-600" },
      under_review: { variant: "secondary" as const, icon: Eye, color: "text-blue-600" },
      approved: { variant: "default" as const, icon: CheckCircle, color: "text-green-600" },
      rejected: { variant: "destructive" as const, icon: XCircle, color: "text-red-600" },
    }

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending
    const Icon = config.icon

    return (
      <Badge variant={config.variant} className="font-serif">
        <Icon className={`h-3 w-3 mr-1 ${config.color}`} />
        {status.replace("_", " ").toUpperCase()}
      </Badge>
    )
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-4 bg-muted rounded w-1/2 mb-2"></div>
              <div className="h-8 bg-muted rounded w-3/4"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-sans text-3xl font-bold">Verification Dashboard</h1>
        <div className="flex space-x-4">
          <Badge variant="outline" className="font-serif">
            <Building className="h-4 w-4 mr-2" />
            {propertyVerifications.length} Properties
          </Badge>
          <Badge variant="outline" className="font-serif">
            <User className="h-4 w-4 mr-2" />
            {userKYCs.length} KYC Reviews
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="properties" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="properties" className="font-serif">
            Property Verifications
          </TabsTrigger>
          <TabsTrigger value="kyc" className="font-serif">
            KYC Reviews
          </TabsTrigger>
        </TabsList>

        <TabsContent value="properties" className="space-y-4">
          {propertyVerifications.map((verification) => (
            <Card key={verification.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="font-sans text-lg">Property ID: {verification.propertyId}</CardTitle>
                  {getStatusBadge(verification.status)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <Label className="font-serif text-sm text-muted-foreground">Documents</Label>
                    <p className="font-sans font-medium">{verification.documents.length} uploaded</p>
                  </div>
                  <div>
                    <Label className="font-serif text-sm text-muted-foreground">AI Score</Label>
                    <p className="font-sans font-medium">{verification.aiVerification?.score || "N/A"}%</p>
                  </div>
                  <div>
                    <Label className="font-serif text-sm text-muted-foreground">Submitted</Label>
                    <p className="font-sans font-medium">
                      {verification.submittedAt ? new Date(verification.submittedAt).toLocaleDateString() : "N/A"}
                    </p>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="font-serif bg-transparent"
                        onClick={() => setSelectedVerification(verification)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Review Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="font-sans">Property Verification Review</DialogTitle>
                      </DialogHeader>
                      {selectedVerification && (
                        <div className="space-y-6">
                          {/* Documents */}
                          <div>
                            <h3 className="font-sans text-lg font-semibold mb-3">Documents</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {selectedVerification.documents.map((doc) => (
                                <div key={doc.id} className="border rounded-lg p-4">
                                  <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center space-x-2">
                                      <FileText className="h-4 w-4" />
                                      <span className="font-serif font-medium">{doc.fileName}</span>
                                    </div>
                                    {getStatusBadge(doc.status)}
                                  </div>
                                  <p className="font-serif text-sm text-muted-foreground capitalize">
                                    {doc.type.replace("_", " ")}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* AI Verification */}
                          {selectedVerification.aiVerification && (
                            <div>
                              <h3 className="font-sans text-lg font-semibold mb-3">AI Analysis</h3>
                              <div className="bg-muted/50 rounded-lg p-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label className="font-serif text-sm">Verification Score</Label>
                                    <p className="font-sans text-2xl font-bold text-primary">
                                      {selectedVerification.aiVerification.score}%
                                    </p>
                                  </div>
                                  <div>
                                    <Label className="font-serif text-sm">Confidence Level</Label>
                                    <p className="font-sans text-2xl font-bold">
                                      {selectedVerification.aiVerification.confidence}%
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Review Actions */}
                          <div>
                            <h3 className="font-sans text-lg font-semibold mb-3">Admin Review</h3>
                            <div className="space-y-4">
                              <div>
                                <Label htmlFor="comments" className="font-serif">
                                  Comments
                                </Label>
                                <Textarea
                                  id="comments"
                                  placeholder="Add review comments..."
                                  value={reviewComments}
                                  onChange={(e) => setReviewComments(e.target.value)}
                                  className="font-serif"
                                />
                              </div>
                              <div className="flex space-x-2">
                                <Button
                                  onClick={() => handleApproveVerification(selectedVerification.id, "property")}
                                  className="font-serif bg-green-600 hover:bg-green-700"
                                >
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Approve
                                </Button>
                                <Button
                                  variant="destructive"
                                  onClick={() => handleRejectVerification(selectedVerification.id, "property")}
                                  className="font-serif"
                                >
                                  <XCircle className="h-4 w-4 mr-2" />
                                  Reject
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>

                  {verification.status === "under_review" && (
                    <>
                      <Button
                        size="sm"
                        onClick={() => handleApproveVerification(verification.id, "property")}
                        className="font-serif bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Quick Approve
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleRejectVerification(verification.id, "property")}
                        className="font-serif"
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        Reject
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="kyc" className="space-y-4">
          {userKYCs.map((kyc) => (
            <Card key={kyc.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="font-sans text-lg">{kyc.personalInfo.fullName}</CardTitle>
                  {getStatusBadge(kyc.status)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <Label className="font-serif text-sm text-muted-foreground">Nationality</Label>
                    <p className="font-sans font-medium">{kyc.personalInfo.nationality}</p>
                  </div>
                  <div>
                    <Label className="font-serif text-sm text-muted-foreground">Risk Level</Label>
                    <p className="font-sans font-medium capitalize">{kyc.riskAssessment?.level || "N/A"}</p>
                  </div>
                  <div>
                    <Label className="font-serif text-sm text-muted-foreground">Documents</Label>
                    <p className="font-sans font-medium">{kyc.documents.length} uploaded</p>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="font-serif bg-transparent">
                    <Eye className="h-4 w-4 mr-2" />
                    Review KYC
                  </Button>
                  {kyc.status === "under_review" && (
                    <>
                      <Button
                        size="sm"
                        onClick={() => handleApproveVerification(kyc.id, "kyc")}
                        className="font-serif bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Approve
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleRejectVerification(kyc.id, "kyc")}
                        className="font-serif"
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        Reject
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
