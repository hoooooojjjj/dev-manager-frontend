import { Section } from '../types';
import { ReviewHistoryItem } from '../components/dynamic-content/components';
import { mockAIReview } from '../utils/mock-ai';
import { useSectionManagement } from './use-section-management';
import { useReviewForm } from './use-review-form';
import { useReviewHistory } from './use-review-history';
import { useDiffView } from './use-diff-view';

/**
 * 리뷰 관련 모든 액션과 상태를 통합 관리하는 메인 커스텀 훅
 * 섹션 선택, 리뷰 제출, 승인/되돌리기, 히스토리 관리 등의 기능을 제공합니다.
 */
export function useReviewActions() {
  const sectionHook = useSectionManagement();
  const formHook = useReviewForm();
  const historyHook = useReviewHistory();
  const diffHook = useDiffView();

  /**
   * 섹션을 클릭했을 때의 처리
   * @param section - 선택된 섹션
   */
  const handleSectionClick = (section: Section) => {
    sectionHook.selectSection(section);
    diffHook.hideDiff();
    formHook.resetForm();
  };

  /**
   * 리뷰를 제출합니다
   */
  const handleSubmitReview = async () => {
    const { selectedSection } = sectionHook;
    const { instruction, isFormValid } = formHook;

    if (!selectedSection || !isFormValid) return;

    formHook.setProcessingState(true);

    try {
      const review = await mockAIReview(selectedSection, instruction);
      diffHook.showReviewDiff(review);
    } catch (error) {
      console.error('Review submission failed:', error);
    } finally {
      formHook.setProcessingState(false);
    }
  };

  /**
   * 리뷰를 승인하고 섹션에 적용합니다
   */
  const handleApproveReview = () => {
    const { pendingReview } = diffHook;
    if (!pendingReview) return;

    // 섹션 내용 업데이트
    sectionHook.updateSectionContent(pendingReview.sectionId, pendingReview.revisedContent);

    // 전체 리뷰 히스토리에 추가
    historyHook.addReview(pendingReview);

    // 섹션별 리뷰 히스토리에 추가
    const reviewHistoryItem: ReviewHistoryItem = {
      ...pendingReview,
      status: 'applied',
    };
    historyHook.addSectionReview(pendingReview.sectionId, reviewHistoryItem);

    // 상태 초기화
    diffHook.hideDiff();
    formHook.resetForm();
  };

  /**
   * 리뷰를 거부하고 Diff 뷰를 숨깁니다
   */
  const handleRevertReview = () => {
    diffHook.hideDiff();
  };

  /**
   * 히스토리에서 리뷰를 되돌립니다
   * @param reviewId - 되돌릴 리뷰 ID
   */
  const handleRevertHistoryItem = (reviewId: string) => {
    const { selectedSection } = sectionHook;
    if (!selectedSection) return;

    const reviewToRevert = historyHook.getReviewById(selectedSection.id, reviewId);
    if (!reviewToRevert) return;

    // 섹션 내용을 원래대로 되돌리기
    sectionHook.updateSectionContent(selectedSection.id, reviewToRevert.originalContent);

    // 리뷰 상태 업데이트
    historyHook.updateSectionReviewStatus(selectedSection.id, reviewId, 'reverted');
  };

  /**
   * 되돌린 리뷰를 다시 적용합니다
   * @param reviewId - 재적용할 리뷰 ID
   */
  const handleReapplyReview = (reviewId: string) => {
    const { selectedSection } = sectionHook;
    if (!selectedSection) return;

    const reviewToReapply = historyHook.getReviewById(selectedSection.id, reviewId);
    if (!reviewToReapply) return;

    // 수정된 내용으로 섹션 업데이트
    sectionHook.updateSectionContent(selectedSection.id, reviewToReapply.revisedContent);

    // 리뷰 상태 업데이트
    historyHook.updateSectionReviewStatus(selectedSection.id, reviewId, 'applied');
  };

  return {
    // State
    ...sectionHook,
    ...formHook,
    ...historyHook,
    ...diffHook,

    // Actions
    handleSectionClick,
    handleSubmitReview,
    handleApproveReview,
    handleRevertReview,
    handleRevertHistoryItem,
    handleReapplyReview,

    // Form setters (for components)
    setInstruction: formHook.updateInstruction,
    setStrictCitation: formHook.toggleStrictCitation,
  };
}
