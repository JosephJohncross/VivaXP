import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Building, Shield, Globe, Users, TrendingUp, Coins, CheckCircle, Target, Eye, Heart } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl text-center">
          <Badge variant="secondary" className="mb-4 font-serif">
            About VidaXP
          </Badge>
          <h1 className="font-sans text-4xl md:text-6xl font-bold text-foreground mb-6">
            Revolutionizing Real Estate Through <span className="text-primary glow-text">Blockchain Technology</span>
          </h1>
          <p className="font-serif text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            VidaXP is pioneering the future of real estate investment by making property ownership accessible,
            transparent, and profitable through tokenization and smart contracts.
          </p>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-primary/20 hover:border-primary/40 transition-colors">
              <CardHeader>
                <Target className="h-12 w-12 text-primary mb-4 glow-effect" />
                <CardTitle className="font-sans text-2xl">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-serif text-muted-foreground leading-relaxed">
                  To democratize real estate investment across Africa by leveraging blockchain technology, making
                  property ownership accessible to everyone regardless of their financial background.
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/20 hover:border-primary/40 transition-colors">
              <CardHeader>
                <Eye className="h-12 w-12 text-primary mb-4 glow-effect" />
                <CardTitle className="font-sans text-2xl">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-serif text-muted-foreground leading-relaxed">
                  To become Africa's leading Web3 real estate platform, creating a transparent, secure, and efficient
                  ecosystem where property investment drives economic growth and prosperity.
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/20 hover:border-primary/40 transition-colors">
              <CardHeader>
                <Heart className="h-12 w-12 text-primary mb-4 glow-effect" />
                <CardTitle className="font-sans text-2xl">Our Values</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="font-serif text-muted-foreground space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    Transparency in all transactions
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    Security through blockchain
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    Accessibility for all investors
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    Innovation in real estate
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="font-sans text-3xl md:text-4xl font-bold text-foreground mb-4">How VidaXP Works</h2>
            <p className="font-serif text-xl text-muted-foreground max-w-3xl mx-auto">
              Our platform combines traditional real estate with cutting-edge blockchain technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 glow-effect">
                <Building className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-sans text-xl font-semibold mb-2">Property Verification</h3>
              <p className="font-serif text-muted-foreground">
                AI-powered verification ensures all properties meet our quality standards
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 glow-effect">
                <Coins className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-sans text-xl font-semibold mb-2">Tokenization</h3>
              <p className="font-serif text-muted-foreground">
                Properties are converted into tradeable tokens for fractional ownership
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 glow-effect">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-sans text-xl font-semibold mb-2">Secure Escrow</h3>
              <p className="font-serif text-muted-foreground">
                Smart contracts manage payments and ensure secure transactions
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 glow-effect">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-sans text-xl font-semibold mb-2">Earn Returns</h3>
              <p className="font-serif text-muted-foreground">
                Receive rental income and capital appreciation through token ownership
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="font-sans text-4xl font-bold text-primary mb-2 glow-text">$50M+</div>
              <div className="font-serif text-muted-foreground">Properties Listed</div>
            </div>
            <div>
              <div className="font-sans text-4xl font-bold text-primary mb-2 glow-text">10,000+</div>
              <div className="font-serif text-muted-foreground">Active Investors</div>
            </div>
            <div>
              <div className="font-sans text-4xl font-bold text-primary mb-2 glow-text">15%</div>
              <div className="font-serif text-muted-foreground">Average ROI</div>
            </div>
            <div>
              <div className="font-sans text-4xl font-bold text-primary mb-2 glow-text">12</div>
              <div className="font-serif text-muted-foreground">African Countries</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="font-sans text-3xl md:text-4xl font-bold text-foreground mb-4">Our Leadership Team</h2>
            <p className="font-serif text-xl text-muted-foreground">
              Experienced professionals driving innovation in African real estate
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="w-24 h-24 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center glow-effect">
                  <Users className="h-12 w-12 text-primary" />
                </div>
                <CardTitle className="font-sans">Kwame Asante</CardTitle>
                <CardDescription className="font-serif">CEO & Co-Founder</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="font-serif text-muted-foreground text-sm">
                  Former Goldman Sachs VP with 15+ years in real estate finance and blockchain technology.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-24 h-24 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center glow-effect">
                  <Globe className="h-12 w-12 text-primary" />
                </div>
                <CardTitle className="font-sans">Amara Okafor</CardTitle>
                <CardDescription className="font-serif">CTO & Co-Founder</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="font-serif text-muted-foreground text-sm">
                  Blockchain architect and former Microsoft engineer specializing in smart contract development.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-24 h-24 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center glow-effect">
                  <TrendingUp className="h-12 w-12 text-primary" />
                </div>
                <CardTitle className="font-sans">Fatima Al-Rashid</CardTitle>
                <CardDescription className="font-serif">Head of Operations</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="font-serif text-muted-foreground text-sm">
                  Real estate veteran with 20+ years managing property portfolios across Africa.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="font-sans text-3xl md:text-4xl font-bold text-foreground mb-6">
            Ready to Start Your Real Estate Journey?
          </h2>
          <p className="font-serif text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of investors who are already building wealth through tokenized real estate
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="font-serif glow-effect">
              <Link href="/listings">Browse Properties</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="font-serif bg-transparent">
              <Link href="/investments">Start Investing</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
