import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { Search, MapPin, Filter, Zap, Shield, Globe } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 mb-6">
            <Zap className="w-8 h-8 text-primary neon-glow" />
            <h1 className="text-4xl md:text-6xl font-bold text-gradient-primary">VidaXP</h1>
            <Shield className="w-8 h-8 text-secondary neon-glow" />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Invest in Real Estate with <span className="text-gradient-neon">Blockchain Security</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Discover tokenized real estate opportunities across Africa. Buy, rent, or invest in properties with
            transparent escrow transactions and fractional ownership.
          </p>

          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground mb-8">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-primary" />
              <span>Decentralized</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 w-4 text-secondary" />
              <span>Secure</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-accent" />
              <span>Instant</span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 p-3 sm:p-4 cyber-card rounded-lg border border-border/50 glow-on-hover">
              <div className="flex-1 relative w-full">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground neon-glow" />
                <Input
                  placeholder="Search properties by location..."
                  className="pl-10 border-0 bg-transparent font-serif focus:neon-border w-full"
                />
              </div>
              <Button className="gradient-primary text-white glow-effect border-0 hover:pulse-glow w-full sm:w-auto">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
              <Button variant="outline" size="sm" className="bg-transparent border-accent/50 hover:border-accent hover:bg-accent/10 transition-all duration-300">
                For Rent
              </Button>
              <Button variant="outline" size="sm" className="bg-transparent border-primary/50 hover:border-primary hover:bg-primary/10 transition-all duration-300">
                Investment
              </Button>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-3 gradient-primary hover:opacity-90 transition-all duration-300 hover:scale-105">
              Explore Listings
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-3 bg-transparent border-secondary/50 hover:border-secondary hover:bg-secondary/10 transition-all duration-300 hover:scale-105">
              Learn About Tokenization
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
