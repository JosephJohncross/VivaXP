import Link from "next/link"
import { Building, Mail, Phone, MapPin, Twitter, Linkedin, Github, Zap } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-card border-t border-border/50 cyber-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary text-white glow-effect group-hover:pulse-glow">
                <Zap className="h-5 w-5 neon-glow" />
              </div>
              <span className="text-xl font-bold text-gradient-primary">VidaXP</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Revolutionizing real estate investment through blockchain technology and tokenization.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-all duration-300 hover:neon-glow">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-secondary transition-all duration-300 hover:neon-glow">
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-accent transition-all duration-300 hover:neon-glow">
                <Github className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gradient-secondary mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/listings" className="text-muted-foreground hover:text-primary transition-all duration-300 hover:neon-glow">
                  Browse Properties
                </Link>
              </li>
              <li>
                <Link href="/investments" className="text-muted-foreground hover:text-secondary transition-all duration-300 hover:neon-glow">
                  Investment Dashboard
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-muted-foreground hover:text-accent transition-all duration-300 hover:neon-glow">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/tokenization" className="text-muted-foreground hover:text-primary transition-all duration-300 hover:neon-glow">
                  Tokenization Guide
                </Link>
              </li>
              <li>
                <Link href="/security" className="text-muted-foreground hover:text-secondary transition-all duration-300 hover:neon-glow">
                  Security & Trust
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-gradient-accent mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-primary transition-all duration-300 hover:neon-glow">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-secondary transition-all duration-300 hover:neon-glow">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/whitepaper" className="text-muted-foreground hover:text-accent transition-all duration-300 hover:neon-glow">
                  Whitepaper
                </Link>
              </li>
              <li>
                <Link href="/api-docs" className="text-muted-foreground hover:text-primary transition-all duration-300 hover:neon-glow">
                  API Documentation
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-muted-foreground hover:text-secondary transition-all duration-300 hover:neon-glow">
                  Support Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-gradient-primary mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-primary neon-glow" />
                <span className="text-muted-foreground">hello@vidaxp.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-secondary neon-glow" />
                <span className="text-muted-foreground">+234 800 123 4567</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-accent neon-glow mt-0.5" />
                <span className="text-muted-foreground">
                  Lagos, Nigeria
                  <br />
                  Nairobi, Kenya
                  <br />
                  Cape Town, South Africa
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="font-serif text-sm text-muted-foreground">© 2024 VidaXP. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="font-serif text-sm text-muted-foreground hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="/terms" className="font-serif text-sm text-muted-foreground hover:text-primary">
              Terms of Service
            </Link>
            <Link href="/cookies" className="font-serif text-sm text-muted-foreground hover:text-primary">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
