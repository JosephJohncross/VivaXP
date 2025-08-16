export interface PropertyDocument {
  id: string
  propertyId: string
  type: "title_deed" | "survey_plan" | "building_permit" | "tax_receipt" | "insurance" | "inspection_report"
  fileName: string
  fileUrl: string
  uploadedAt: number
  status: "pending" | "approved" | "rejected"
  reviewedBy?: string
  reviewedAt?: number
  comments?: string
}

export interface KYCDocument {
  id: string
  userId: string
  type: "passport" | "national_id" | "drivers_license" | "utility_bill" | "bank_statement"
  fileName: string
  fileUrl: string
  uploadedAt: number
  status: "pending" | "approved" | "rejected"
  reviewedBy?: string
  reviewedAt?: number
  comments?: string
}

export interface PropertyVerification {
  id: string
  propertyId: string
  ownerId: string
  status: "draft" | "submitted" | "under_review" | "approved" | "rejected"
  documents: PropertyDocument[]
  fieldInspection?: {
    agentId: string
    scheduledDate: number
    completedDate?: number
    report?: string
    photos: string[]
    status: "scheduled" | "completed" | "failed"
  }
  aiVerification?: {
    score: number
    confidence: number
    flags: string[]
    completedAt: number
  }
  adminReview?: {
    reviewerId: string
    reviewedAt: number
    decision: "approved" | "rejected"
    comments: string
  }
  submittedAt?: number
  approvedAt?: number
}

export interface UserKYC {
  id: string
  userId: string
  status: "incomplete" | "submitted" | "under_review" | "approved" | "rejected"
  personalInfo: {
    fullName: string
    dateOfBirth: string
    nationality: string
    address: string
    phoneNumber: string
  }
  documents: KYCDocument[]
  riskAssessment?: {
    score: number
    level: "low" | "medium" | "high"
    flags: string[]
  }
  adminReview?: {
    reviewerId: string
    reviewedAt: number
    decision: "approved" | "rejected"
    comments: string
  }
  submittedAt?: number
  approvedAt?: number
}

class VerificationService {
  // Mock data - in production, this would come from APIs/database
  private mockPropertyVerifications: PropertyVerification[] = [
    {
      id: "pv_1",
      propertyId: "1",
      ownerId: "owner_1",
      status: "under_review",
      documents: [
        {
          id: "doc_1",
          propertyId: "1",
          type: "title_deed",
          fileName: "title_deed.pdf",
          fileUrl: "/documents/title_deed.pdf",
          uploadedAt: Date.now() - 2 * 24 * 60 * 60 * 1000,
          status: "approved",
          reviewedBy: "admin_1",
          reviewedAt: Date.now() - 1 * 24 * 60 * 60 * 1000,
        },
        {
          id: "doc_2",
          propertyId: "1",
          type: "survey_plan",
          fileName: "survey_plan.pdf",
          fileUrl: "/documents/survey_plan.pdf",
          uploadedAt: Date.now() - 2 * 24 * 60 * 60 * 1000,
          status: "pending",
        },
      ],
      fieldInspection: {
        agentId: "agent_1",
        scheduledDate: Date.now() + 3 * 24 * 60 * 60 * 1000,
        status: "scheduled",
        photos: [],
      },
      aiVerification: {
        score: 85,
        confidence: 92,
        flags: [],
        completedAt: Date.now() - 1 * 24 * 60 * 60 * 1000,
      },
      submittedAt: Date.now() - 3 * 24 * 60 * 60 * 1000,
    },
  ]

  private mockUserKYCs: UserKYC[] = [
    {
      id: "kyc_1",
      userId: "user_1",
      status: "under_review",
      personalInfo: {
        fullName: "John Doe",
        dateOfBirth: "1990-01-01",
        nationality: "Nigerian",
        address: "123 Victoria Island, Lagos",
        phoneNumber: "+234-123-456-7890",
      },
      documents: [
        {
          id: "kyc_doc_1",
          userId: "user_1",
          type: "passport",
          fileName: "passport.pdf",
          fileUrl: "/documents/passport.pdf",
          uploadedAt: Date.now() - 1 * 24 * 60 * 60 * 1000,
          status: "pending",
        },
      ],
      riskAssessment: {
        score: 25,
        level: "low",
        flags: [],
      },
      submittedAt: Date.now() - 1 * 24 * 60 * 60 * 1000,
    },
  ]

  async getPropertyVerifications(): Promise<PropertyVerification[]> {
    return this.mockPropertyVerifications
  }

  async getUserKYCs(): Promise<UserKYC[]> {
    return this.mockUserKYCs
  }

  async submitPropertyVerification(propertyId: string, documents: File[]): Promise<PropertyVerification> {
    // Mock implementation - in production, upload files and create verification
    const verification: PropertyVerification = {
      id: `pv_${Date.now()}`,
      propertyId,
      ownerId: "current_user",
      status: "submitted",
      documents: documents.map((file, index) => ({
        id: `doc_${Date.now()}_${index}`,
        propertyId,
        type: "title_deed", // Would be determined by file analysis
        fileName: file.name,
        fileUrl: `/documents/${file.name}`,
        uploadedAt: Date.now(),
        status: "pending",
      })),
      submittedAt: Date.now(),
    }

    this.mockPropertyVerifications.push(verification)
    return verification
  }

  async submitKYC(personalInfo: UserKYC["personalInfo"], documents: File[]): Promise<UserKYC> {
    // Mock implementation
    const kyc: UserKYC = {
      id: `kyc_${Date.now()}`,
      userId: "current_user",
      status: "submitted",
      personalInfo,
      documents: documents.map((file, index) => ({
        id: `kyc_doc_${Date.now()}_${index}`,
        userId: "current_user",
        type: "passport", // Would be determined by file analysis
        fileName: file.name,
        fileUrl: `/documents/${file.name}`,
        uploadedAt: Date.now(),
        status: "pending",
      })),
      submittedAt: Date.now(),
    }

    this.mockUserKYCs.push(kyc)
    return kyc
  }

  async approveDocument(documentId: string, comments?: string): Promise<void> {
    // Mock implementation - in production, update database
    console.log(`Approved document ${documentId}:`, comments)
  }

  async rejectDocument(documentId: string, comments: string): Promise<void> {
    // Mock implementation
    console.log(`Rejected document ${documentId}:`, comments)
  }

  async approveVerification(verificationId: string, comments?: string): Promise<void> {
    // Mock implementation
    console.log(`Approved verification ${verificationId}:`, comments)
  }

  async rejectVerification(verificationId: string, comments: string): Promise<void> {
    // Mock implementation
    console.log(`Rejected verification ${verificationId}:`, comments)
  }
}

export const verificationService = new VerificationService()
