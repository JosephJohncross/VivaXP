"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { PaymentMethodSelector } from "./payment-method-selector"
import { escrowService } from "@/lib/contracts/escrow-service"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"
import { Shield, DollarSign, Loader2, ArrowRight } from "lucide-react"
import type { PaymentMethod } from "@/lib/contracts/escrow-types"

const escrowSchema = z.object({
  propertyId: z.string().min(1, "Property ID is required"),
  sellerAddress: z.string().min(1, "Seller address is required"),
  totalAmount: z.string().min(1, "Total amount is required"),
  currency: z.enum(["USDT", "CELO", "ETH"]),
  milestones: z
    .array(
      z.object({
        description: z.string().min(1, "Milestone description is required"),
        amount: z.string().min(1, "Milestone amount is required"),
        dueDate: z.string().min(1, "Due date is required"),
      }),
    )
    .min(1, "At least one milestone is required"),
})

type EscrowFormData = z.infer<typeof escrowSchema>

interface EscrowCreationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  propertyId?: string
  sellerAddress?: string
  propertyTitle?: string
}

export function EscrowCreationDialog({
  open,
  onOpenChange,
  propertyId = "",
  sellerAddress = "",
  propertyTitle = "",
}: EscrowCreationDialogProps) {
  const [step, setStep] = useState<"details" | "payment" | "confirmation">("details")
  const [isLoading, setIsLoading] = useState(false)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod>()
  const [createdEscrowId, setCreatedEscrowId] = useState<string>()

  const { user } = useAuth()
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<EscrowFormData>({
    resolver: zodResolver(escrowSchema),
    defaultValues: {
      propertyId,
      sellerAddress,
      currency: "USDT",
      milestones: [
        {
          description: "Initial deposit",
          amount: "",
          dueDate: "",
        },
      ],
    },
  })

  const watchedMilestones = watch("milestones")
  const watchedCurrency = watch("currency")
  const watchedTotalAmount = watch("totalAmount")

  const addMilestone = () => {
    const currentMilestones = watchedMilestones || []
    setValue("milestones", [
      ...currentMilestones,
      {
        description: "",
        amount: "",
        dueDate: "",
      },
    ])
  }

  const removeMilestone = (index: number) => {
    const currentMilestones = watchedMilestones || []
    setValue(
      "milestones",
      currentMilestones.filter((_, i) => i !== index),
    )
  }

  const handleCreateEscrow = async (data: EscrowFormData) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please connect your wallet to create an escrow",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      const milestones = data.milestones.map((m) => ({
        description: m.description,
        amount: BigInt(Number.parseFloat(m.amount) * 1e18), // Convert to wei
        dueDate: new Date(m.dueDate).getTime(),
      }))

      const escrowId = await escrowService.createEscrow(
        data.propertyId,
        data.sellerAddress,
        BigInt(Number.parseFloat(data.totalAmount) * 1e18),
        data.currency,
        milestones,
      )

      setCreatedEscrowId(escrowId)
      setStep("payment")

      toast({
        title: "Escrow Created",
        description: "Your escrow contract has been created successfully",
      })
    } catch (error) {
      console.error("Error creating escrow:", error)
      toast({
        title: "Creation Failed",
        description: "Failed to create escrow. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handlePayment = async () => {
    if (!selectedPaymentMethod || !createdEscrowId) return

    setIsLoading(true)
    try {
      await escrowService.fundEscrow(createdEscrowId, selectedPaymentMethod)
      setStep("confirmation")

      toast({
        title: "Payment Successful",
        description: "Your escrow has been funded successfully",
      })
    } catch (error) {
      console.error("Error funding escrow:", error)
      toast({
        title: "Payment Failed",
        description: "Failed to fund escrow. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    setStep("details")
    setSelectedPaymentMethod(undefined)
    setCreatedEscrowId(undefined)
    reset()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-sans text-2xl">
            {step === "details" && "Create Escrow Contract"}
            {step === "payment" && "Fund Escrow"}
            {step === "confirmation" && "Escrow Created Successfully"}
          </DialogTitle>
          <DialogDescription className="font-serif">
            {step === "details" && "Set up a secure escrow for your property transaction"}
            {step === "payment" && "Choose your payment method to fund the escrow"}
            {step === "confirmation" && "Your escrow is now active and secure"}
          </DialogDescription>
        </DialogHeader>

        {/* Step Indicator */}
        <div className="flex items-center justify-center space-x-4 mb-6">
          <div className={`flex items-center ${step === "details" ? "text-primary" : "text-muted-foreground"}`}>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step === "details" ? "bg-primary text-primary-foreground" : "bg-muted"
              }`}
            >
              1
            </div>
            <span className="ml-2 font-serif text-sm">Details</span>
          </div>
          <ArrowRight className="h-4 w-4 text-muted-foreground" />
          <div className={`flex items-center ${step === "payment" ? "text-primary" : "text-muted-foreground"}`}>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step === "payment" ? "bg-primary text-primary-foreground" : "bg-muted"
              }`}
            >
              2
            </div>
            <span className="ml-2 font-serif text-sm">Payment</span>
          </div>
          <ArrowRight className="h-4 w-4 text-muted-foreground" />
          <div className={`flex items-center ${step === "confirmation" ? "text-primary" : "text-muted-foreground"}`}>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step === "confirmation" ? "bg-primary text-primary-foreground" : "bg-muted"
              }`}
            >
              3
            </div>
            <span className="ml-2 font-serif text-sm">Complete</span>
          </div>
        </div>

        {/* Step 1: Escrow Details */}
        {step === "details" && (
          <form onSubmit={handleSubmit(handleCreateEscrow)} className="space-y-6">
            {propertyTitle && (
              <div className="bg-card rounded-lg p-4">
                <h4 className="font-sans font-semibold text-foreground mb-2">Property</h4>
                <p className="font-serif text-muted-foreground">{propertyTitle}</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="propertyId" className="font-serif">
                  Property ID
                </Label>
                <Input id="propertyId" className="font-serif" {...register("propertyId")} />
                {errors.propertyId && (
                  <p className="text-sm text-destructive font-serif">{errors.propertyId.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="sellerAddress" className="font-serif">
                  Seller Address
                </Label>
                <Input id="sellerAddress" className="font-serif" {...register("sellerAddress")} />
                {errors.sellerAddress && (
                  <p className="text-sm text-destructive font-serif">{errors.sellerAddress.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="totalAmount" className="font-serif">
                  Total Amount
                </Label>
                <Input id="totalAmount" type="number" step="0.01" className="font-serif" {...register("totalAmount")} />
                {errors.totalAmount && (
                  <p className="text-sm text-destructive font-serif">{errors.totalAmount.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="currency" className="font-serif">
                  Currency
                </Label>
                <select
                  id="currency"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-serif"
                  {...register("currency")}
                >
                  <option value="USDT">USDT</option>
                  <option value="CELO">CELO</option>
                  <option value="ETH">ETH</option>
                </select>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-sans font-semibold text-foreground">Payment Milestones</h4>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addMilestone}
                  className="font-serif bg-transparent"
                >
                  Add Milestone
                </Button>
              </div>

              {watchedMilestones?.map((milestone, index) => (
                <div key={index} className="border border-border rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="font-serif">
                      Milestone {index + 1}
                    </Badge>
                    {watchedMilestones.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeMilestone(index)}
                        className="text-destructive hover:text-destructive font-serif"
                      >
                        Remove
                      </Button>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="font-serif">Description</Label>
                    <Textarea
                      className="font-serif"
                      {...register(`milestones.${index}.description`)}
                      placeholder="Describe this milestone..."
                    />
                    {errors.milestones?.[index]?.description && (
                      <p className="text-sm text-destructive font-serif">
                        {errors.milestones[index]?.description?.message}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="font-serif">Amount ({watchedCurrency})</Label>
                      <Input
                        type="number"
                        step="0.01"
                        className="font-serif"
                        {...register(`milestones.${index}.amount`)}
                      />
                      {errors.milestones?.[index]?.amount && (
                        <p className="text-sm text-destructive font-serif">
                          {errors.milestones[index]?.amount?.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label className="font-serif">Due Date</Label>
                      <Input type="date" className="font-serif" {...register(`milestones.${index}.dueDate`)} />
                      {errors.milestones?.[index]?.dueDate && (
                        <p className="text-sm text-destructive font-serif">
                          {errors.milestones[index]?.dueDate?.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={handleClose} className="font-serif bg-transparent">
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading} className="font-serif">
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Shield className="h-4 w-4 mr-2" />
                    Create Escrow
                  </>
                )}
              </Button>
            </div>
          </form>
        )}

        {/* Step 2: Payment Method */}
        {step === "payment" && (
          <div className="space-y-6">
            <PaymentMethodSelector
              amount={watchedTotalAmount}
              currency={watchedCurrency}
              onMethodSelect={setSelectedPaymentMethod}
              selectedMethod={selectedPaymentMethod}
            />

            <div className="flex justify-end space-x-4">
              <Button variant="outline" onClick={() => setStep("details")} className="font-serif">
                Back
              </Button>
              <Button onClick={handlePayment} disabled={!selectedPaymentMethod || isLoading} className="font-serif">
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <DollarSign className="h-4 w-4 mr-2" />
                    Fund Escrow
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Confirmation */}
        {step === "confirmation" && (
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Shield className="h-8 w-8 text-primary" />
            </div>

            <div>
              <h3 className="font-sans text-xl font-bold text-foreground mb-2">Escrow Created Successfully!</h3>
              <p className="font-serif text-muted-foreground">
                Your funds are now securely held in escrow until all conditions are met.
              </p>
            </div>

            {createdEscrowId && (
              <div className="bg-card rounded-lg p-4">
                <h4 className="font-sans font-semibold text-foreground mb-2">Escrow Details</h4>
                <div className="space-y-2 font-serif text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Escrow ID:</span>
                    <span className="font-mono text-foreground">{createdEscrowId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Amount:</span>
                    <span className="text-foreground">
                      {watchedTotalAmount} {watchedCurrency}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <Badge className="font-serif">Funded</Badge>
                  </div>
                </div>
              </div>
            )}

            <Button onClick={handleClose} className="font-serif">
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
