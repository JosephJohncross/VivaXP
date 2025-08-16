import { ProtectedRoute } from "@/components/auth/protected-route"
import { TokenMarketplace } from "@/components/tokenization/token-marketplace"

export default function TokensPage() {
  return (
    <ProtectedRoute requireVerification={true}>
      <div className="container mx-auto px-4 py-8">
        <TokenMarketplace />
      </div>
    </ProtectedRoute>
  )
}
