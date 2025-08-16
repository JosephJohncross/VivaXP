import { ProtectedRoute } from "@/components/auth/protected-route"
import { GovernanceDashboard } from "@/components/tokenization/governance-dashboard"

export default function GovernancePage() {
  return (
    <ProtectedRoute requireVerification={true}>
      <div className="container mx-auto px-4 py-8">
        <GovernanceDashboard />
      </div>
    </ProtectedRoute>
  )
}
