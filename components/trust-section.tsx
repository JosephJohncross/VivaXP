import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, MapPin, FileText, Camera, Users, Shield } from "lucide-react"

const trustFeatures = [
  {
    icon: MapPin,
    title: "Geo-Verified Locations",
    description:
      "Every property is verified using GPS coordinates and satellite imagery through Google Maps and OpenStreetMap APIs.",
    status: "Active",
  },
  {
    icon: Users,
    title: "Field Agent Inspections",
    description:
      "Local certified agents conduct physical inspections and provide detailed reports with photos and documentation.",
    status: "Verified",
  },
  {
    icon: FileText,
    title: "AI Document Verification",
    description: "Advanced AI systems verify property documents, ownership papers, and legal compliance automatically.",
    status: "Automated",
  },
  {
    icon: Camera,
    title: "NFT Property Certificates",
    description:
      "Verified properties receive unique NFT certificates containing GPS data, documents, and inspection photos.",
    status: "Blockchain",
  },
]

const verificationStats = [
  { label: "Properties Verified", value: "2,847" },
  { label: "Field Agents", value: "156" },
  { label: "Countries Covered", value: "12" },
  { label: "Success Rate", value: "99.2%" },
]

export function TrustSection() {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gradient-accent mb-4">Trust & Verification System</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our multi-layer verification process ensures every property listing is authentic, legally compliant, and
            investment-ready.
          </p>
        </div>

        {/* Verification Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {verificationStats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-gradient-primary mb-2">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Trust Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {trustFeatures.map((feature, index) => (
            <Card key={index} className="cyber-card border border-border/50 glow-on-hover hologram-effect transition-all duration-300 hover:scale-105">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 gradient-secondary rounded-lg flex items-center justify-center pulse-glow">
                    <feature.icon className="h-6 w-6 text-white neon-glow" />
                  </div>
                  <Badge variant="outline" className="border-accent/50 text-accent neon-border">
                    <CheckCircle className="h-3 w-3 mr-1 neon-glow" />
                    {feature.status}
                  </Badge>
                </div>
                <CardTitle className="text-xl text-gradient-secondary">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Security Guarantee */}
        <div className="cyber-card rounded-lg p-8 text-center border border-border/50 glow-on-hover hologram-effect">
          <div className="w-16 h-16 gradient-accent rounded-full flex items-center justify-center mx-auto mb-6 pulse-glow neon-border">
            <CheckCircle className="h-8 w-8 text-white neon-glow" />
          </div>
          <h3 className="text-2xl font-bold text-gradient-accent mb-4">100% Verification Guarantee</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Every property on our platform undergoes rigorous verification. If any listing fails to meet our standards
            after purchase, we provide full refund protection through our insurance fund.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Badge variant="outline" className="px-4 py-2 border-primary/50 text-primary hover:border-primary hover:bg-primary/10 transition-all duration-300">
              <Shield className="h-4 w-4 mr-2 neon-glow" />
              Insurance Protected
            </Badge>
            <Badge variant="outline" className="px-4 py-2 border-secondary/50 text-secondary hover:border-secondary hover:bg-secondary/10 transition-all duration-300">
              <FileText className="h-4 w-4 mr-2 neon-glow" />
              Legal Compliance
            </Badge>
            <Badge variant="outline" className="px-4 py-2 border-accent/50 text-accent hover:border-accent hover:bg-accent/10 transition-all duration-300">
              <Users className="h-4 w-4 mr-2 neon-glow" />
              Expert Verified
            </Badge>
          </div>
        </div>
      </div>
    </section>
  )
}
