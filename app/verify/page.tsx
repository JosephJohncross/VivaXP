import { ProtectedRoute } from "@/components/auth/protected-route"
import { DocumentUpload } from "@/components/verification/document-upload"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, FileText } from "lucide-react"

export default function VerifyPage() {
  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="font-sans text-3xl font-bold mb-4">Complete Your Verification</h1>
          <p className="font-serif text-lg text-muted-foreground">
            Upload your documents to get verified and access all platform features
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <DocumentUpload type="kyc" />
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-sans text-lg">Verification Steps</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="font-serif">Account Created</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-yellow-500" />
                  <span className="font-serif">Upload Documents</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <span className="font-serif text-muted-foreground">Admin Review</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <span className="font-serif text-muted-foreground">Verification Complete</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-sans text-lg">Benefits</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="font-serif">
                    <FileText className="h-3 w-3 mr-1" />
                    List Properties
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="font-serif">
                    <FileText className="h-3 w-3 mr-1" />
                    Higher Investment Limits
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="font-serif">
                    <FileText className="h-3 w-3 mr-1" />
                    Priority Support
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
