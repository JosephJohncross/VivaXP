"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Home, Building, Coins, Calendar } from "lucide-react"

interface PropertyTypeFilterProps {
  onTypeChange: (type: string) => void
  selectedType?: string
}

export function PropertyTypeFilter({ onTypeChange, selectedType }: PropertyTypeFilterProps) {
  const propertyTypes = [
    {
      id: "rent",
      label: "For Rent",
      icon: Home,
      description: "Monthly rental properties",
      color: "bg-blue-500",
    },
    {
      id: "sale",
      label: "For Sale",
      icon: Building,
      description: "Properties for purchase",
      color: "bg-green-500",
    },
    {
      id: "installment",
      label: "Installments",
      icon: Calendar,
      description: "Buy with payment plans",
      color: "bg-purple-500",
    },
    {
      id: "investment",
      label: "Tokenized",
      icon: Coins,
      description: "Fractional ownership",
      color: "bg-orange-500",
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {propertyTypes.map((type) => {
        const Icon = type.icon
        const isSelected = selectedType === type.id

        return (
          <Card
            key={type.id}
            className={`cursor-pointer transition-all hover:shadow-lg ${
              isSelected ? "ring-2 ring-primary shadow-lg" : ""
            }`}
            onClick={() => {
              console.log("[v0] Property type selected:", type.id)
              onTypeChange(type.id)
            }}
          >
            <CardContent className="p-4 text-center space-y-2">
              <div className={`w-12 h-12 rounded-full ${type.color} flex items-center justify-center mx-auto`}>
                <Icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-sm">{type.label}</h3>
              <p className="text-xs text-muted-foreground">{type.description}</p>
              {isSelected && (
                <Badge variant="secondary" className="text-xs">
                  Selected
                </Badge>
              )}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
