// Core domain types
export interface Section {
  readonly id: string;
  readonly title: string;
  content: string;
  status: SectionStatus;
}

export interface Review {
  readonly id: string;
  readonly sectionId: string;
  readonly sectionTitle: string;
  readonly originalContent: string;
  readonly reviewPrompt: string;
  readonly revisedContent: string;
  readonly timestamp: string;
}

// Enums for better type safety
export type SectionStatus = 'completed' | 'needs_work';
export type ReviewStatus = 'applied' | 'reverted';

// Component Props Types
export interface SectionSelectorProps {
  sections: Section[];
  selectedSection: Section | null;
  onSectionSelect: (section: Section) => void;
}

export interface ReviewEditorProps {
  selectedSection: Section | null;
  instruction: string;
  strictCitation: boolean;
  isProcessing: boolean;
  onInstructionChange: (value: string) => void;
  onStrictCitationChange: (checked: boolean) => void;
  onSubmitReview: () => void;
}

export interface DynamicContentProps {
  selectedSection: Section | null;
  showDiff: boolean;
  pendingReview: Review | null;
  reviews: Review[];
  sectionReviews: Record<string, ReviewHistoryItem[]>;
  onApproveReview: () => void;
  onRevertReview: () => void;
  onRevertHistoryItem: (reviewId: string) => void;
  onReapplyReview: (reviewId: string) => void;
}

// History types
export interface ReviewHistoryItem extends Review {
  status: ReviewStatus;
}

// Service types
export interface ReviewRequest {
  section: Section;
  instruction: string;
  strictCitation: boolean;
}

// State management types
export interface ReviewFormState {
  instruction: string;
  strictCitation: boolean;
  isProcessing: boolean;
  isFormValid: boolean;
}

export interface SectionManagementState {
  sections: Section[];
  selectedSection: Section | null;
}

export interface ReviewHistoryState {
  reviews: Review[];
  sectionReviews: Record<string, ReviewHistoryItem[]>;
}

export interface DiffViewState {
  showDiff: boolean;
  pendingReview: Review | null;
}