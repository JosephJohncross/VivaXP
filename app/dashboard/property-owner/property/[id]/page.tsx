import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function PropertyDetails({ params }: { params: { id: string } }) {
  // Mock property data - in real app, fetch based on params.id
  const property = {
    id: params.id,
    title: "Lagos Luxury Apartment",
    location: "Victoria Island, Lagos",
    type: "Apartment",
    listingType: "For Rent",
    status: "Active",
    price: "$2,500/month",
    description:
      "Modern luxury apartment with stunning city views, premium amenities, and prime location in Victoria Island.",
    bedrooms: 3,
    bathrooms: 2,
    area: "1,200 sq ft",
    yearBuilt: 2020,
    amenities: ["Swimming Pool", "Gym", "24/7 Security", "Parking", "Generator"],
    images: ["/modern-apartment-building.png", "/modern-apartment.png"],
    tenants: [
      { id: 1, name: "John Doe", email: "john@example.com", rentStatus: "Paid", moveInDate: "2023-01-15" },
      { id: 2, name: "Jane Smith", email: "jane@example.com", rentStatus: "Pending", moveInDate: "2023-03-01" },
    ],
    financials: {
      monthlyRent: 2500,
      totalRevenue: 30000,
      expenses: 5000,
      netIncome: 25000,
      occupancyRate: 95,
    },
    maintenance: [
      { id: 1, issue: "AC Repair", status: "Completed", date: "2024-01-15", cost: "$150" },
      { id: 2, issue: "Plumbing Fix", status: "In Progress", date: "2024-01-20", cost: "$200" },
    ],
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {property.title}
              </h1>
              <p className="text-muted-foreground mt-2">{property.location}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">Edit Property</Button>
              <Button>Manage Listing</Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Property Images */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {property.images.map((image, index) => (
                <img
                  key={index}
                  src={image || "/placeholder.svg"}
                  alt={`${property.title} ${index + 1}`}
                  className="w-full h-64 object-cover rounded-lg"
                />
              ))}
            </div>
          </div>

          {/* Property Info */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Property Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Type</span>
                  <Badge variant="secondary">{property.type}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Listing Type</span>
                  <Badge variant="outline">{property.listingType}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Price</span>
                  <span className="font-semibold">{property.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Bedrooms</span>
                  <span>{property.bedrooms}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Bathrooms</span>
                  <span>{property.bathrooms}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Area</span>
                  <span>{property.area}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Year Built</span>
                  <span>{property.yearBuilt}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Financial Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Monthly Revenue</span>
                  <span className="font-semibold text-green-600">${property.financials.monthlyRent}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Revenue</span>
                  <span className="font-semibold">${property.financials.totalRevenue}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Net Income</span>
                  <span className="font-semibold text-green-600">${property.financials.netIncome}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Occupancy Rate</span>
                  <span className="font-semibold">{property.financials.occupancyRate}%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-8">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="tenants">Tenants</TabsTrigger>
              <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Property Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{property.description}</p>
                  <div>
                    <h4 className="font-semibold mb-2">Amenities</h4>
                    <div className="flex flex-wrap gap-2">
                      {property.amenities.map((amenity, index) => (
                        <Badge key={index} variant="outline">
                          {amenity}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tenants" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Current Tenants</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {property.tenants.map((tenant) => (
                      <div key={tenant.id} className="flex justify-between items-center p-4 border rounded-lg">
                        <div>
                          <h4 className="font-semibold">{tenant.name}</h4>
                          <p className="text-sm text-muted-foreground">{tenant.email}</p>
                          <p className="text-sm text-muted-foreground">Move-in: {tenant.moveInDate}</p>
                        </div>
                        <Badge variant={tenant.rentStatus === "Paid" ? "default" : "destructive"}>
                          {tenant.rentStatus}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="maintenance" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Maintenance Requests</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {property.maintenance.map((item) => (
                      <div key={item.id} className="flex justify-between items-center p-4 border rounded-lg">
                        <div>
                          <h4 className="font-semibold">{item.issue}</h4>
                          <p className="text-sm text-muted-foreground">Date: {item.date}</p>
                          <p className="text-sm text-muted-foreground">Cost: {item.cost}</p>
                        </div>
                        <Badge variant={item.status === "Completed" ? "default" : "secondary"}>{item.status}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Property Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 border rounded-lg">
                      <h4 className="text-2xl font-bold text-primary">245</h4>
                      <p className="text-sm text-muted-foreground">Total Views</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <h4 className="text-2xl font-bold text-primary">12</h4>
                      <p className="text-sm text-muted-foreground">Inquiries</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <h4 className="text-2xl font-bold text-primary">95%</h4>
                      <p className="text-sm text-muted-foreground">Occupancy Rate</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
