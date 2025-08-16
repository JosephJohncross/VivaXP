import { ProtectedRoute } from "@/components/auth/protected-route"
import { EscrowDashboard } from "@/components/payments/escrow-dashboard"

export default function EscrowPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="font-sans text-3xl font-bold text-foreground mb-2">Escrow Management</h1>
            <p className="font-serif text-muted-foreground">
              Manage your secure property transactions and milestone payments
            </p>
          </div>

          <EscrowDashboard />
        </div>
      </div>
    </ProtectedRoute>
  )
}
