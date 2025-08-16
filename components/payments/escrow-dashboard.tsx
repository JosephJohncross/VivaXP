"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { escrowService } from "@/lib/contracts/escrow-service"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"
import { Shield, Clock, CheckCircle, AlertTriangle, DollarSign, Calendar } from "lucide-react"
import type { EscrowContract, Transaction } from "@/lib/contracts/escrow-types"

export function EscrowDashboard() {
  const [escrows, setEscrows] = useState<EscrowContract[]>([])
  const [transactions, setTransactions] = useState<Record<string, Transaction[]>>({})
  const [isLoading, setIsLoading] = useState(true)

  const { user } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    loadEscrows()
  }, [])

  const loadEscrows = async () => {
    try {
      const allEscrows = escrowService.getAllEscrows()
      setEscrows(allEscrows)

      // Load transactions for each escrow
      const txData: Record<string, Transaction[]> = {}
      allEscrows.forEach((escrow) => {
        txData[escrow.address] = escrowService.getTransactions(escrow.address)
      })
      setTransactions(txData)
    } catch (error) {
      console.error("Error loading escrows:", error)
      toast({
        title: "Loading Failed",
        description: "Failed to load escrow data",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleReleaseFunds = async (escrowId: string, milestoneId: string) => {
    try {
      await escrowService.releaseMilestoneFunds(escrowId, milestoneId)
      await loadEscrows()
      toast({
        title: "Funds Released",
        description: "Milestone funds have been released successfully",
      })
    } catch (error) {
      console.error("Error releasing funds:", error)
      toast({
        title: "Release Failed",
        description: "Failed to release funds. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleRaiseDispute = async (escrowId: string) => {
    try {
      await escrowService.raiseDispute(escrowId, "Dispute raised by user")
      await loadEscrows()
      toast({
        title: "Dispute Raised",
        description: "Your dispute has been submitted for review",
      })
    } catch (error) {
      console.error("Error raising dispute:", error)
      toast({
        title: "Dispute Failed",
        description: "Failed to raise dispute. Please try again.",
        variant: "destructive",
      })
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "created":
        return <Clock className="h-4 w-4" />
      case "funded":
        return <Shield className="h-4 w-4" />
      case "completed":
        return <CheckCircle className="h-4 w-4" />
      case "disputed":
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "created":
        return "bg-yellow-100 text-yellow-800"
      case "funded":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-green-100 text-green-800"
      case "disputed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const calculateProgress = (escrow: EscrowContract) => {
    const completedMilestones = escrow.milestones.filter((m) => m.status === "completed").length
    return (completedMilestones / escrow.milestones.length) * 100
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center space-y-4">
          <Shield className="h-8 w-8 animate-pulse mx-auto text-primary" />
          <p className="font-serif text-muted-foreground">Loading escrow data...</p>
        </div>
      </div>
    )
  }

  if (escrows.length === 0) {
    return (
      <div className="text-center py-12">
        <Shield className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="font-sans text-xl font-semibold text-foreground mb-2">No Escrows Found</h3>
        <p className="font-serif text-muted-foreground">You haven't created any escrow contracts yet.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-serif text-sm font-medium">Total Escrows</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="font-sans text-2xl font-bold">{escrows.length}</div>
            <p className="font-serif text-xs text-muted-foreground">Active contracts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-serif text-sm font-medium">Total Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="font-sans text-2xl font-bold">
              {escrows.reduce((sum, escrow) => sum + Number(escrow.amount) / 1e18, 0).toFixed(2)}
            </div>
            <p className="font-serif text-xs text-muted-foreground">USD equivalent</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-serif text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="font-sans text-2xl font-bold">{escrows.filter((e) => e.status === "completed").length}</div>
            <p className="font-serif text-xs text-muted-foreground">Successful transactions</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active" className="font-serif">
            Active Escrows
          </TabsTrigger>
          <TabsTrigger value="completed" className="font-serif">
            Completed
          </TabsTrigger>
          <TabsTrigger value="disputed" className="font-serif">
            Disputed
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {escrows
            .filter((escrow) => escrow.status !== "completed" && escrow.status !== "disputed")
            .map((escrow) => (
              <Card key={escrow.address}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        {getStatusIcon(escrow.status)}
                      </div>
                      <div>
                        <CardTitle className="font-sans text-lg">Property {escrow.propertyId}</CardTitle>
                        <p className="font-serif text-sm text-muted-foreground">
                          {Number(escrow.amount) / 1e18} {escrow.currency}
                        </p>
                      </div>
                    </div>
                    <Badge className={`font-serif ${getStatusColor(escrow.status)}`}>
                      {escrow.status.charAt(0).toUpperCase() + escrow.status.slice(1)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm font-serif mb-2">
                      <span>Progress</span>
                      <span>{Math.round(calculateProgress(escrow))}%</span>
                    </div>
                    <Progress value={calculateProgress(escrow)} className="h-2" />
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-sans font-semibold text-foreground">Milestones</h4>
                    {escrow.milestones.map((milestone, index) => (
                      <div key={milestone.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <p className="font-serif text-sm font-medium text-foreground">{milestone.description}</p>
                          <div className="flex items-center space-x-4 mt-1">
                            <span className="font-serif text-xs text-muted-foreground">
                              {Number(milestone.amount) / 1e18} {escrow.currency}
                            </span>
                            <span className="font-serif text-xs text-muted-foreground">
                              Due: {new Date(milestone.dueDate).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge
                            variant={milestone.status === "completed" ? "default" : "outline"}
                            className="font-serif"
                          >
                            {milestone.status}
                          </Badge>
                          {milestone.status === "pending" && escrow.status === "funded" && (
                            <Button
                              size="sm"
                              onClick={() => handleReleaseFunds(escrow.address, milestone.id)}
                              className="font-serif"
                            >
                              Release
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t">
                    <div className="flex items-center space-x-2 text-sm font-serif text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>Created {new Date(escrow.createdAt).toLocaleDateString()}</span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRaiseDispute(escrow.address)}
                      className="font-serif"
                    >
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Raise Dispute
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {escrows
            .filter((escrow) => escrow.status === "completed")
            .map((escrow) => (
              <Card key={escrow.address}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-sans font-semibold text-foreground">Property {escrow.propertyId}</h3>
                        <p className="font-serif text-sm text-muted-foreground">
                          {Number(escrow.amount) / 1e18} {escrow.currency} • Completed successfully
                        </p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800 font-serif">Completed</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>

        <TabsContent value="disputed" className="space-y-4">
          {escrows
            .filter((escrow) => escrow.status === "disputed")
            .map((escrow) => (
              <Card key={escrow.address}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                        <AlertTriangle className="h-5 w-5 text-red-600" />
                      </div>
                      <div>
                        <h3 className="font-sans font-semibold text-foreground">Property {escrow.propertyId}</h3>
                        <p className="font-serif text-sm text-muted-foreground">
                          {Number(escrow.amount) / 1e18} {escrow.currency} • Under dispute resolution
                        </p>
                      </div>
                    </div>
                    <Badge className="bg-red-100 text-red-800 font-serif">Disputed</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
