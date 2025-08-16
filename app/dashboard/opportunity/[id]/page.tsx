import { ProtectedRoute } from "@/components/auth/protected-route"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, MapPin, DollarSign, Shield } from "lucide-react"
import Link from "next/link"

export default function OpportunityDetailPage({ params }: { params: { id: string } }) {
  // Mock data - in real app, fetch based on params.id
  const opportunity = {
    id: params.id,
    propertyTitle: "Modern Office Complex - Lagos",
    location: "Victoria Island, Lagos, Nigeria",
    propertyType: "Commercial",
    riskLevel: "Medium",
    expectedROI: 22.5,
    tokenPrice: 1000,
    availableTokens: 750,
    totalTokens: 1000,
    minimumInvestment: 5000,
    image: "/modern-office-complex-lagos.png",
    description:
      "Premium Grade A office complex in the heart of Lagos business district with multinational tenants and guaranteed occupancy.",
    propertyValue: 1000000,
    yearBuilt: 2021,
    totalArea: "15,000 sqft",
    occupancyRate: 95,
    averageRent: 8500,
    fundingGoal: 1000000,
    currentFunding: 250000,
    daysLeft: 45,
    investors: 23,
  }

  const fundingProgress = (opportunity.currentFunding / opportunity.fundingGoal) * 100
  const tokensSold = opportunity.totalTokens - opportunity.availableTokens

  const highlights = [
    "Prime location in Victoria Island business district",
    "Long-term leases with multinational corporations",
    "Professional property management included",
    "Quarterly dividend distributions",
    "Full legal compliance and documentation",
  ]

  const financials = [
    { label: "Property Value", value: `$${opportunity.propertyValue.toLocaleString()}` },
    { label: "Token Price", value: `$${opportunity.tokenPrice.toLocaleString()}` },
    { label: "Expected Annual ROI", value: `${opportunity.expectedROI}%` },
    { label: "Average Monthly Rent", value: `$${opportunity.averageRent.toLocaleString()}` },
    { label: "Occupancy Rate", value: `${opportunity.occupancyRate}%` },
    { label: "Year Built", value: opportunity.yearBuilt.toString() },
  ]

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
              <span className="font-serif">Back to Opportunities</span>
            </Link>
            <div className="flex items-start justify-between">
              <div>
                <h1 className="font-sans text-3xl font-bold text-foreground mb-2">{opportunity.propertyTitle}</h1>
                <div className="flex items-center space-x-4 text-muted-foreground">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="font-serif">{opportunity.location}</span>
                  </div>
                  <Badge variant="outline" className="font-serif">
                    {opportunity.propertyType}
                  </Badge>
                  <Badge className="font-serif bg-yellow-100 text-yellow-800">
                    <Shield className="h-3 w-3 mr-1" />
                    {opportunity.riskLevel} Risk
                  </Badge>
                </div>
              </div>
              <div className="text-right">
                <div className="font-sans text-2xl font-bold text-primary">{opportunity.expectedROI}% ROI</div>
                <p className="font-serif text-sm text-muted-foreground">Expected Annual Return</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardContent className="p-0">
                  <img
                    src={opportunity.image || "/placeholder.svg"}
                    alt={opportunity.propertyTitle}
                    className="w-full h-64 object-cover rounded-t-lg"
                  />
                  <div className="p-6">
                    <p className="font-serif text-muted-foreground mb-4">{opportunity.description}</p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="text-center">
                        <div className="font-sans text-xl font-bold text-foreground">{opportunity.investors}</div>
                        <p className="font-serif text-sm text-muted-foreground">Investors</p>
                      </div>
                      <div className="text-center">
                        <div className="font-sans text-xl font-bold text-foreground">{opportunity.daysLeft}</div>
                        <p className="font-serif text-sm text-muted-foreground">Days Left</p>
                      </div>
                      <div className="text-center">
                        <div className="font-sans text-xl font-bold text-foreground">{tokensSold}</div>
                        <p className="font-serif text-sm text-muted-foreground">Tokens Sold</p>
                      </div>
                      <div className="text-center">
                        <div className="font-sans text-xl font-bold text-foreground">{opportunity.totalArea}</div>
                        <p className="font-serif text-sm text-muted-foreground">Total Area</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-serif text-sm text-muted-foreground">Funding Progress</span>
                        <span className="font-serif text-sm font-medium">
                          ${opportunity.currentFunding.toLocaleString()} / ${opportunity.fundingGoal.toLocaleString()}
                        </span>
                      </div>
                      <Progress value={fundingProgress} className="h-3" />
                      <p className="font-serif text-xs text-muted-foreground">{fundingProgress.toFixed(1)}% funded</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Tabs defaultValue="highlights" className="space-y-4">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="highlights" className="font-serif">
                    Highlights
                  </TabsTrigger>
                  <TabsTrigger value="financials" className="font-serif">
                    Financials
                  </TabsTrigger>
                  <TabsTrigger value="location" className="font-serif">
                    Location
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="highlights" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="font-sans">Investment Highlights</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {highlights.map((highlight, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                            <span className="font-serif text-muted-foreground">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="financials" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="font-sans">Financial Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        {financials.map((item, index) => (
                          <div key={index} className="space-y-1">
                            <p className="font-serif text-sm text-muted-foreground">{item.label}</p>
                            <p className="font-sans font-semibold text-foreground">{item.value}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="location" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="font-sans">Location & Accessibility</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="h-48 bg-muted rounded-lg flex items-center justify-center">
                          <p className="font-serif text-muted-foreground">Interactive Map Coming Soon</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="font-serif text-muted-foreground">Distance to Airport</p>
                            <p className="font-sans font-semibold">15 minutes</p>
                          </div>
                          <div>
                            <p className="font-serif text-muted-foreground">Public Transport</p>
                            <p className="font-sans font-semibold">Excellent</p>
                          </div>
                          <div>
                            <p className="font-serif text-muted-foreground">Business District</p>
                            <p className="font-sans font-semibold">Victoria Island</p>
                          </div>
                          <div>
                            <p className="font-serif text-muted-foreground">Parking Spaces</p>
                            <p className="font-sans font-semibold">200+</p>
                          </div>
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
                  <CardTitle className="font-sans">Investment Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-serif text-sm text-muted-foreground">Token Price</span>
                      <span className="font-sans font-semibold">${opportunity.tokenPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-serif text-sm text-muted-foreground">Available Tokens</span>
                      <span className="font-sans font-semibold">{opportunity.availableTokens}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-serif text-sm text-muted-foreground">Minimum Investment</span>
                      <span className="font-sans font-semibold">${opportunity.minimumInvestment.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-serif text-sm text-muted-foreground">Expected ROI</span>
                      <span className="font-sans font-semibold text-primary">{opportunity.expectedROI}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-sans">Invest Now</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="font-serif text-sm text-muted-foreground">Number of Tokens</label>
                    <input
                      type="number"
                      min="5"
                      max={opportunity.availableTokens}
                      defaultValue="5"
                      className="w-full px-3 py-2 border border-border rounded-md bg-background"
                    />
                    <p className="font-serif text-xs text-muted-foreground">
                      Minimum: 5 tokens (${(5 * opportunity.tokenPrice).toLocaleString()})
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-serif text-sm text-muted-foreground">Investment Amount</span>
                      <span className="font-sans font-semibold">$5,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-serif text-sm text-muted-foreground">Platform Fee (2%)</span>
                      <span className="font-sans font-semibold">$100</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="font-serif text-sm font-medium">Total</span>
                      <span className="font-sans font-bold">$5,100</span>
                    </div>
                  </div>

                  <Button className="w-full font-serif">
                    <DollarSign className="h-4 w-4 mr-2" />
                    Invest Now
                  </Button>
                  <Button variant="outline" className="w-full font-serif bg-transparent">
                    Add to Watchlist
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
