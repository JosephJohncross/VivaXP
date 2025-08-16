import { ProtectedRoute } from "@/components/auth/protected-route"
import { AdminVerificationDashboard } from "@/components/verification/admin-verification-dashboard"

export default function AdminVerificationPage() {
  return (
    <ProtectedRoute requireVerification={true}>
      <div className="container mx-auto px-4 py-8">
        <AdminVerificationDashboard />
      </div>
    </ProtectedRoute>
  )
}
