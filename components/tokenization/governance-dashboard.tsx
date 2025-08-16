"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Vote, Clock, CheckCircle, XCircle, Plus, Users } from "lucide-react"
import { tokenizationService } from "@/lib/services/tokenization-service"
import type { GovernanceProposal } from "@/lib/contracts/token-types"

export function GovernanceDashboard() {
  const [proposals, setProposals] = useState<GovernanceProposal[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedProposal, setSelectedProposal] = useState<GovernanceProposal | null>(null)
  const [newProposal, setNewProposal] = useState({
    title: "",
    description: "",
    type: "maintenance" as const,
    options: ["Approve", "Reject"],
  })

  useEffect(() => {
    loadProposals()
  }, [])

  const loadProposals = async () => {
    try {
      const proposalData = await tokenizationService.getGovernanceProposals()
      setProposals(proposalData)
    } catch (error) {
      console.error("Error loading proposals:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleVote = async (proposalId: string, optionIndex: number) => {
    try {
      // Mock voting power - in production, this would come from user's token balance
      const votingPower = BigInt(25)
      await tokenizationService.voteOnProposal(proposalId, optionIndex, votingPower)
      loadProposals()
    } catch (error) {
      console.error("Voting error:", error)
    }
  }

  const handleCreateProposal = async () => {
    if (!newProposal.title || !newProposal.description) return

    try {
      await tokenizationService.createProposal({
        propertyId: "1", // Mock property ID
        tokenId: "token_1", // Mock token ID
        proposer: "current_user",
        title: newProposal.title,
        description: newProposal.description,
        type: newProposal.type,
        options: newProposal.options,
        startTime: Date.now(),
        endTime: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
        quorum: BigInt(100),
        threshold: 60,
      })

      setNewProposal({
        title: "",
        description: "",
        type: "maintenance",
        options: ["Approve", "Reject"],
      })
      loadProposals()
    } catch (error) {
      console.error("Error creating proposal:", error)
    }
  }

  const getStatusBadge = (proposal: GovernanceProposal) => {
    const now = Date.now()
    if (proposal.status === "active" && now > proposal.endTime) {
      return (
        <Badge variant="secondary">
          <Clock className="h-3 w-3 mr-1" />
          Ended
        </Badge>
      )
    }

    const statusConfig = {
      active: { variant: "default" as const, icon: Vote, color: "text-blue-600" },
      passed: { variant: "default" as const, icon: CheckCircle, color: "text-green-600" },
      rejected: { variant: "destructive" as const, icon: XCircle, color: "text-red-600" },
      executed: { variant: "outline" as const, icon: CheckCircle, color: "text-green-600" },
    }

    const config = statusConfig[proposal.status] || statusConfig.active
    const Icon = config.icon

    return (
      <Badge variant={config.variant} className="font-serif">
        <Icon className={`h-3 w-3 mr-1 ${config.color}`} />
        {proposal.status.toUpperCase()}
      </Badge>
    )
  }

  const getVotePercentages = (proposal: GovernanceProposal) => {
    const totalVotes = Object.values(proposal.votingPower).reduce((sum, power) => sum + Number(power), 0)
    if (totalVotes === 0) return proposal.options.map(() => 0)

    const voteCounts = proposal.options.map((_, index) => {
      return Object.entries(proposal.votes).reduce((count, [userId, vote]) => {
        if (vote === index) {
          return count + Number(proposal.votingPower[userId] || 0)
        }
        return count
      }, 0)
    })

    return voteCounts.map((count) => (count / totalVotes) * 100)
  }

  const getTimeRemaining = (endTime: number) => {
    const now = Date.now()
    const remaining = endTime - now
    if (remaining <= 0) return "Ended"

    const days = Math.floor(remaining / (24 * 60 * 60 * 1000))
    const hours = Math.floor((remaining % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000))

    if (days > 0) return `${days}d ${hours}h remaining`
    return `${hours}h remaining`
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-4 bg-muted rounded w-1/2 mb-2"></div>
              <div className="h-8 bg-muted rounded w-3/4"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-sans text-3xl font-bold">Governance Dashboard</h1>
          <p className="font-serif text-muted-foreground">Participate in property decision making</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="font-serif">
              <Plus className="h-4 w-4 mr-2" />
              Create Proposal
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="font-sans">Create New Proposal</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div>
                <Label htmlFor="title" className="font-serif">
                  Proposal Title
                </Label>
                <Input
                  id="title"
                  placeholder="Enter proposal title"
                  value={newProposal.title}
                  onChange={(e) => setNewProposal((prev) => ({ ...prev, title: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="type" className="font-serif">
                  Proposal Type
                </Label>
                <Select
                  value={newProposal.type}
                  onValueChange={(value: any) => setNewProposal((prev) => ({ ...prev, type: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="renovation">Renovation</SelectItem>
                    <SelectItem value="sale">Property Sale</SelectItem>
                    <SelectItem value="management_change">Management Change</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="description" className="font-serif">
                  Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Describe your proposal in detail"
                  value={newProposal.description}
                  onChange={(e) => setNewProposal((prev) => ({ ...prev, description: e.target.value }))}
                  rows={4}
                />
              </div>

              <Button
                onClick={handleCreateProposal}
                disabled={!newProposal.title || !newProposal.description}
                className="w-full font-serif"
              >
                Create Proposal
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Proposals */}
      <div className="space-y-4">
        {proposals.map((proposal) => {
          const votePercentages = getVotePercentages(proposal)
          const hasVoted = "current_user" in proposal.votes

          return (
            <Card key={proposal.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="font-sans text-xl">{proposal.title}</CardTitle>
                    <div className="flex items-center space-x-4">
                      {getStatusBadge(proposal)}
                      <Badge variant="outline" className="font-serif capitalize">
                        {proposal.type.replace("_", " ")}
                      </Badge>
                      <span className="font-serif text-sm text-muted-foreground">
                        {getTimeRemaining(proposal.endTime)}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="font-serif text-sm">{Object.keys(proposal.votes).length} votes</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="font-serif text-muted-foreground">{proposal.description}</p>

                {/* Voting Options */}
                <div className="space-y-3">
                  {proposal.options.map((option, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-serif font-medium">{option}</span>
                        <span className="font-sans text-sm text-muted-foreground">
                          {votePercentages[index].toFixed(1)}%
                        </span>
                      </div>
                      <Progress value={votePercentages[index]} className="h-2" />
                    </div>
                  ))}
                </div>

                {/* Voting Buttons */}
                {proposal.status === "active" && Date.now() < proposal.endTime && !hasVoted && (
                  <div className="flex space-x-2">
                    {proposal.options.map((option, index) => (
                      <Button
                        key={index}
                        variant={index === 0 ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleVote(proposal.id, index)}
                        className="font-serif"
                      >
                        <Vote className="h-4 w-4 mr-2" />
                        {option}
                      </Button>
                    ))}
                  </div>
                )}

                {hasVoted && (
                  <div className="bg-muted/50 rounded-lg p-3">
                    <p className="font-serif text-sm text-muted-foreground">
                      ✓ You voted for: {proposal.options[proposal.votes["current_user"]]}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {proposals.length === 0 && (
        <div className="text-center py-12">
          <Vote className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-sans text-lg font-semibold mb-2">No active proposals</h3>
          <p className="font-serif text-muted-foreground">Create the first proposal to get started with governance.</p>
        </div>
      )}
    </div>
  )
}
