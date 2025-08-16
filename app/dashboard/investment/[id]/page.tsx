import { ProtectedRoute } from "@/components/auth/protected-route"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, DollarSign, MapPin, FileText, Download } from "lucide-react"
import Link from "next/link"

export default function InvestmentDetailPage({ params }: { params: { id: string } }) {
  // Mock data - in real app, fetch based on params.id
  const investment = {
    id: params.id,
    propertyTitle: "Luxury Beachfront Resort - Kenya",
    location: "Mombasa, Kenya",
    propertyType: "Resort",
    status: "active",
    investmentAmount: 50000,
    currentValue: 58500,
    monthlyRent: 4200,
    totalReturns: 12800,
    tokensOwned: 125,
    totalTokens: 1000,
    roi: 17.2,
    purchaseDate: "2024-03-15",
    image: "/kenyan-beachfront-resort.png",
    description:
      "Premium beachfront resort property with 50 luxury suites, private beach access, and world-class amenities.",
    propertyValue: 2500000,
    occupancyRate: 85,
    yearBuilt: 2019,
    propertyManager: "Coastal Properties Ltd",
  }

  const revenueHistory = [
    { month: "Dec 2024", amount: 4200, status: "completed" },
    { month: "Nov 2024", amount: 4200, status: "completed" },
    { month: "Oct 2024", amount: 3950, status: "completed" },
    { month: "Sep 2024", amount: 4100, status: "completed" },
  ]

  const documents = [
    { name: "Property Deed", type: "PDF", size: "2.4 MB", date: "2024-03-15" },
    { name: "Investment Agreement", type: "PDF", size: "1.8 MB", date: "2024-03-15" },
    { name: "Property Valuation", type: "PDF", size: "3.2 MB", date: "2024-03-10" },
    { name: "Insurance Certificate", type: "PDF", size: "1.1 MB", date: "2024-03-12" },
  ]

  const ownershipPercentage = ((investment.tokensOwned / investment.totalTokens) * 100).toFixed(2)

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <Link
              href="/dashboard"
              className="inline-flex items-center text-muted-foreground hover:text-foreground mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              <span className="font-serif">Back to Dashboard</span>
            </Link>
            <div className="flex items-start justify-between">
              <div>
                <h1 className="font-sans text-3xl font-bold text-foreground mb-2">{investment.propertyTitle}</h1>
                <div className="flex items-center space-x-4 text-muted-foreground">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="font-serif">{investment.location}</span>
                  </div>
                  <Badge variant="outline" className="font-serif">
                    {investment.propertyType}
                  </Badge>
                  <Badge className="font-serif bg-green-100 text-green-800">{investment.status}</Badge>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" className="font-serif bg-transparent">
                  Buy More Tokens
                </Button>
                <Button variant="outline" className="font-serif bg-transparent">
                  Sell Tokens
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardContent className="p-0">
                  <img
                    src={investment.image || "/placeholder.svg"}
                    alt={investment.propertyTitle}
                    className="w-full h-64 object-cover rounded-t-lg"
                  />
                  <div className="p-6">
                    <p className="font-serif text-muted-foreground">{investment.description}</p>
                  </div>
                </CardContent>
              </Card>

              <Tabs defaultValue="performance" className="space-y-4">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="performance" className="font-serif">
                    Performance
                  </TabsTrigger>
                  <TabsTrigger value="revenue" className="font-serif">
                    Revenue
                  </TabsTrigger>
                  <TabsTrigger value="documents" className="font-serif">
                    Documents
                  </TabsTrigger>
                  <TabsTrigger value="details" className="font-serif">
                    Details
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="performance" className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="font-sans text-2xl font-bold text-foreground">
                          ${investment.currentValue.toLocaleString()}
                        </div>
                        <p className="font-serif text-sm text-muted-foreground">Current Value</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="font-sans text-2xl font-bold text-primary">{investment.roi}%</div>
                        <p className="font-serif text-sm text-muted-foreground">Total ROI</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="font-sans text-2xl font-bold text-foreground">
                          ${investment.monthlyRent.toLocaleString()}
                        </div>
                        <p className="font-serif text-sm text-muted-foreground">Monthly Income</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="font-sans text-2xl font-bold text-foreground">
                          ${investment.totalReturns.toLocaleString()}
                        </div>
                        <p className="font-serif text-sm text-muted-foreground">Total Returns</p>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="revenue" className="space-y-4">
                  {revenueHistory.map((revenue, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                              <DollarSign className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h4 className="font-sans font-semibold">{revenue.month}</h4>
                              <p className="font-serif text-sm text-muted-foreground">Rental income</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-sans font-semibold">${revenue.amount.toLocaleString()}</div>
                            <Badge className="font-serif text-xs bg-green-100 text-green-800">{revenue.status}</Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="documents" className="space-y-4">
                  {documents.map((doc, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                              <FileText className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <h4 className="font-sans font-semibold">{doc.name}</h4>
                              <p className="font-serif text-sm text-muted-foreground">
                                {doc.type} • {doc.size} • {doc.date}
                              </p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" className="font-serif bg-transparent">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="details" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="font-sans">Property Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="font-serif text-sm text-muted-foreground">Property Value</p>
                          <p className="font-sans font-semibold">${investment.propertyValue.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="font-serif text-sm text-muted-foreground">Year Built</p>
                          <p className="font-sans font-semibold">{investment.yearBuilt}</p>
                        </div>
                        <div>
                          <p className="font-serif text-sm text-muted-foreground">Occupancy Rate</p>
                          <p className="font-sans font-semibold">{investment.occupancyRate}%</p>
                        </div>
                        <div>
                          <p className="font-serif text-sm text-muted-foreground">Property Manager</p>
                          <p className="font-sans font-semibold">{investment.propertyManager}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-sans">Your Investment</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-serif text-sm text-muted-foreground">Investment Amount</span>
                      <span className="font-sans font-semibold">${investment.investmentAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-serif text-sm text-muted-foreground">Current Value</span>
                      <span className="font-sans font-semibold">${investment.currentValue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-serif text-sm text-muted-foreground">Unrealized Gain</span>
                      <span className="font-sans font-semibold text-green-600">
                        +${(investment.currentValue - investment.investmentAmount).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-serif text-sm text-muted-foreground">Ownership</span>
                      <span className="font-serif text-sm font-medium">{ownershipPercentage}%</span>
                    </div>
                    <Progress value={Number.parseFloat(ownershipPercentage)} className="h-2" />
                    <p className="font-serif text-xs text-muted-foreground">
                      {investment.tokensOwned} of {investment.totalTokens} tokens
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-sans">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button className="w-full font-serif">Buy More Tokens</Button>
                  <Button variant="outline" className="w-full font-serif bg-transparent">
                    Sell Tokens
                  </Button>
                  <Button variant="outline" className="w-full font-serif bg-transparent">
                    View Market Data
                  </Button>
                  <Button variant="outline" className="w-full font-serif bg-transparent">
                    Contact Property Manager
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
