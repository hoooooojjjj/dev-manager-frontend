'use client';

import { SectionSelector } from './components/section-selector';
import { ReviewEditor } from './components/review-editor';
import { DynamicContent } from './components/dynamic-content';
import { useReviewActions } from './hooks/use-review-actions';
import * as S from './index.css';

/**
 * 리뷰 인터페이스 컴포넌트 Props
 */
interface ReviewInterfaceProps {
  /** 리뷰할 드래프트 ID */
  draftId: string;
}

/**
 * AI와의 협업을 통한 섹션별 리뷰 인터페이스
 * 
 * 사용자가 개발 명세서의 특정 섹션을 선택하고,
 * AI에게 수정 지시문을 주어 개선된 내용을 받아볼 수 있습니다.
 * 
 * 주요 기능:
 * - 섹션 선택 및 상태 보기
 * - AI 리뷰 지시문 입력 및 제출
 * - Before/After Diff 보기 및 승인/거부
 * - 섹션별 리뷰 히스토리 및 되돌리기/재적용
 * 
 * @param props - ReviewInterfaceProps
 */
export function ReviewInterface({ draftId: _draftId }: ReviewInterfaceProps) {
  const {
    sections,
    selectedSection,
    instruction,
    strictCitation,
    isProcessing,
    reviews,
    showDiff,
    pendingReview,
    sectionReviews,
    handleSectionClick,
    handleSubmitReview,
    handleApproveReview,
    handleRevertReview,
    handleRevertHistoryItem,
    handleReapplyReview,
    setInstruction,
    setStrictCitation,
  } = useReviewActions();


  return (
    <div className={S.container}>
      {/* 좌측: 섹션 선택 */}
      <SectionSelector
        sections={sections}
        selectedSection={selectedSection}
        onSectionSelect={handleSectionClick}
      />

      {/* 우측: 리뷰 에디터 */}
      <ReviewEditor
        selectedSection={selectedSection}
        instruction={instruction}
        strictCitation={strictCitation}
        isProcessing={isProcessing}
        onInstructionChange={setInstruction}
        onStrictCitationChange={setStrictCitation}
        onSubmitReview={handleSubmitReview}
      />

      {/* 하단: 동적 콘텐츠 영역 */}
      <DynamicContent
        selectedSection={selectedSection}
        showDiff={showDiff}
        pendingReview={pendingReview}
        reviews={reviews}
        sectionReviews={sectionReviews}
        onApproveReview={handleApproveReview}
        onRevertReview={handleRevertReview}
        onRevertHistoryItem={handleRevertHistoryItem}
        onReapplyReview={handleReapplyReview}
      />
    </div>
  );
}
