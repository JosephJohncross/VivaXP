"use client"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/auth-context"
import { User, Settings, TrendingUp, LogOut, Wallet, Shield, ChevronDown } from "lucide-react"

export function UserMenu() {
  const { user, logout } = useAuth()

  if (!user) return null

  const getInitials = (name?: string, email?: string, address?: string) => {
    if (name) return name.slice(0, 2).toUpperCase()
    if (email) return email.slice(0, 2).toUpperCase()
    if (address) return address.slice(2, 4).toUpperCase()
    return "U"
  }

  const getDisplayName = () => {
    if (user.name) return user.name
    if (user.email) return user.email.split("@")[0]
    if (user.address) return `${user.address.slice(0, 6)}...${user.address.slice(-4)}`
    return "User"
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center space-x-2 h-auto p-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.avatar || "/placeholder.svg"} />
            <AvatarFallback className="bg-primary text-primary-foreground text-xs">
              {getInitials(user.name, user.email, user.address)}
            </AvatarFallback>
          </Avatar>
          <div className="hidden md:flex flex-col items-start">
            <span className="font-serif text-sm font-medium">{getDisplayName()}</span>
            <div className="flex items-center space-x-1">
              <Badge variant="outline" className="text-xs font-serif">
                {user.authMethod === "wallet" ? (
                  <>
                    <Wallet className="h-3 w-3 mr-1" />
                    Wallet
                  </>
                ) : (
                  <>
                    <User className="h-3 w-3 mr-1" />
                    Email
                  </>
                )}
              </Badge>
              {user.isVerified && (
                <Badge variant="secondary" className="text-xs font-serif">
                  <Shield className="h-3 w-3 mr-1" />
                  Verified
                </Badge>
              )}
            </div>
          </div>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-serif">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{getDisplayName()}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email || (user.address && `${user.address.slice(0, 10)}...${user.address.slice(-6)}`)}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="font-serif">
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="font-serif">
          <TrendingUp className="mr-2 h-4 w-4" />
          <span>My Investments</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="font-serif">
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout} className="font-serif text-destructive">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
